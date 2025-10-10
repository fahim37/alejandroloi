"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { investmentApi } from "@/lib/api";
import type { Investment, ApiResponse } from "@/lib/types";
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
import { InvestmentDetailModal } from "@/components/investment-detail-modal";

export default function InvestmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ApiResponse<Investment>>({
    queryKey: ["investments", currentPage],
    queryFn: () => investmentApi.getAllInvestments(currentPage, 7),
  });

  const deleteMutation = useMutation({
    mutationFn: investmentApi.deleteInvestment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast.success("Investment deleted successfully");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete investment");
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

  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowDetailModal(true);
  };

  const totalPages = data?.data.meta.pages || 1;

  return (
    <div className="flex flex-col">
      <Header title="Investments" breadcrumb="Investments" />

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
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Funding Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Funding Goal
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
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-20" />
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
                  : data?.data.investments?.map((investment, index) => (
                      <tr
                        key={investment._id}
                        className="border-b border-[#2a2a2a] last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#2a2a2a]">
                              {investment.image &&
                              investment.image.length > 0 ? (
                                <img
                                  src={
                                    investment.image[0].url ||
                                    "/placeholder.svg"
                                  }
                                  alt={investment.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              ) : (
                                <div className="h-full w-full bg-[#2a2a2a]" />
                              )}
                            </div>

                            <div className="min-w-0">
                              {" "}
                              {/* ensures text truncates nicely */}
                              <p className="font-medium text-white">
                                {investment.name}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {investment.description}
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
                            {investment.category[0] || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-white">
                            {investment.location}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-white">
                            {investment.funding_duration}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-white">
                            ${investment.funding_goal.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              index % 2 === 0
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                            }
                          >
                            {index % 2 === 0 ? "Completed" : "Process"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => handleViewDetails(investment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-red-500"
                              onClick={() => handleDelete(investment._id)}
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

      {/* Investment Detail Modal */}
      <InvestmentDetailModal
        investment={selectedInvestment}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              investment.
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
