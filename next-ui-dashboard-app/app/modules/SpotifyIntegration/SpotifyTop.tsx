import {
  SpotifyTokenStore,
  checkSpotifyTokenExpired
} from "@/app/lib/spotifyDataTypes"
import { SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk"
import { requestFromRefreshToken } from "@/app/lib/spotifyToken"

const SpotifyTop = async ({
  spotifyStore
}: {
  spotifyStore: SpotifyTokenStore | null
}) => {
  if (spotifyStore === null) return <div>Spotify account not setup...</div>

  // Check token expiry
  if (checkSpotifyTokenExpired(spotifyStore)) {
    spotifyStore = await requestFromRefreshToken(spotifyStore)
  }

  // Request Top Artists and Songs
  const topTracksReq = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=4",
    {
      headers: {
        Authorization: `Bearer ${spotifyStore.token.access_token}`
      }
    }
  )
  if (topTracksReq.status == 204) return <h1>Nothing Playing on Spotify...</h1>
  const topTracks: Track[] = (await topTracksReq.json()).items
  function getArtistsString(artists: SimplifiedArtist[]) {
    let artistString: string = ""
    for (let i = 0; i < 2 && i < artists.length - 1; i++) {
      artistString += artists[i].name + ", "
    }
    artistString += artists[artists.length - 1].name
    return artistString
  }
  return (
    <div className="flex flex-col gap-1 my-5 max-w-80">
      <h1 className="text-xl">Recent Favourites:</h1>
      <div className="grid grid-cols-2 gap-2">
        {topTracks.map((track: Track, i: number) => {
          const artistString = getArtistsString(track.artists)
          return (
            <div key={i}>
              <h2>{track.name}</h2>
              <h3 className="text-sm">{artistString}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SpotifyTop
