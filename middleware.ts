import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar si está accediendo a rutas de admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // En el cliente, verificaremos la autenticación
    // El middleware solo redirige si no hay token en las cookies
    const authCookie = request.cookies.get("isAuthenticated")

    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
