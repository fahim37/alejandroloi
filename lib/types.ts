export interface ProjectProposal {
  userId: string
  cover_letter: string
  budget: number
  delivery_timer: string
  status: string
  _id: string
}

export interface Project {
  _id: string
  name: string
  description: string
  category: string[]
  budget_min: number
  budget_max: number
  image: any[] // Empty array in API response
  duration?: string
  location: string
  skills: string[]
  createdBy: string
  project_proposal: ProjectProposal[]
  createdAt: string
  updatedAt: string
  status?: string
  __v?: number
}

export interface ImageObject {
  url: string
  filename: string
  public_id: string
  _id: string
}

export interface Investment {
  _id: string
  name: string
  description: string
  category: string[]
  funding_goal: number
  image: ImageObject[]
  funding_duration: string
  location: string
  investment_terms: string
  createdBy: string
  invest: any[]
  createdAt: string
  updatedAt: string
  __v?: number
}

export interface Auction {
  _id: string
  name: string
  description: string
  category: string[]
  starting_bid: number
  image: ImageObject[]
  skills: string[]
  schedule: {
    date: string
    time: string
  }
  duration: number
  status: "upcoming" | "live" | "completed"
  createdBy: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export interface User {
  _id: string
  name: string
  email: string
  projectCount: number
  auctionCount: number
  investCount: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: {
    meta: {
      total: number
      page: number
      limit: number
      pages: number
    }
    projects?: T[]
    investments?: T[]
    auctions?: T[]
  }
}

export interface UserApiResponse {
  success: boolean
  message: string
  data: {
    usersWithCounts: User[]
  }
}
