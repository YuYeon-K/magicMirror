import { updateSpotifyAccessToken } from "@/app/stores/settingsClient"
import { redirect } from "next/navigation"
export const dynamic = "force-dynamic"

export async function GET() {
  await updateSpotifyAccessToken(null)
  redirect("/settings")
}
