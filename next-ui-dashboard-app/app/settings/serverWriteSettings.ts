"use server"
import { MirrorSettings } from "../lib/dbAccess"
import { db, DEFAULT_SETTINGS } from "../stores/settingsClient"
export async function writeSettings(formJSON: string) {
  const formData = JSON.parse(formJSON) as {
    [k: string]: FormDataEntryValue
  }
  let settings = await db.getSettings()
  function filterString(str: string) {
    return str.replace(/[^a-zA-Z0-9,.-\s]/gi, "")
  }
  if (settings === null) {
    settings = DEFAULT_SETTINGS
  } else {
    delete settings._id
  }
  const newSettings: MirrorSettings = {
    ...settings,
    news: {
      keywords: filterString(String(formData.NEWSkeywords)),
      countries: filterString(String(formData.NEWScountries)),
      categories: filterString(String(formData.NEWScategories)),
      languages: filterString(String(formData.NEWSlanguages)),
      domains: filterString(String(formData.NEWSdomains)),
      excludeDomains: filterString(String(formData.NEWSexcludeDomains)),
      numberOfArticles: Number(formData.NEWSnumberOfArticles)
    },
    weather: {
      longitude:
        filterString(String(formData.WEATHERlongitude)).trim() === ""
          ? null
          : Number(filterString(String(formData.WEATHERlongitude))),
      latitude:
        filterString(String(formData.WEATHERlatitude)).trim() === ""
          ? null
          : Number(filterString(String(formData.WEATHERlatitude))),
      tempUnit: filterString(String(formData.WEATHERtempUnit)) as
        | "Fahrenheit"
        | "Celsius",
      speedUnit: filterString(String(formData.WEATHERspeedUnit)) as
        | "km/h"
        | "m/s"
        | "kn"
        | "mph",
      country: filterString(String(formData.WEATHERcountry)),
      state: filterString(String(formData.WEATHERstate)),
      city: filterString(String(formData.WEATHERcity))
    },
    outfitSuggestions: {
      style: filterString(String(formData.OUTFITstyle)),
      gender: filterString(String(formData.OUTFITgender))
    },
    photos: {
      category: filterString(String(formData.PHOTOcategory)) as
        | "Wildlife"
        | "Landscape"
        | "Cityscape"
        | "Space"
    },
    settingsUpdated: true
  }
  db.writeSettings(newSettings)
  console.log(newSettings)
}
