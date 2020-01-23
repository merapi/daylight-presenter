import { API_URL } from 'config/consts'
import { FetchSunriseSunsetInfoResponse } from './types'

const sunriseSunset = {
  async getInfoForGeolocationAndDate(
    lat: number,
    lon: number,
    date?: string
  ): Promise<FetchSunriseSunsetInfoResponse> {
    const params: { [key: string]: any } = {
      lat,
      lng: lon,
      date,
      formatted: 0
    }
    const query = Object.keys(params)
      .filter(key => params[key] !== undefined)
      .map(key => `${key}=${params[key]}`)
      .join('&')

    return fetch(`${API_URL}?${query}`).then(response => response.json())
  }
}

export default {
  sunriseSunset
}
