import { SunriseSunsetInfo } from 'api/types'

export type SecondsSinceMidnight = number
export interface Location {
  name: string
  lat: number
  lon: number
  isLoading: boolean
  isError: string | null
  infoByDate: {
    [key: string]: SunriseSunsetInfo
  }
}
