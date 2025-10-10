"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import type { Investment } from "@/lib/types"

interface InvestmentDetailModalProps {
  investment: Investment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InvestmentDetailModal({ investment, open, onOpenChange }: InvestmentDetailModalProps) {
  if (!investment) return null

  const investors = investment.invest || []
  const galleryImages = investment.image || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-[#2a2a2a] p-0">
        <div className="relative">
          {/* Hero Image */}
          <div className="h-64 w-full overflow-hidden bg-[#2a2a2a]">
            {investment.image && investment.image.length > 0 ? (
              <img
                src={investment.image[0].url || "/placeholder.svg"}
                alt={investment.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#2a2a2a]" />
            )}
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Header */}
            <div>
              <Badge className="mb-3 bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90">
                {investment.category[0] || "General"}
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-4">{investment.name}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{investment.description}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{investment.location}</span>
            </div>

            {/* Progress Bar - Using dummy data for now as API doesn't provide progress */}
            <div className="space-y-2">
              <div className="h-2 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: "45%" }} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">45%</p>
                  <p className="text-xs text-gray-400">of ${investment.funding_goal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{investors.length}</p>
                  <p className="text-xs text-gray-400">Backers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{investment.funding_duration}</p>
                  <p className="text-xs text-gray-400">Duration</p>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* About This Project */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">About This Project</h3>
                  <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                    <p>{investment.description}</p>
                  </div>
                </div>

                {/* Investment Terms */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Investment Terms</h3>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    <p>{investment.investment_terms}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {galleryImages.slice(0, 3).map((img, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-[#2a2a2a]">
                          <img
                            src={img.url || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investor */}
                {investors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Investor</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {investors.slice(0, 4).map((investor: any, index: number) => (
                        <div key={index} className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-medium text-white">Investor</p>
                              <p className="text-[10px] text-gray-400">Investment</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-[#2a2a2a]">
                            <p className="text-[10px] text-gray-400">Investment Amount:</p>
                            <p className="text-sm font-semibold text-[#FF6B00]">$1000</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
