import OpenAI from "openai"
import { fetchWeather } from "../lib/fetchWeather"
import { WeatherData } from "../lib/weatherData"

const OutfitIdeas = async ({
  style,
  genderStyle,
  longitude,
  latitude,
  tempUnit,
  speedUnit
}: {
  style: string
  genderStyle: string
  longitude: number
  latitude: number
  tempUnit: "Fahrenheit" | "Celsius"
  speedUnit: "km/h" | "mph" | "m/s" | "kn"
}) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  const aiQueryData: {
    weather:
      | { weatherData: WeatherData | "No Data"; weatherEventDesc: string }
      | "No Data"
    genderStyle: string
    style: string
  } = {
    weather: "No Data",
    genderStyle: "Women",
    style: "Business Casual"
  }
  let currWeather: WeatherData | undefined = undefined

  try {
    currWeather = await fetchWeather(latitude, longitude, tempUnit, speedUnit)
    if (currWeather != undefined) {
      aiQueryData.weather = {
        weatherData: currWeather,
        weatherEventDesc: currWeather.getWeatherEvent().desc
      }
    }
  } catch {
    aiQueryData.weather = "No Data"
  }
  aiQueryData.genderStyle = genderStyle
  aiQueryData.style = style

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an assistant designed to provide an average person general outfit 
        ideas based on parameters specified in the user prompt. Those parameters may include things such as weather, 
        preferred styles, gender / unisex and will be provided as a JSON object of strings. 
        Provide exactly three ideas that are appropriate for the conditions provided only in an array of strings, 
        in JSON without any formatting.`
      },
      {
        role: "user",
        content: JSON.stringify(aiQueryData)
      }
    ]
  })

  const result: Array<string> | null = JSON.parse(
    completion.choices[0].message.content || "null"
  )
  return result ? (
    <div className="max-w-80">
      <div className="grid grid-cols-1 gap-4 max-w-80">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mb-5">OUTFIT IDEAS</h1>
        </div>
      </div>
      <ul className="list-disc space-y-4">
        <li className="text-lg">{result[0] || ""}</li>
        <li className="text-lg">{result[1] || ""}</li>
        <li className="text-lg">{result[2] || ""}</li>
      </ul>
    </div>
  ) : (
    <div></div>
  )
}

export default OutfitIdeas
