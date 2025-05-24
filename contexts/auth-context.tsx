"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (name: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const authTimestamp = localStorage.getItem("authTimestamp")

      if (authStatus === "true" && authTimestamp) {
        // Verificar si la sesión no ha expirado (24 horas)
        const now = Date.now()
        const loginTime = Number.parseInt(authTimestamp)
        const twentyFourHours = 24 * 60 * 60 * 1000

        if (now - loginTime < twentyFourHours) {
          setIsAuthenticated(true)
        } else {
          // Sesión expirada
          localStorage.removeItem("isAuthenticated")
          localStorage.removeItem("authTimestamp")
          setIsAuthenticated(false)
        }
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const setCookie = (name: string, value: string, days = 1) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
  }

  const login = async (name: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("authTimestamp", Date.now().toString())
        setCookie("isAuthenticated", "true", 1) // Cookie por 1 día
        return true
      }
      return false
    } catch (error) {
      console.error("Error en login:", error)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("authTimestamp")
    deleteCookie("isAuthenticated")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
