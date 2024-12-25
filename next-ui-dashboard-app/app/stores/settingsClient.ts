import { DBAccess, MirrorSettings } from "../lib/dbAccess"
import { SpotifyTokenStore } from "../lib/spotifyDataTypes"
import "use-server"

export const db = new DBAccess(
  "se101-finalproject-magicmirror-appdata",
  "mirrorSettings"
)

export const DEFAULT_SETTINGS: MirrorSettings = {
  username: process.env.MIRROR_ID || "default", // will be default always for now
  settingsUpdated: true,
  weather: {
    longitude: -80.5204,
    latitude: 43.4643,
    tempUnit: "Celsius",
    speedUnit: "km/h",
    country: "Canada",
    city: "Waterloo",
    state: "ON"
  },
  outfitSuggestions: {
    style: "Streetwear",
    gender: "Unisex"
  },
  news: {
    keywords: "",
    countries: "ca,us",
    categories: "politics,sports",
    languages: "en,fr",
    domains: "",
    excludeDomains: "",
    numberOfArticles: 3
  },
  photos: {
    category: "Wildlife"
  },
  spotifyToken: null
}

export async function updateSpotifyAccessToken(
  newTokenStore: SpotifyTokenStore | null
) {
  let settings = await db.getSettings()
  if (settings === null) {
    settings = DEFAULT_SETTINGS
  }
  settings.spotifyToken = newTokenStore
  settings.settingsUpdated = true
  db.writeSettings(settings)
}
