"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"

export default function UsersPage() {
  return (
    <div className="flex flex-col">
      <Header title="User Management" breadcrumb="User" />

      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="w-full max-w-2xl border-[#2a2a2a] bg-[#1a1a1a]">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FF6B00]/10">
              <svg className="h-12 w-12 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Feature Coming Soon</h2>
            <p className="text-center text-gray-400">
              User management functionality is currently under development.
              <br />
              Check back soon for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
