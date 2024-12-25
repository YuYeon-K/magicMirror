import {
  SpotifyTokenStore,
  checkSpotifyTokenExpired
} from "@/app/lib/spotifyDataTypes"
import { Track } from "@spotify/web-api-ts-sdk"
import { requestFromRefreshToken } from "@/app/lib/spotifyToken"
import SpotifyNowPlayingInner from "./SpotifyNowPlayingInner"
const NO_RESULTS_HTTP_CODE = 204

const SpotifyNowPlaying = async ({
  spotifyStore
}: {
  spotifyStore: SpotifyTokenStore | null
}) => {
  if (spotifyStore === null) return <div>Spotify account not setup...</div>
  async function getSpotifyNowPlaying() {
    "use server"
    if (spotifyStore === null) return null
    if (checkSpotifyTokenExpired(spotifyStore)) {
      spotifyStore = await requestFromRefreshToken(spotifyStore)
    }
    const currentlyPlayingReq = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${spotifyStore.token.access_token}`
        }
      }
    )
    if (currentlyPlayingReq.status == NO_RESULTS_HTTP_CODE) return null
    const songData: { item: Track } = await currentlyPlayingReq.json()
    return JSON.stringify(songData)
  }
  // Check token expiry

  // Make request to spotify API
  return (
    <SpotifyNowPlayingInner
      dataHandler={getSpotifyNowPlaying}
    ></SpotifyNowPlayingInner>
  )
}

export default SpotifyNowPlaying
