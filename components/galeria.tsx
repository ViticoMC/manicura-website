"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { Foto } from "@/types"

export function Galeria() {
  const [fotos, setFotos] = useState<Foto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFotos()
  }, [])

  const fetchFotos = async () => {
    try {
      const response = await fetch("/api/fotos")
      const data = await response.json()
      setFotos(data)
    } catch (error) {
      console.error("Error fetching fotos:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="galeria" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Galería
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros trabajos más recientes y déjate inspirar
            </p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-64 break-inside-avoid"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="galeria" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Galería
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestros trabajos más recientes y déjate inspirar
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {fotos.map((foto, index) => (
            <div
              key={foto.id}
              className="break-inside-avoid group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src={foto.url || "/placeholder.svg"}
                  alt={`Trabajo del ${foto.fecha}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">{foto.fecha}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
