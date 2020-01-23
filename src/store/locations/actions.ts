import { SunriseSunsetInfo } from 'api/types'
import { AddLocation, FetchLocationInfoError, FetchLocationInfoStarted, FetchLocationInfoSuccess, LocationsActionsConsts } from './types'

export const addLocation = (
  name: string,
  lat: number,
  lon: number,
): AddLocation => ({
  type: LocationsActionsConsts.ADD_LOCATION,
  name,
  lat,
  lon
})

export const fetchLocationInfoStarted = (lat: number, lon: number): FetchLocationInfoStarted => ({
  type: LocationsActionsConsts.FETCH_LOCATION_INFO_STARTED,
  lat,
  lon
})

export const fetchLocationInfoError = (lat: number, lon: number, error: string): FetchLocationInfoError => ({
  type: LocationsActionsConsts.FETCH_LOCATION_INFO_ERROR,
  lat,
  lon,
  error
})

export const fetchLocationInfoSuccess = (
  lat: number,
  lon: number,
  info: SunriseSunsetInfo,
): FetchLocationInfoSuccess => ({
  type: LocationsActionsConsts.FETCH_LOCATION_INFO_SUCCESS,
  lat,
  lon,
  info,
})

export const setDate = (date: string) => ({
  type: LocationsActionsConsts.SET_DATE,
  date
})
