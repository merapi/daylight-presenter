import { SunriseSunsetInfo } from 'api/types'
import { Moment } from 'moment'
import { Location } from 'types'

// Action consts
export enum LocationsActionsConsts {
  FETCH_LOCATION_INFO_STARTED = 'FETCH_LOCATION_INFO_STARTED',
  FETCH_LOCATION_INFO_SUCCESS = 'FETCH_LOCATION_INFO_SUCCESS',
  FETCH_LOCATION_INFO_ERROR = 'FETCH_LOCATION_INFO_ERROR',
  ADD_LOCATION = 'ADD_LOCATION',
  REMOVE_LOCATION = 'REMOVE_LOCATION',
  SET_DATE = 'SET_DATE'
}

// Action types
export interface AddLocation {
  type: LocationsActionsConsts.ADD_LOCATION
  name: string
  lat: number
  lon: number
}

export interface FetchLocationInfoSuccess {
  type: LocationsActionsConsts.FETCH_LOCATION_INFO_SUCCESS
  lat: number
  lon: number
  info: SunriseSunsetInfo
}

export interface FetchLocationInfoStarted {
  type: LocationsActionsConsts.FETCH_LOCATION_INFO_STARTED
  lat: number
  lon: number
}

export interface FetchLocationInfoError {
  type: LocationsActionsConsts.FETCH_LOCATION_INFO_ERROR
  lat: number
  lon: number
  error: string
}

// export interface RemoveLocation {
//   type: LocationsActionsConsts.REMOVE_LOCATION
// }

export interface SetDate {
  type: LocationsActionsConsts.SET_DATE
  date: Moment | null
}

export type LocationsActions =
  | AddLocation
  | FetchLocationInfoSuccess
  | FetchLocationInfoStarted
  | FetchLocationInfoError
  // | RemoveLocation
  | SetDate

// Data types
// Location should be here?

// State type
export interface LocationsState {
  readonly list: Location[]
  readonly date: Moment | null
}
