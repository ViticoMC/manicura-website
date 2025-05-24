"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, Shield, LogIn, User, LogOut } from "lucide-react"

export function AdminAccessButton() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogin = () => {
    router.push("/login")
  }

  const handleAdmin = () => {
    router.push("/admin")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`backdrop-blur-sm border-gray-200 hover:bg-white/90 shadow-lg transition-all duration-300 ${
              isAuthenticated ? "bg-green-100/80 border-green-300 text-green-700 hover:bg-green-200/90" : "bg-white/80"
            }`}
          >
            {isAuthenticated ? <Shield className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {isAuthenticated ? (
            <>
              <DropdownMenuItem onClick={handleAdmin} className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Panel Admin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar Sesión
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
