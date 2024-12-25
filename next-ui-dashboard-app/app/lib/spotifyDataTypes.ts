export interface SpotifyAccessToken {
  access_token: string
  token_type: "Bearer"
  expires_in: number
  refresh_token?: string
  scope: string
}
export interface SpotifyTokenStore {
  expires: number
  token: SpotifyAccessToken
  refresh_token: string
}
export function checkSpotifyTokenExpired(
  tokenObject: SpotifyTokenStore
): boolean {
  return tokenObject.expires < Date.now()
}
