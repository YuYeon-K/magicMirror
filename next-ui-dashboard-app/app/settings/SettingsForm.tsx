"use client"
import { FormEvent } from "react"
import { MirrorSettings } from "../lib/dbAccess"
import { mdiSpotify } from "@mdi/js"
import Icon from "@mdi/react"
import { writeSettings } from "./serverWriteSettings"
import { useRouter } from "next/navigation"
const SettingsForm = ({
  currentSettingsStr,
  spotifyLoggedIn,
  userName
}: {
  currentSettingsStr: string
  spotifyLoggedIn: boolean
  userName: string | undefined
}) => {
  const settings = JSON.parse(currentSettingsStr) as MirrorSettings
  const router = useRouter()
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault()

    // Read the form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    //hardcode which setting goes to which api
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries())
    writeSettings(JSON.stringify(formJson)).then(() => {
      window.location.reload()
    })
  }
  return (
    <form
      method="post"
      className="bg-white text-black p-4"
      onSubmit={handleSubmit}
    >
      <p>Please modify the settings as you wish, then press save.</p>
      <br></br>
      <button
        type="submit"
        className="border-solid border-black border-2 p-2 rounded hover:bg-gray-400"
      >
        Save Settings
      </button>
      <br></br>
      <br></br>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <h1 className="text-2xl">NEWS SETTINGS</h1>
          <br></br>
          <label>
            Keywords (max 512 characters):{" "}
            <input
              name="NEWSkeywords"
              type="text"
              placeholder="type here"
              defaultValue={settings.news.keywords || ""}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Countries:{" "}
            <input
              name="NEWScountries"
              type="text"
              placeholder="type here"
              defaultValue={settings.news.countries || ""}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <h6 className="text-xs">
            Go here to see a list of all country codes:
            https://bit.ly/MagicMirrorCountries
          </h6>
          <br></br>
          <label>
            Categories:{" "}
            <input
              name="NEWScategories"
              type="text"
              placeholder="type here"
              defaultValue={settings.news.categories}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <h6 className="text-xs">
            Go here to see a list of all category codes:
            https://bit.ly/MagicMirrorCategories
          </h6>
          <br></br>
          <label>
            Languages:{" "}
            <input
              name="NEWSlanguages"
              type="text"
              placeholder="type here"
              defaultValue={settings.news.languages}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <h6 className="text-xs">
            Go here to see a list of all language codes:
            https://bit.ly/MagicMirrorLanguages
          </h6>
          <br></br>
          <label>
            Domains:{" "}
            <input
              name="NEWSdomains"
              type="text"
              placeholder="type here"
              defaultValue={settings.news.domains}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Exclude Domains:{" "}
            <input
              name="NEWSexcludeDomains"
              type="text"
              placeholder="type here"
              defaultValue={settings.news.excludeDomains}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Number of Articles (max 5):{" "}
            <input
              name="NEWSnumberOfArticles"
              type="number"
              max="10"
              required
              defaultValue={settings.news.numberOfArticles}
              className="border-solid border-black border-2"
            />
          </label>
          <br></br>
          <br></br>
        </div>

        <div>
          <h1 className="text-2xl">WEATHER SETTINGS</h1>
          <label>Longitude: </label>
          <input
            name="WEATHERlongitude"
            type="text"
            defaultValue={settings.weather.longitude || ""}
            className="border-solid border-black border-2"
          />
          <br />
          <br />
          <label>Latitude: </label>
          <input
            name="WEATHERlatitude"
            type="text"
            defaultValue={settings.weather.latitude || ""}
            className="border-solid border-black border-2"
          ></input>
          <br></br>
          <br></br>
          <h2 className="text-sm">
            Alternatively, if Latitude / Longitude is not specified, specify the
            following (only works for N. America and not always accurate!):{" "}
          </h2>
          <h6 className="text-xs">
            Latitude and Longitude will always be prioritized if specified{" "}
          </h6>
          <div className="bg-gray-400 rounded p-2">
            <label>ISO Country Code: </label>
            <input
              name="WEATHERcountry"
              type="text"
              defaultValue={settings.weather.country}
              className="border-solid border-black border-2"
            ></input>
            <br></br>
            <label>Province / State Code: </label>
            <input
              name="WEATHERstate"
              type="text"
              defaultValue={settings.weather.state}
              className="border-solid border-black border-2"
            ></input>
            <br></br>
            <label>City: </label>
            <input
              name="WEATHERcity"
              type="text"
              defaultValue={settings.weather.city}
              className="border-solid border-black border-2"
            ></input>
            <br></br>
            <br />
          </div>
          <br></br>
          <label>Temperature Unit: </label>
          <select
            name="WEATHERtempUnit"
            id="weatherUnit"
            defaultValue={settings.weather.tempUnit}
          >
            <option value="Fahrenheit">Fahrenheit</option>
            <option value={"Celsius"}>Celsius</option>
          </select>
          <br></br>
          <br />
          <label>Speed Unit: </label>
          <select
            name="WEATHERspeedUnit"
            defaultValue={settings.weather.speedUnit}
          >
            <option value="km/h">km/h</option>
            <option value="mph">mph</option>
            <option value="m/s">m/s</option>
            <option value="kn">Knots</option>
          </select>
        </div>

        <div>
          <h1 className="text-2xl">OUTFIT SETTINGS</h1>
          <label>
            Style Keywords (i.e. formal, casual, streetwear, etc.):{" "}
          </label>
          <input
            name="OUTFITstyle"
            type="text"
            required
            defaultValue={settings.outfitSuggestions.style}
            className="border-solid border-black border-2"
          />
          <br />
          <br />
          <label>Outfit Gender (i.e. men, women, unisex, etc.): </label>
          <input
            name="OUTFITgender"
            type="text"
            defaultValue={settings.outfitSuggestions.gender}
            className="border-solid border-black border-2"
          ></input>
        </div>
        <div>
          <h1 className="text-2xl">PHOTO SETTINGS</h1>
          <label>Category: </label>
          <select
            name="PHOTOcategory"
            id="photoCat"
            defaultValue={settings.photos.category}
          >
            <option value="Wildlife">Wildlife</option>
            <option value="Landscape">Landscape</option>
            <option value="Cityscape">Cityscape</option>
            <option value="Space">Space</option>
          </select>
        </div>
        <div>
          <h1 className="text-2xl">SPOTIFY SETTINGS</h1>
          {spotifyLoggedIn ? "Current Spotify Account: " + userName : ""}{" "}
          <br></br>
          <button
            className="bg-[#1ED760] p-4 m-4 rounded hover:bg-gray-400"
            onClick={() => {
              if (spotifyLoggedIn) router.push("/spotify_login/logout")
              else router.push("/spotify_login")
            }}
          >
            <span>
              <Icon path={mdiSpotify} size={1}></Icon>
              {spotifyLoggedIn && spotifyLoggedIn !== null
                ? "Unlink Account"
                : "Log into Spotify"}
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SettingsForm
