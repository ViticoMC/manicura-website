"use client"

import { Sparkles, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 text-pink-500">
            <Sparkles className="w-8 h-8" />
            <Heart className="w-6 h-6" />
            <Star className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
          Nails Studio
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">✨ Donde tus uñas cobran vida ✨</p>

        <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          Te invito a descubrir nuestros servicios profesionales de Manicura y pedicura con la mejor calidad 
          donde podras tener diseños unicos y la mejor atencion para que luzcas espectacular
        </p>
        <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
        Contamos con equipos profesionales altamente capacitados , para trabajar con y sin corriente , utilizamos productos 
        de alta calidad y las últimas técnicas en manicura y pedicura . Desde diseños clásicos hasta las tendencias mas innovadoras 
        , estamos aqui para hacer realidad tus ideas y cuidar tus uñas como se merecen
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver Servicios
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
            onClick={() => document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" })}
          >
            Galería
          </Button>
        </div>

        <div className="mt-12 flex justify-center items-center space-x-8 text-gray-400">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">Clientes Felices</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-pink-600">Calidad</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  )
}
