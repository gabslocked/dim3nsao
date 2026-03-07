"use client"

import { useEffect } from "react"
import { useThree } from "@react-three/fiber"

export default function SceneSetup() {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = null
  }, [scene])

  return null
}
