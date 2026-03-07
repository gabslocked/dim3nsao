"use client"

import { useEffect, useState } from "react"
import { useThree } from "@react-three/fiber"
import { useGLTF, Center } from "@react-three/drei"
import LoadingSpinner from "./loading-spinner"

export default function ModelComponent({ url }: { url: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const { scene } = useGLTF(url)
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)

    if (scene) {
      setIsLoading(false)
    }

    return () => {
      setIsLoading(true)
    }
  }, [url, camera, scene])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  )
}
