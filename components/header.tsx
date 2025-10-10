"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { signOut } from "next-auth/react"

interface HeaderProps {
  title: string
  breadcrumb?: string
}

export function Header({ title, breadcrumb }: HeaderProps) {
  const handleLogout = async () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <div className="flex h-16 items-center justify-between border-b border-[#2a2a2a] bg-[#1a1a1a] px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {breadcrumb && <p className="text-sm text-gray-400">Dashboard &gt; {breadcrumb}</p>}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-[#2a2a2a]">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Alex rock</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
