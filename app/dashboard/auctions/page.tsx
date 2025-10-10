"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { auctionApi } from "@/lib/api";
import type { Auction, ApiResponse } from "@/lib/types";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AuctionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiResponse<Auction>>({
    queryKey: ["auctions", currentPage],
    queryFn: () => auctionApi.getAllAuctions(currentPage, 7),
  });

  const deleteMutation = useMutation({
    mutationFn: auctionApi.deleteAuction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
      toast.success("Auction deleted successfully");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete auction");
    },
  });

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  const totalPages = data?.data.meta.pages || 1;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
            Live Now
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Completed
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/20">
            Upcoming
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col">
      <Header title="Auctions" breadcrumb="Auctions" />

      <div className="flex-1 p-8">
        <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Investments
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Starting Bid
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Auction Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Final Bid
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Winner
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 7 }).map((_, i) => (
                      <tr key={i} className="border-b border-[#2a2a2a]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-lg" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-48" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-8 w-8 rounded" />
                          </div>
                        </td>
                      </tr>
                    ))
                  : data?.data.auctions?.map((auction) => (
                      <tr
                        key={auction._id}
                        className="border-b border-[#2a2a2a] last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#2a2a2a]">
                              {auction.image && auction.image.length > 0 ? (
                                <img
                                  src={
                                    auction.image[0].url || "/placeholder.svg"
                                  }
                                  alt={auction.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-[#2a2a2a]" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium text-white">
                                {auction.name}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {auction.description}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src="/placeholder.svg?height=20&width=20" />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-400">
                                  User
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-white">
                            ${auction.starting_bid.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-white">
                            {auction.duration} minutes
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-white">$1200</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-white">
                                User
                              </p>
                              <p className="text-xs text-gray-400">@user</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(auction.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-red-500"
                              onClick={() => handleDelete(auction._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#2a2a2a] px-6 py-4">
            <p className="text-sm text-gray-400">
              Showing 1 to 7 of {data?.data.meta.total || 0} results
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className={
                        currentPage === i + 1
                          ? "bg-[#FF6B00] text-white"
                          : "text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                      }
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 5 && <PaginationEllipsis />}
                {totalPages > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(totalPages)}
                      isActive={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "bg-[#FF6B00] text-white"
                          : "text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                      }
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              auction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
