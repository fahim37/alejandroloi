import axiosInstance from "./axios"

// Auth APIs
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", { email, password })
    return response.data
  },
  forgotPassword: async (email: string) => {
    const response = await axiosInstance.post("/auth/forget", { email })
    return response.data
  },
  verifyOtp: async (email: string, otp: string) => {
    const response = await axiosInstance.post("/auth/verify", { email, otp })
    return response.data
  },
  resetPassword: async (email: string, otp: string, password: string) => {
    const response = await axiosInstance.post("/auth/reset-password", { email, otp, password })
    return response.data
  },
}

// Project APIs
export const projectApi = {
  getAllProjects: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get(`/project/all-project?page=${page}&limit=${limit}`)
    return response.data
  },
  deleteProject: async (id: string) => {
    const response = await axiosInstance.delete(`/project/${id}`)
    return response.data
  },
}

// Investment APIs
export const investmentApi = {
  getAllInvestments: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get(`/investment/all-investment?page=${page}&limit=${limit}`)
    return response.data
  },
  deleteInvestment: async (id: string) => {
    const response = await axiosInstance.delete(`/investment/${id}`)
    return response.data
  },
}

// Auction APIs
export const auctionApi = {
  getAllAuctions: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get(`/auction/all-auction?page=${page}&limit=${limit}`)
    return response.data
  },
  deleteAuction: async (id: string) => {
    const response = await axiosInstance.delete(`/auction/${id}`)
    return response.data
  },
}

// User APIs
export const userApi = {
  getAllUsers: async () => {
    const response = await axiosInstance.get("/user/all-user")
    return response.data
  },
  deleteUser: async (id: string) => {
    const response = await axiosInstance.delete(`/user/delete-user/${id}`)
    return response.data
  },
}
