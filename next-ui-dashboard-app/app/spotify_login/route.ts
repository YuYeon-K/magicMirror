import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
function generateRandomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const client_id = process.env.SPOTIFY_CLIENT_ID
export async function GET(request: NextRequest) {
  const state = generateRandomString(16)
  const scope =
    "user-read-currently-playing user-top-read user-read-private user-read-email"
  const cookieStore = await cookies()
  cookieStore.set("state", state, {
    secure: true,
    httpOnly: true,
    sameSite: "lax"
  })
  console.log(request.headers.get("host"))
  redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${request.nextUrl.protocol + "//" + request.nextUrl.host}/spotify_login/callback&state=${state}`
  )
}
