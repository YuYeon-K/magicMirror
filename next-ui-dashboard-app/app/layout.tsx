import type { Metadata } from "next"
import "./globals.css"
import { Amarante } from "next/font/google"

const amarante = Amarante({
  weight: "400",
  subsets: ["latin"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "MagicMirror",
  description: "Magic Mirror Software"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${amarante.className} antialiased`}>{children}</body>
    </html>
  )
}
