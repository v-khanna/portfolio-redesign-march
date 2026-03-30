"use client"
import { useEffect, useRef, useState } from "react"
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo"
import type { FeatureCollection, Feature } from "geojson"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// Module-level cache — shared across all globe instances so only one fetch fires
let geojsonPromise: Promise<FeatureCollection> | null = null
function getWorldData(): Promise<FeatureCollection> {
  if (!geojsonPromise) {
    geojsonPromise = fetch("/ne_110m_land.json").then((r) => {
      if (!r.ok) throw new Error("Failed to load land data")
      return r.json()
    })
  }
  return geojsonPromise
}

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  interactive?: boolean
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  interactive = true,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5
    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = geoPath().projection(projection).context(context)
    const graticuleData = geoGraticule()() // pre-compute once

    let landFeatures: FeatureCollection | null = null

    // Pin locations: [longitude, latitude, color, label]
    const pins: [number, number, string, string][] = [
      [-121.74, 38.54, '#64ffda', 'Davis'],        // teal
      [-122.42, 37.77, '#e6f1ff', 'San Francisco'], // white
      [77.21, 28.61, '#ccd6f6', 'Delhi'],            // lightest slate
    ]

    let animTime = 0

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      // Ocean fill — use current projection scale so it zooms correctly
      const currentRadius = projection.scale()
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentRadius, 0, 2 * Math.PI)
      context.fillStyle = "#0a192f"
      context.fill()
      context.strokeStyle = "rgba(100, 255, 218, 0.3)"
      context.lineWidth = 1.5
      context.stroke()

      if (landFeatures) {
        // Graticule
        context.beginPath()
        path(graticuleData)
        context.strokeStyle = "rgba(100, 255, 218, 0.08)"
        context.lineWidth = 0.5
        context.stroke()

        // Land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: Feature) => {
          path(feature)
        })
        context.strokeStyle = "rgba(100, 255, 218, 0.25)"
        context.lineWidth = 1
        context.stroke()
      }

      // Draw pins
      animTime += 0.02
      pins.forEach(([lon, lat, color]) => {
        const coords = projection([lon, lat])
        if (!coords) return

        // Check if point is on visible side of globe
        const dist = Math.hypot(coords[0] - containerWidth / 2, coords[1] - containerHeight / 2)
        if (dist > projection.scale() + 2) return

        const [px, py] = coords

        // Pin dot
        context.beginPath()
        context.arc(px, py, 3, 0, 2 * Math.PI)
        context.fillStyle = color
        context.fill()

        // Pulse ring
        const pulseRadius = 3 + ((animTime * 8) % 12)
        const pulseAlpha = Math.max(0, 1 - pulseRadius / 15)
        context.beginPath()
        context.arc(px, py, pulseRadius, 0, 2 * Math.PI)
        context.strokeStyle = color.replace(')', `, ${pulseAlpha})`).replace('rgb', 'rgba').replace('#', '')
        // Use hex to rgba conversion
        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulseAlpha})`
        context.lineWidth = 1
        context.stroke()
      })
    }

    // Rotation state
    const rotation = [0, 0]
    let isDragging = false
    let isVisible = true
    let rafId: number
    let lastTime = 0
    const frameInterval = 25
    const isMobile = containerWidth < 400
    const rotationSpeed = isMobile ? 0.7 : 1

    const tick = (timestamp: number) => {
      rafId = requestAnimationFrame(tick)
      if (isDragging || prefersReducedMotion || !isVisible) return
      if (timestamp - lastTime < frameInterval) return
      lastTime = timestamp

      rotation[0] += rotationSpeed
      projection.rotate(rotation as [number, number])
      render()
    }

    // Pause RAF when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting },
      { threshold: 0 },
    )
    observer.observe(canvas)

    rafId = requestAnimationFrame(tick)

    // Drag interaction (mouse + touch)
    let cleanupInteraction: (() => void) | null = null

    if (interactive) {
      const startDrag = (startX: number, startY: number) => {
        isDragging = true
        const startRotation = [...rotation]

        const onMove = (x: number, y: number) => {
          const sensitivity = 0.5
          rotation[0] = startRotation[0] + (x - startX) * sensitivity
          rotation[1] = startRotation[1] - (y - startY) * sensitivity
          rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
          projection.rotate(rotation as [number, number])
          render()
        }

        const onEnd = () => {
          isDragging = false
          document.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseup", onEnd)
          document.removeEventListener("touchmove", handleTouchMove)
          document.removeEventListener("touchend", onEnd)
        }

        const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY)
        const handleTouchMove = (e: TouchEvent) => {
          e.preventDefault()
          onMove(e.touches[0].clientX, e.touches[0].clientY)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", onEnd)
        document.addEventListener("touchmove", handleTouchMove, { passive: false })
        document.addEventListener("touchend", onEnd)
      }

      const handleMouseDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY)
      const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault()
        startDrag(e.touches[0].clientX, e.touches[0].clientY)
      }

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05
        const currentScale = projection.scale()
        const newScale = Math.min(radius * 3, Math.max(radius * 0.5, currentScale * zoomFactor))
        projection.scale(newScale)
        render()
      }

      canvas.addEventListener("mousedown", handleMouseDown)
      canvas.addEventListener("touchstart", handleTouchStart, { passive: false })
      canvas.addEventListener("wheel", handleWheel, { passive: false })

      cleanupInteraction = () => {
        canvas.removeEventListener("mousedown", handleMouseDown)
        canvas.removeEventListener("touchstart", handleTouchStart)
        canvas.removeEventListener("wheel", handleWheel)
      }
    }

    // Load data
    getWorldData()
      .then((data) => { landFeatures = data; render() })
      .catch(() => setError("Failed to load land map data"))

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      cleanupInteraction?.()
    }
  }, [width, height, interactive, prefersReducedMotion])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-navy-light rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">Error loading Earth visualization</p>
          <p className="text-slate text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative flex justify-center ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}
