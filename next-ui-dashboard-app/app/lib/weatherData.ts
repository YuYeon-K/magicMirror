import {
  mdiWhiteBalanceSunny,
  mdiWeatherPartlyCloudy,
  mdiWeatherCloudy,
  mdiWeatherFog,
  mdiWeatherPartlyRainy,
  mdiWeatherRainy,
  mdiWeatherPartlySnowyRainy,
  mdiWeatherSnowyRainy,
  mdiWeatherPouring,
  mdiWeatherPartlySnowy,
  mdiWeatherSnowy,
  mdiWeatherSnowyHeavy,
  mdiWeatherHail,
  mdiWeatherLightning,
  mdiWeatherLightningRainy
} from "@mdi/js"

export interface WeatherEvent {
  desc: string
  icon: string
}

export class WeatherData {
  temperature: number
  temperatureApparent: number
  wind: number
  dailyHigh: number
  dailyLow: number
  UVIndex: number
  private weatherEventCode: number

  temperatureUnit = "celsius"
  windSpeedUnit = "km/h"

  private static weatherEventMap: { [n: number]: WeatherEvent } = {
    0: { desc: "Clear Sky", icon: mdiWhiteBalanceSunny },
    1: { desc: "Mainly Clear", icon: mdiWeatherPartlyCloudy },
    2: { desc: "Partly Cloudy", icon: mdiWeatherPartlyCloudy },
    3: { desc: "Overcast", icon: mdiWeatherCloudy },
    45: { desc: "Fog", icon: mdiWeatherFog },
    48: { desc: "Fog", icon: mdiWeatherFog },
    51: { desc: "Light Drizzle", icon: mdiWeatherPartlyRainy },
    53: { desc: "Moderate Drizzle", icon: mdiWeatherPartlyRainy },
    55: { desc: "Intense Drizzle", icon: mdiWeatherRainy },
    56: { desc: "Light Freezing Drizzle", icon: mdiWeatherPartlySnowyRainy },
    57: { desc: "Intense Freezing Drizzle", icon: mdiWeatherSnowyRainy },
    61: { desc: "Light Rain", icon: mdiWeatherPartlyRainy },
    63: { desc: "Moderate Rain", icon: mdiWeatherRainy },
    65: { desc: "Heavy Rain", icon: mdiWeatherRainy },
    66: { desc: "Light Freezing Rain", icon: mdiWeatherPartlySnowyRainy },
    67: { desc: "Heavy Freezing Rain", icon: mdiWeatherPouring },
    71: { desc: "Light Snow Fall", icon: mdiWeatherPartlySnowy },
    73: { desc: "Moderate Snow Fall", icon: mdiWeatherSnowy },
    75: { desc: "Heavy Snow Fall", icon: mdiWeatherSnowyHeavy },
    77: { desc: "Snow Grains", icon: mdiWeatherHail },
    80: { desc: "Light Rain Showers", icon: mdiWeatherPartlyRainy },
    81: { desc: "Moderate Rain Showers", icon: mdiWeatherRainy },
    82: { desc: "Heavy Rain Showers", icon: mdiWeatherRainy },
    85: { desc: "Light Snow Showers", icon: mdiWeatherPartlySnowyRainy },
    86: { desc: "Heavy Snow Showers", icon: mdiWeatherSnowyRainy },
    95: { desc: "Thunderstorms", icon: mdiWeatherLightning },
    96: {
      desc: "Thunderstorms with Light Hail",
      icon: mdiWeatherLightningRainy
    },
    99: {
      desc: "Thunderstorms with Heavy Hail",
      icon: mdiWeatherLightningRainy
    }
  }

  constructor(
    temp: number,
    tempApparent: number,
    dailyHigh: number,
    dailyLow: number,
    uvIndex: number,
    wind: number,
    weatherEventCode: number
  ) {
    this.temperature = temp
    this.temperatureApparent = tempApparent
    this.dailyHigh = dailyHigh
    this.dailyLow = dailyLow
    this.UVIndex = uvIndex
    this.wind = wind
    this.weatherEventCode = weatherEventCode
  }
  public getWeatherEvent(): WeatherEvent {
    return (
      WeatherData.weatherEventMap[this.weatherEventCode] || {
        desc: "No Data",
        icon: mdiWeatherCloudy
      }
    ) // the first part is undefined if no corresponding data
  }
  public getUVString(): string {
    if (this.UVIndex >= 0 && this.UVIndex < 3) {
      return "Low"
    } else if (this.UVIndex >= 3 && this.UVIndex < 6) {
      return "Moderate"
    } else if (this.UVIndex >= 6 && this.UVIndex < 8) {
      return "High"
    } else if (this.UVIndex >= 8 && this.UVIndex < 11) {
      return "Very High"
    } else {
      return "Extreme"
    }
  }
}
