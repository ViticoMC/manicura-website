export interface Servicio {
  id: number
  name: string
  descripcion: string
  price: number
  foto: string
  icon: string
}

export interface Foto {
  id: number
  url: string
  fecha: string
}

export interface Admin {
  id: number
  name: string
  password: string
}
