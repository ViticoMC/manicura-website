"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Servicio } from "@/types"

export function Servicios() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServicios()
  }, [])

  const fetchServicios = async () => {
    try {
      const response = await fetch("/api/servicios")
      const data = await response.json()
      setServicios(data)
    } catch (error) {
      console.error("Error fetching servicios:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Servicios profesionales de manicura con la mejor calidad y atención personalizada
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <Card className="h-96 bg-gray-200 rounded-2xl"></Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Servicios profesionales de manicura con la mejor calidad y atención personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {servicios.map((servicio) => (
            <Card
              key={servicio.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={servicio.foto || "/placeholder.svg"}
                  alt={servicio.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-purple-600 text-lg px-3 py-1">{servicio.icon}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold px-4 py-2">
                    ${servicio.price}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {servicio.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">{servicio.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
