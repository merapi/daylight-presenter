import { API_URL } from 'config/consts'
import { Moment } from 'moment'
import { FetchSunriseSunsetInfoResponse } from './types'

const sunriseSunset = {
  async getInfoForGeolocationAndDate(
    lat: number,
    lng: number,
    date?: Moment
  ): Promise<FetchSunriseSunsetInfoResponse> {
    const params: { [key: string]: any } = {
      lat,
      lng,
      date: date ? date.format('YYYY-MM-DD') : undefined,
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
