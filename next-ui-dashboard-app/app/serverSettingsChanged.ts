"use server"

import { db } from "./stores/settingsClient"

export async function fetchSettingsChanged() {
  return (await db.getSettings())?.settingsUpdated || false
}
export async function pushSettingsChanged() {
  const settings = await db.getSettings()
  if (settings !== null) {
    db.writeSettings({ ...settings, settingsUpdated: false })
  }
}
