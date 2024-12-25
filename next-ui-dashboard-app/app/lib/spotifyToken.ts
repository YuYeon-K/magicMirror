"use server"
import {
  SpotifyTokenStore,
  SpotifyAccessToken,
  checkSpotifyTokenExpired
} from "./spotifyDataTypes"
import { updateSpotifyAccessToken } from "../stores/settingsClient"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

export async function requestFromRefreshToken(
  spotifyTokenStore: SpotifyTokenStore
) {
  if (!checkSpotifyTokenExpired(spotifyTokenStore)) return spotifyTokenStore
  if (!spotifyTokenStore.refresh_token)
    throw new Error("No Refresh Token, redirect to login...")

  const accessTokenReq = await fetch(
    `https://accounts.spotify.com/api/token?refresh_token=${spotifyTokenStore.refresh_token}&grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${client_id}:${client_secret}`)
      }
    }
  )
  let accessToken: SpotifyAccessToken
  try {
    accessToken = await accessTokenReq.json()
  } catch (e) {
    throw e
  }
  const spotifyStore = {
    refresh_token: accessToken.refresh_token || spotifyTokenStore.refresh_token,
    token: accessToken,
    expires: Date.now() + accessToken.expires_in * 1000
  }
  await updateSpotifyAccessToken(spotifyStore)
  return spotifyStore
}

// TODO: Eventually the token should be stored in a database
