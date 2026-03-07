"use client"

import { useState, useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Loader2, RotateCcw, UploadCloud, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitRodinJob, checkJobStatus, downloadModel } from "@/lib/rodin-api"

const ModelViewer = dynamic(() => import("./model-viewer"), { ssr: false })

type Status = "idle" | "uploading" | "processing" | "downloading" | "ready" | "error"

const STATUS_MESSAGES: Record<Status, string> = {
  idle: "",
  uploading: "Enviando imagem para o servidor...",
  processing: "Gerando modelo 3D... Isso pode levar até 2 minutos.",
  downloading: "Baixando seu modelo 3D...",
  ready: "Modelo 3D pronto!",
  error: "Ocorreu um erro ao gerar o modelo.",
}

function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",")
  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : "image/png"
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export default function PreviewGenerator() {
  const [status, setStatus] = useState<Status>("idle")
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError("Imagem muito grande. Máximo 5MB.")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string)
      setModelUrl(null)
      setStatus("idle")
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const cleanup = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const generate3DPreview = useCallback(async () => {
    if (!photoPreview) return

    cleanup()
    setStatus("uploading")
    setError(null)
    setModelUrl(null)

    try {
      // 1. Convert base64 to File
      const file = dataURLtoFile(photoPreview, "photo.png")

      // 2. Create FormData
      const formData = new FormData()
      formData.append("images", file)
      formData.append("condition_mode", "concat")
      formData.append("quality", "medium")
      formData.append("geometry_file_format", "glb")
      formData.append("material", "PBR")

      // 3. Submit job
      const submitResult = await submitRodinJob(formData)
      const subscriptionKey = submitResult.subscription_key

      if (!subscriptionKey) {
        throw new Error("Não foi possível iniciar a geração do modelo.")
      }

      // 4. Poll status
      setStatus("processing")
      const startTime = Date.now()
      const MAX_WAIT = 120_000 // 2 minutes

      const result = await new Promise<string>((resolve, reject) => {
        pollRef.current = setInterval(async () => {
          try {
            if (Date.now() - startTime > MAX_WAIT) {
              cleanup()
              reject(new Error("Tempo limite excedido. Tente novamente."))
              return
            }

            const statusResult = await checkJobStatus(subscriptionKey)
            const jobs = statusResult.jobs

            if (jobs) {
              const jobKeys = Object.keys(jobs)
              for (const key of jobKeys) {
                const job = jobs[key]
                if (job.status === "Succeeded") {
                  cleanup()
                  resolve(job.uuid || key)
                  return
                }
                if (job.status === "Failed" || job.status === "Cancelled") {
                  cleanup()
                  reject(new Error("A geração do modelo falhou. Tente com outra imagem."))
                  return
                }
              }
            }
          } catch (err) {
            // Don't stop polling on transient errors
            console.error("Status poll error:", err)
          }
        }, 3000)
      })

      // 5. Download model
      setStatus("downloading")
      const downloadResult = await downloadModel(result)

      if (!downloadResult.list || downloadResult.list.length === 0) {
        throw new Error("Modelo não encontrado para download.")
      }

      // Find GLB file
      const glbFile = downloadResult.list.find(
        (f: { name: string; url: string }) => f.name?.endsWith(".glb") || f.url?.endsWith(".glb")
      ) || downloadResult.list[0]

      // 6. Proxy the URL
      const proxiedUrl = `/api/proxy-download?url=${encodeURIComponent(glbFile.url)}`
      setModelUrl(proxiedUrl)
      setStatus("ready")
    } catch (err) {
      cleanup()
      setError(err instanceof Error ? err.message : "Erro desconhecido ao gerar modelo.")
      setStatus("error")
    }
  }, [photoPreview, cleanup])

  const isProcessing = status === "uploading" || status === "processing" || status === "downloading"

  return (
    <div className="space-y-6">
      <div className="border border-white/10 rounded-xl bg-card/80 backdrop-blur-sm p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-headline font-bold">Preview 3D</h3>
        </div>

        {/* Upload area */}
        {!photoPreview && (
          <label
            htmlFor="preview-3d-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors"
          >
            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Envie uma foto</span> para ver o preview 3D
            </p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (MAX. 5MB)</p>
            <input
              id="preview-3d-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handlePhotoUpload}
            />
          </label>
        )}

        {/* Photo uploaded - show preview + generate button */}
        {photoPreview && status === "idle" && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src={photoPreview}
                alt="Foto para preview"
                width={80}
                height={80}
                className="rounded-lg object-cover w-20 h-20"
              />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Foto carregada com sucesso!</p>
                <label
                  htmlFor="preview-3d-reupload"
                  className="text-xs text-primary cursor-pointer hover:underline"
                >
                  Trocar foto
                </label>
                <input
                  id="preview-3d-reupload"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
            <Button
              onClick={generate3DPreview}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-full button-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Gerar Preview 3D
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Veja como seu produto ficará em 3D! (pode levar até 2 minutos)
            </p>
          </div>
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm animate-pulse">{STATUS_MESSAGES[status]}</p>
            <div className="w-full max-w-xs bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{
                  width: status === "uploading" ? "20%" : status === "processing" ? "60%" : "90%",
                }}
              />
            </div>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="flex flex-col items-center py-6 space-y-4">
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p className="text-destructive text-sm text-center">{error}</p>
            <Button
              onClick={generate3DPreview}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        )}

        {/* Model ready */}
        {status === "ready" && modelUrl && (
          <div className="space-y-4">
            <ModelViewer modelUrl={modelUrl} />
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => {
                  setStatus("idle")
                  setModelUrl(null)
                }}
                variant="outline"
                size="sm"
                className="border-white/10 hover:border-primary/50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Gerar Novamente
              </Button>
              <label htmlFor="preview-3d-new">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-white/10 hover:border-primary/50 cursor-pointer"
                >
                  <span>
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Nova Foto
                  </span>
                </Button>
              </label>
              <input
                id="preview-3d-new"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
