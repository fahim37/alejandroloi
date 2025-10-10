import "next-auth"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    accessToken?: string
    refreshToken?: string
    role?: string
  }

  interface Session {
    user: {
      accessToken?: string
      refreshToken?: string
      role?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    role?: string
  }
}
