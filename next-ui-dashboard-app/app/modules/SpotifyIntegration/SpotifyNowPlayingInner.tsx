"use client"
import { mdiSpotify } from "@mdi/js"
import Icon from "@mdi/react"
import { SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk"
import { useEffect, useState } from "react"
import Image from "next/image"

const SpotifyNowPlayingInner = ({
  dataHandler
}: {
  dataHandler: () => Promise<string | null>
}) => {
  const [songDataJSON, setSongDataJSON] = useState<string | null>(null)
  function getSongData(jsonData: string) {
    return JSON.parse(jsonData) as { item: Track }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      dataHandler().then((res) => setSongDataJSON(res))
    }, 6000)
    return () => {
      clearInterval(interval)
    }
  })
  if (songDataJSON == null)
    return (
      <div>
        <h1 className="text-2xl">Now Playing: </h1> <br></br>
        <div className="flex flex-row gap-4">
          <div className="w-[128px] h-[128px] bg-[#1ED760] rounded flex items-center justify-center">
            <Icon path={mdiSpotify} size={3} className=""></Icon>
          </div>
          <div className="flex flex-col max-w-60">
            <h2>Nothing Playing on Spotify...</h2>
          </div>
        </div>
      </div>
    )

  if (
    getSongData(songDataJSON).item === null ||
    getSongData(songDataJSON).item === undefined
  ) {
    return (
      <div>
        <h1 className="text-2xl">Now Playing: </h1> <br></br>
        <div className="flex flex-row gap-4">
          <div className="w-[128px] h-[128px] bg-[#1ED760] rounded flex items-center justify-center">
            <Icon path={mdiSpotify} size={3} className=""></Icon>
          </div>
          <div className="flex flex-col max-w-60">
            <h2>Nothing Playing on Spotify...</h2>
          </div>
        </div>
      </div>
    )
  }
  function getArtistsString(artists: SimplifiedArtist[]) {
    let artistString: string = ""
    for (let i = 0; i < 2 && i < artists.length - 1; i++) {
      artistString += artists[i].name + ", "
    }
    artistString += artists[artists.length - 1].name
    return artistString
  }
  const artistString = getArtistsString(getSongData(songDataJSON).item.artists)
  return (
    <div>
      <h1 className="text-2xl">Now Playing: </h1> <br></br>
      <div className="flex flex-row gap-4">
        {getSongData(songDataJSON).item.album.images[0].url ? (
          <Image
            src={getSongData(songDataJSON).item.album.images[0].url}
            width={getSongData(songDataJSON).item.album.images[0].width}
            height={getSongData(songDataJSON).item.album.images[0].height}
            alt="Album Cover"
            className="rounded max-w-[128px] max-h-[128px]"
          ></Image>
        ) : (
          ""
        )}
        <div className="flex flex-col max-w-60">
          <Icon path={mdiSpotify} size={1.5}></Icon>
          <h2 className="text-xl">{getSongData(songDataJSON).item.name}</h2>
          <h3 className="text-lg">{artistString}</h3>
        </div>
      </div>
    </div>
  )
}

export default SpotifyNowPlayingInner
