"use client"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  fetchSettingsChanged,
  pushSettingsChanged
} from "./serverSettingsChanged"
export default function PageRefreshTimer() {
  const router = useRouter()
  const THIRTY_SEVEN_MINUTES = 2220000
  function refreshPage() {
    router.refresh()
  }
  const lastRefresh = useRef(Date.now())
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout

    pushSettingsChanged().then(() => {
      console.log("Refreshed!")
      refreshInterval = setInterval(() => {
        fetchSettingsChanged().then((res) => {
          if (res === true) {
            refreshPage()
          }
        })
        if (Date.now() > lastRefresh.current + THIRTY_SEVEN_MINUTES) {
          lastRefresh.current = Date.now()
          refreshPage()
        }
      }, 6000)
    })

    return () => {
      clearInterval(refreshInterval)
    }
  })
  return <div></div>
}
