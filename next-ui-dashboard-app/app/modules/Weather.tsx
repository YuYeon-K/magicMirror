import Icon from "@mdi/react"
import { mdiWeatherSunnyAlert } from "@mdi/js"
import { mdiWeatherWindy } from "@mdi/js"
import { WeatherData } from "../lib/weatherData"
import { fetchWeather } from "../lib/fetchWeather"
import Link from "next/link"

const Weather = async ({
  latitude,
  longitude,
  tempUnit,
  speedUnit
}: {
  longitude: number
  latitude: number
  tempUnit: "Fahrenheit" | "Celsius"
  speedUnit: "km/h" | "mph" | "m/s" | "kn"
}) => {
  let currWeather: WeatherData | null = null

  try {
    currWeather = await fetchWeather(latitude, longitude, tempUnit, speedUnit)
  } catch {
    currWeather = null
  }

  return currWeather ? (
    <div>
      <div className="flex">
        <div className="flex-none w-100">
          <Icon
            // className="fill-current text-[#fcca56]"
            path={currWeather.getWeatherEvent().icon}
            size={9}
          />
        </div>

        <div className="pr-10"></div>

        <div className="flex flex-col items-start">
          <div className="mb-3">
            <h1 className="text-7xl">
              {currWeather.temperature}{" "}
              {`°${currWeather.temperatureUnit == "fahrenheit" ? "F" : "C"}`}
            </h1>
          </div>
          <div className="mb-5">
            <h1 className="text-2xl">
              Feels Like {currWeather.temperatureApparent}{" "}
              {`°${currWeather.temperatureUnit == "fahrenheit" ? "F" : "C"}`}
            </h1>
          </div>
          <h1 className="text-2xl">{currWeather.getWeatherEvent().desc} </h1>
        </div>

        <div className="flex-grow"></div>
        <div className="flex-justify-end pr-2">
          <div className="mb-2">
            <h1 className="text-2xl text-right">
              High: {currWeather.dailyHigh}{" "}
              {`°${currWeather.temperatureUnit == "fahrenheit" ? "F" : "C"}`}
            </h1>
          </div>
          <h1 className="text-2xl text-right">
            Low: {currWeather.dailyLow}{" "}
            {`°${currWeather.temperatureUnit == "fahrenheit" ? "F" : "C"}`}
          </h1>

          <div className="flex justify-end items-center mt-4">
            <div className="flex-none w-8">
              <Icon path={mdiWeatherSunnyAlert} size={1.5} />
            </div>

            <h1 className="text-2xl text-right ml-4">
              UV Index: {currWeather.UVIndex} ~ {currWeather.getUVString()}
            </h1>
          </div>

          <div className="flex justify-end items-center mt-4">
            <div className="flex-none w-8">
              <Icon path={mdiWeatherWindy} size={1.5} />
            </div>
            <h1 className="text-2xl text-right ml-4">
              Wind: {currWeather.wind} {currWeather.windSpeedUnit}
            </h1>
          </div>
          <div className="text-right text-xs">
            <Link href="https://open-meteo.com/">
              Weather data by Open-Meteo.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No Weather Data!</div>
  )
}

export default Weather
