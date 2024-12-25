This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Before starting, install all dependencies using `npm install`. NodeJS is required.

## Getting Started

First, the following environment variables MUST be specified in `.env.local`, substituting anything in brackets with actual values:

```bash
OPENAI_API_KEY=[Insert Valid OPENAI API KEY, https://platform.openai.com]
SPOTIFY_CLIENT_ID=[SPOTIFY OAUTH CLIENT ID PROVIDED BY DEV CONSOLE]
SPOTIFY_CLIENT_SECRET=[SPOTIFY OAUTH CLIENT SECRET PROVIDED BY DEV CONSOLE]
MONGODB_CONNECTION_STRING=[MONGO CONNECTION STRING FOR DB]
NEWSDATA_API_KEY=[GET FROM https://newsdata.io/]
TRIMBLE_MAPS_API_KEY=[GET FROM https://developer.trimblemaps.com/] # Completely Optional, only for Geocoding
MIRROR_ID=default #any string is valid, as long as it is unique for a given DB
```

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To host a server, after building:

```bash
npm run start
```

Demo is available at: https://se101-magicmirror-dashboard-next.vercel.app/
