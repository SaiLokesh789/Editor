import { env } from "@/data/env/server"
import { OAuthClient } from "./base"
import { z } from "zod"

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: "google",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    scopes: ["email", "profile"],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v2/userinfo"
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        name: z.string().nullable(),
        email: z.string().email(),
      }),
      parser: user => ({
        id: user.id.toString(),
        name: user.name ?? user.email,
        email: user.email,
      }),
    },
  })
}
