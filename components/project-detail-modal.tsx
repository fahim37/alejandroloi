"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Clock, Users } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectDetailModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  if (!project) return null

  const proposals = project.project_proposal || []
  const postedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-[#2a2a2a] p-0">
        <div className="relative">
          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Header */}
            <div>
              <Badge className="mb-3 bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90">
                {project.category[0] || "General"}
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-4">{project.name}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Meta Info */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Posted on {postedDate}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-white">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    ${project.budget_min.toLocaleString()} - ${project.budget_max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{project.duration || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{proposals.length} Proposals</span>
                </div>
              </div>
            </div>

            {/* About This Project */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About This Project</h3>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>{project.description}</p>
              </div>
            </div>

            {/* Skills Required */}
            {project.skills && project.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Project Proposals */}
            {proposals.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Project Proposal</h3>
                <div className="grid grid-cols-2 gap-4">
                  {proposals.map((proposal) => (
                    <div key={proposal._id} className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">User</p>
                          <p className="text-xs text-gray-400 capitalize">{proposal.status}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{proposal.cover_letter}</p>
                      <div className="flex justify-between pt-2 border-t border-[#2a2a2a]">
                        <div>
                          <p className="text-xs text-gray-400">Budget</p>
                          <p className="text-sm font-semibold text-white">${proposal.budget}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Delivery Time</p>
                          <p className="text-sm font-semibold text-white">{proposal.delivery_timer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
