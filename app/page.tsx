import { Hero } from "@/components/hero"
import { Servicios } from "@/components/servicios"
import { Galeria } from "@/components/galeria"
import { Footer } from "@/components/footer"
import { AdminAccessButton } from "@/components/admin-access-button"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <AdminAccessButton />
      <Hero />
      <Servicios />
      <Galeria />
      <Footer />
    </main>
  )
}
