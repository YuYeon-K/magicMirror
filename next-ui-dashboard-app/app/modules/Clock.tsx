"use client"

import React, { useEffect, useState } from "react"

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const formattedTime = now
        .toLocaleTimeString("en-US")
        .replace(" a.m.", " AM")
        .replace(" p.m.", " PM")
      setTime(formattedTime)
      setDate(
        new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }).format(now)
      )
    }

    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-right">
      <h6 className="text-8xl mb-2">{time}</h6>
      <h6 className="text-4xl font-bold">{date}</h6>
    </div>
  )
}

export default Clock
