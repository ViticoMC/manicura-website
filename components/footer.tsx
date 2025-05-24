import { Heart, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center md:justify-start">
              <Heart className="w-6 h-6 mr-2 text-pink-400" />
              Nails Studio
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="w-5 h-5 mr-3 text-pink-400" />
                <span>+53 59259908</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="w-5 h-5 mr-3 text-pink-400" />
                <span>Tomas Betancourt entre Capdevilla y Joaquín Agüero</span>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Horarios</h3>
            <div className="space-y-2">
              <p>Lunes - Sábado</p>
              <p>9:00 AM - 10:00 AM</p>
              <p>1:00 PM - 3:00 PM</p>
              <p>3:00 PM - 6:00 PM</p>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-6">Síguenos</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p>&copy; 2024 Nails Studio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
