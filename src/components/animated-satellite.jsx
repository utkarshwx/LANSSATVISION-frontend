'use client'

import { Circle, Satellite } from 'lucide-react'

export default function AnimatedSatellite() {
  return (
    <div className="flex items-center justify-center bg-transparent backdrop:blur-2xl">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <Circle className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Satellite className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  )
}