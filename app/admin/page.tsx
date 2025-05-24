"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, Plus, Trash2, Upload, ArrowLeft } from "lucide-react"
import type { Servicio, Foto } from "@/types"
import { uploadToCloudinary } from "@/lib/cloudinary"
import Image from "next/image"
import Link from "next/link"

export default function AdminPage() {
  const { isAuthenticated, logout, loading } = useAuth()
  const router = useRouter()
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [fotos, setFotos] = useState<Foto[]>([])
  const [loadingData, setLoadingData] = useState(true)

  // Estados para formularios
  const [servicioForm, setServicioForm] = useState({
    name: "",
    descripcion: "",
    price: "",
    icon: "",
    foto: null as File | null,
  })
  const [fotoForm, setFotoForm] = useState({
    foto: null as File | null,
    fecha: new Date().toISOString().split("T")[0],
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const fetchData = async () => {
    try {
      const [serviciosRes, fotosRes] = await Promise.all([fetch("/api/servicios"), fetch("/api/fotos")])

      const serviciosData = await serviciosRes.json()
      const fotosData = await fotosRes.json()

      setServicios(serviciosData)
      setFotos(fotosData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleAddServicio = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!servicioForm.foto) return

    setUploading(true)
    try {
      const fotoUrl = await uploadToCloudinary(servicioForm.foto)

      const response = await fetch("/api/servicios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: servicioForm.name,
          descripcion: servicioForm.descripcion,
          price: Number.parseFloat(servicioForm.price),
          foto: fotoUrl,
          icon: servicioForm.icon,
        }),
      })

      if (response.ok) {
        setServicioForm({ name: "", descripcion: "", price: "", icon: "", foto: null })
        fetchData()
      }
    } catch (error) {
      console.error("Error adding servicio:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteServicio = async (id: number) => {
    try {
      const response = await fetch(`/api/servicios/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error("Error deleting servicio:", error)
    }
  }

  const handleAddFoto = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fotoForm.foto) return

    setUploading(true)
    try {
      const fotoUrl = await uploadToCloudinary(fotoForm.foto)

      const response = await fetch("/api/fotos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: fotoUrl,
          fecha: fotoForm.fecha,
        }),
      })

      if (response.ok) {
        setFotoForm({ foto: null, fecha: new Date().toISOString().split("T")[0] })
        fetchData()
      }
    } catch (error) {
      console.error("Error adding foto:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFoto = async (id: number) => {
    try {
      const response = await fetch(`/api/fotos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error("Error deleting foto:", error)
    }
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al Inicio
              </Link>
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Panel de Administración
            </h1>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="servicios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="servicios">Gestionar Servicios</TabsTrigger>
            <TabsTrigger value="galeria">Gestionar Galería</TabsTrigger>
          </TabsList>

          <TabsContent value="servicios" className="space-y-6">
            {/* Formulario para agregar servicio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Agregar Nuevo Servicio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddServicio} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre del Servicio</Label>
                      <Input
                        id="name"
                        value={servicioForm.name}
                        onChange={(e) => setServicioForm({ ...servicioForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={servicioForm.price}
                        onChange={(e) => setServicioForm({ ...servicioForm, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="icon">Icono (emoji)</Label>
                    <Input
                      id="icon"
                      value={servicioForm.icon}
                      onChange={(e) => setServicioForm({ ...servicioForm, icon: e.target.value })}
                      placeholder="💅"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={servicioForm.descripcion}
                      onChange={(e) => setServicioForm({ ...servicioForm, descripcion: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="foto">Foto del Servicio</Label>
                    <Input
                      id="foto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setServicioForm({ ...servicioForm, foto: e.target.files?.[0] || null })}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full">
                    {uploading ? "Subiendo..." : "Agregar Servicio"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Lista de servicios */}
            <Card>
              <CardHeader>
                <CardTitle>Servicios Actuales</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">Cargando servicios...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {servicios.map((servicio) => (
                      <div key={servicio.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{servicio.icon}</span>
                            <h3 className="font-semibold">{servicio.name}</h3>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteServicio(servicio.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                        <Badge variant="secondary">${servicio.price}</Badge>
                        <div className="relative h-32 w-full">
                          <Image
                            src={servicio.foto || "/placeholder.svg"}
                            alt={servicio.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="galeria" className="space-y-6">
            {/* Formulario para agregar foto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Agregar Nueva Foto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFoto} className="space-y-4">
                  <div>
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={fotoForm.fecha}
                      onChange={(e) => setFotoForm({ ...fotoForm, fecha: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fotoGaleria">Foto</Label>
                    <Input
                      id="fotoGaleria"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFotoForm({ ...fotoForm, foto: e.target.files?.[0] || null })}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full">
                    {uploading ? "Subiendo..." : "Agregar Foto"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Galería actual */}
            <Card>
              <CardHeader>
                <CardTitle>Galería Actual</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">Cargando galería...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {fotos.map((foto) => (
                      <div key={foto.id} className="relative group">
                        <div className="relative h-48 w-full">
                          <Image
                            src={foto.url || "/placeholder.svg"}
                            alt={`Foto del ${foto.fecha}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteFoto(foto.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">{foto.fecha}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
