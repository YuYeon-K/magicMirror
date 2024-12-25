import { MongoClient, ServerApiVersion, ObjectId, Db } from "mongodb"
import { SpotifyTokenStore } from "./spotifyDataTypes"

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

export interface MirrorSettings {
  _id?: ObjectId
  username: string // will be default always for now
  settingsUpdated: boolean
  weather: {
    longitude: number | null
    latitude: number | null
    tempUnit: "Fahrenheit" | "Celsius"
    speedUnit: "km/h" | "mph" | "m/s" | "kn"
    country: string
    city: string
    state: string
  }
  outfitSuggestions: {
    style: string
    gender: string
  }
  spotifyToken: SpotifyTokenStore | null
  news: {
    keywords: string
    countries: string
    categories: string
    languages: string
    domains: string
    excludeDomains: string
    numberOfArticles: number
  }
  photos: {
    category: "Wildlife" | "Landscape" | "Cityscape" | "Space"
  }
}

export class DBAccess {
  private client: MongoClient
  private dbName: string
  private settingsCollection: string
  private db: Db
  constructor(dbName: string, settingsCollection: string) {
    if (CONNECTION_STRING == undefined) {
      throw Error(
        "[ERROR] DBAccess: No Connection String! Set the MONGODB_CONNECTION_STRING env variable."
      )
    }
    this.client = new MongoClient(CONNECTION_STRING, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.dbName = dbName
    this.settingsCollection = settingsCollection
    this.db = this.client.db(this.dbName)
  }

  async ping() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      )
    } catch (e) {
      throw e
    }
  }

  async getSettings(): Promise<MirrorSettings | null> {
    const username = process.env.MIRROR_ID || "default"
    try {
      const settings = (await this.db
        .collection(this.settingsCollection)
        .findOne({ username: username })) as MirrorSettings | null
      return settings
    } catch (e) {
      throw e
    }
  }

  async writeSettings(settings: MirrorSettings): Promise<void> {
    try {
      await this.db
        .collection(this.settingsCollection)
        .updateOne(
          { username: settings.username },
          { $set: settings },
          { upsert: true }
        )
    } catch (e) {
      throw e
    }
  }
}
