"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { userApi } from "@/lib/api"
import type { User } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

export default function UserPage() {
  const queryClient = useQueryClient()
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAllUsers,
  })

  const deleteMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User deleted successfully")
      setDeleteUserId(null)
    },
    onError: () => {
      toast.error("Failed to delete user")
    },
  })

  const users: User[] = data?.data?.usersWithCounts || []

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Auctions</h1>
        <p className="text-gray-400">Dashboard {">"} User</p>
      </div>

      <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Investments Create</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Project Create</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Auctions Create</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Investments</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Project</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Auctions</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#2a2a2a]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                    </td>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <Skeleton className="h-4 w-8" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                          <AvatarFallback className="bg-[#FF6B00] text-white">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{user.investCount}</td>
                    <td className="px-6 py-4 text-white">{user.projectCount}</td>
                    <td className="px-6 py-4 text-white">{user.auctionCount}</td>
                    <td className="px-6 py-4 text-white">{user.investCount}</td>
                    <td className="px-6 py-4 text-white">{user.projectCount}</td>
                    <td className="px-6 py-4 text-white">{user.auctionCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDeleteUserId(user._id)}
                          className="rounded p-2 text-gray-400 hover:bg-[#2a2a2a] hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the user and all their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && deleteMutation.mutate(deleteUserId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
