import { db, DEFAULT_SETTINGS } from "../stores/settingsClient"
import SettingsForm from "./SettingsForm"
import { UserProfile } from "@spotify/web-api-ts-sdk"
import { checkSpotifyTokenExpired } from "../lib/spotifyDataTypes"
import { requestFromRefreshToken } from "../lib/spotifyToken"
// import Icon from "@mdi/react"
// import { mdiSpotify } from "@mdi/js"
export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  let mirrorSettings = await db.getSettings()
  if (mirrorSettings === null) {
    db.writeSettings(DEFAULT_SETTINGS)
    mirrorSettings = DEFAULT_SETTINGS
  }
  let spotifyLoggedIn = false
  let userName: string = ""
  if (mirrorSettings.spotifyToken !== null) {
    spotifyLoggedIn = true
    let token = mirrorSettings.spotifyToken
    if (checkSpotifyTokenExpired(token)) {
      token = await requestFromRefreshToken(token)
    }
    const profileReq = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token.token.access_token}`
      }
    })
    const profile = (await profileReq.json()) as UserProfile
    userName = profile.email
    mirrorSettings.spotifyToken = null // Set to undefined before passing to client
  }

  return (
    <main className="text-white m-2">
      {/* <button className="border border-solid border-2 border-black rounded-lg">
        <Icon path={mdiSpotify} size={1.5}></Icon>{" "}
        {mirrorSettings.spotifyToken === undefined
          ? "Log In to Spotify"
          : "Log Out of Spotify"}
      </button> */}
      <h1 className="text-4xl">Settings!</h1>
      <br />
      <div></div>
      <SettingsForm
        currentSettingsStr={JSON.stringify(mirrorSettings)}
        spotifyLoggedIn={spotifyLoggedIn}
        userName={userName}
      ></SettingsForm>
    </main>
  )
}
