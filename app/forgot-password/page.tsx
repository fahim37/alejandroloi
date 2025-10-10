"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { Mail } from "lucide-react"
import { toast } from "sonner"
import { authApi } from "@/lib/api"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await authApi.forgotPassword(email)
      if (response.success) {
        toast.success("OTP sent to your email")
        localStorage.setItem("resetEmail", email)
        router.push("/verify-otp")
      } else {
        toast.error(response.message || "Failed to send OTP")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/login-background.png')" }}
      />

      {/* Decorative elements overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/60 via-[#2a1810]/40 to-[#1a1a1a]/60" />

      <div className="absolute left-0 top-0 h-32 w-32 rounded-full border-2 border-gray-700/30 opacity-20" />
      <div className="absolute right-20 top-20 h-3 w-3 rounded-full bg-gray-600/50" />
      <div className="absolute right-32 top-16 h-3 w-3 rounded-full bg-gray-600/50" />
      <div className="absolute right-44 top-20 h-3 w-3 rounded-full bg-gray-600/50" />
      <div className="absolute right-56 top-16 h-3 w-3 rounded-full bg-gray-600/50" />
      <div className="absolute right-[270px] top-20 h-3 w-3 rounded-full bg-gray-600/50" />

      <div className="absolute bottom-20 left-20 h-16 w-16 rotate-45 border-2 border-gray-700/30 opacity-20" />
      <div className="absolute bottom-32 left-32 h-12 w-12 rotate-45 border-2 border-gray-700/30 opacity-20" />

      <div className="absolute bottom-1/4 right-20 h-64 w-64 rounded-full border-[40px] border-[#4a2810]/30 opacity-30" />

      <div className="absolute bottom-10 left-5 h-2 w-2 rounded-full bg-gray-600/50" />
      <div className="absolute bottom-16 left-10 h-2 w-2 rounded-full bg-gray-600/50" />

      {/* Forgot Password form */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-[#1a1a1a]/90 p-8 backdrop-blur-sm border border-[#2a2a2a]/50">
        <div className="flex flex-col items-center space-y-6">
          <Logo />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter the email address associated with your account. We'll send you an OTP to your email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-[#2a2a2a] pl-10 text-white placeholder:text-gray-500"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="h-12 w-full bg-[#FF6B00] text-white hover:bg-[#ff7a1a]">
            {isLoading ? "Sending..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
