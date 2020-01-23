export enum ResponseStatus {
  OK = 'OK',
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_DATE = 'INVALID_DATE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

interface FetchSunriseSunsetInfoResponseSuccess {
  status: Extract<ResponseStatus, ResponseStatus.OK>
  results: {
    sunrise: string
    sunset: string
    solar_noon: string
    day_length: number
    civil_twilight_begin: string
    civil_twilight_end: string
    nautical_twilight_begin: string
    nautical_twilight_end: string
    astronomical_twilight_begin: string
    astronomical_twilight_end: string
  }
}

interface FetchSunriseSunsetInfoResponseError {
  status: Exclude<ResponseStatus, ResponseStatus.OK>
  results: string
}

export type FetchSunriseSunsetInfoResponse =
  | FetchSunriseSunsetInfoResponseSuccess
  | FetchSunriseSunsetInfoResponseError
