"use server"
import { WeatherData } from "./weatherData"

export async function fetchWeather(
  latitude: number,
  longitude: number,
  tempUnit: "Fahrenheit" | "Celsius",
  speedUnit: "km/h" | "mph" | "m/s" | "kn"
): Promise<WeatherData> {
  const tempUnitStr =
    tempUnit == "Fahrenheit" ? "&temperature_unit=fahrenheit" : ""
  let speedUnitStr: string
  switch (speedUnit) {
    case "mph":
      speedUnitStr = "&wind_speed_unit=mph"
      break
    case "kn":
      speedUnitStr = "&wind_speed_unit=kn"
      break
    case "m/s":
      speedUnitStr = "&wind_speed_unit=ms"
      break
    default:
      speedUnitStr = ""
      break
  }
  const data = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max&timezone=auto${tempUnitStr}${speedUnitStr}`
  )
  const weatherInfo = await data.json()
  if (!weatherInfo)
    throw new Error("fetchWeather: Failed to fetch weather data!")

  const temperature = Math.round(weatherInfo.current.temperature_2m)
  const temperatureApparent = Math.round(
    weatherInfo.current.apparent_temperature
  )
  const wind = Math.round(weatherInfo.current.wind_speed_10m)
  const dailyHigh = Math.round(weatherInfo.daily.apparent_temperature_max[0])
  const dailyLow = Math.round(weatherInfo.daily.apparent_temperature_min[0])
  const UVindex: number = weatherInfo.daily.uv_index_max[0]
  const code: number = weatherInfo.current.weather_code
  const finalData = new WeatherData(
    temperature,
    temperatureApparent,
    dailyHigh,
    dailyLow,
    UVindex,
    wind,
    code
  )
  finalData.temperatureUnit = tempUnit.toLowerCase()
  finalData.windSpeedUnit = speedUnit
  return finalData
  //
}
