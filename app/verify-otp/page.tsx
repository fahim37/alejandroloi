"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { toast } from "sonner"
import { authApi } from "@/lib/api"

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split("")
      const newOtp = [...otp]
      pastedData.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char
        }
      })
      setOtp(newOtp)
      const nextIndex = Math.min(index + pastedData.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      toast.error("Please enter complete OTP")
      return
    }

    setIsLoading(true)
    const email = localStorage.getItem("resetEmail")

    if (!email) {
      toast.error("Email not found. Please start over.")
      router.push("/forgot-password")
      return
    }

    try {
      const response = await authApi.verifyOtp(email, otpString)
      if (response.success) {
        toast.success("OTP verified successfully")
        localStorage.setItem("verifiedOtp", otpString)
        router.push("/reset-password")
      } else {
        toast.error(response.message || "Invalid OTP")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    const email = localStorage.getItem("resetEmail")
    if (!email) return

    try {
      const response = await authApi.forgotPassword(email)
      if (response.success) {
        toast.success("OTP resent to your email")
        setCountdown(60)
      }
    } catch (error) {
      toast.error("Failed to resend OTP")
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

      {/* OTP Verification form */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-[#1a1a1a]/90 p-8 backdrop-blur-sm border border-[#2a2a2a]/50">
        <div className="flex flex-col items-center space-y-6">
          <Logo />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
            <p className="mt-2 text-sm text-gray-400">
              We'll send a verification code to your email. Check your inbox and enter the code here.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-16 w-14 rounded-lg bg-[#2a2a2a] text-center text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            ))}
          </div>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-400">Resend code in {countdown}s</p>
            ) : (
              <button type="button" onClick={handleResend} className="text-sm text-[#FF6B00] hover:underline">
                Resend code
              </button>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="h-12 w-full bg-[#FF6B00] text-white hover:bg-[#ff7a1a]">
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  )
}
