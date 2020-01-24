import moment from 'moment'
import { LocationsActions, LocationsActionsConsts, LocationsState } from './types'

export const initialState: LocationsState = {
  list: [],
  date: null // means now
}

const exhaustiveCheck = (_: never): void => {}

export default (
  state: LocationsState = initialState,
  action: LocationsActions
) => {
  switch (action.type) {
    case LocationsActionsConsts.SET_DATE: {
      return {
        ...state,
        date: action.date
      }
    }

    case LocationsActionsConsts.ADD_LOCATION: {
      const { name, lat, lon } = action
      const existingIndex = state.list.findIndex(location => location.lat === lat && location.lon === lon)
      
      if (existingIndex === -1) {
        let newState = { ...state, list: [...state.list] }

        newState.list.push({
          name, lat, lon, isLoading: false, isError: null, infoByDate: {}
        })

        return newState
      }

      return state
    }

    // case LocationsActionsConsts.REMOVE_LOCATION: {
    //   return initialState
    // }

    case LocationsActionsConsts.FETCH_LOCATION_INFO_SUCCESS: {
      const { info, lat, lon } = action
      const existingIndex = state.list.findIndex(location => location.lat === lat && location.lon === lon)
      
      if (existingIndex !== -1) {
        let newState = { ...state, list: [...state.list] }

        if (!newState.list[existingIndex].infoByDate) {
          newState.list[existingIndex].infoByDate = {}
        }

        const infoMoment = moment.utc(info.solar_noon)
        const infoDate = infoMoment.format('YYYY-MM-DD')
        newState.list[existingIndex].isLoading = false
        newState.list[existingIndex].isError = null
        newState.list[existingIndex].infoByDate[infoDate] = info

        return newState
      }

      return state
    }

    case LocationsActionsConsts.FETCH_LOCATION_INFO_STARTED: {
      const { lat, lon } = action
      const existingIndex = state.list.findIndex(location => location.lat === lat && location.lon === lon)
      
      if (existingIndex !== -1) {
        let newState = { ...state, list: [...state.list] }

        newState.list[existingIndex].isLoading = true
        newState.list[existingIndex].isError = null

        return newState
      }

      return state
    }

    case LocationsActionsConsts.FETCH_LOCATION_INFO_ERROR: {
      const { error, lat, lon } = action
      const existingIndex = state.list.findIndex(location => location.lat === lat && location.lon === lon)
      
      if (existingIndex !== -1) {
        let newState = { ...state, list: [...state.list] }

        newState.list[existingIndex].isLoading = false
        newState.list[existingIndex].isError = error

        return newState
      }

      return state
    }

    case LocationsActionsConsts.REMOVE_LOCATION: {
      const { lat, lon } = action
      const existingIndex = state.list.findIndex(location => location.lat === lat && location.lon === lon)
      
      if (existingIndex !== -1) {
        let newState = { ...state, list: [...state.list] }

        newState.list.splice(existingIndex, 1)

        return newState
      }

      return state
    }

    case LocationsActionsConsts.UPDATE_LOCATION: {
      const { lat, lon, data } = action
      const existingIndex = state.list.findIndex(location => location.lat === lat && location.lon === lon)
      
      if (existingIndex !== -1) {
        let newState = { ...state, list: [...state.list] }

        newState.list[existingIndex] = { ...newState.list[existingIndex], ...data }

        // Reset cache if coords are different
        if (lat !== data.lat || lon !== data.lon) {
          newState.list[existingIndex].infoByDate = {}
        }

        return newState
      }

      return state
    }

    default:
      exhaustiveCheck(action)
      return state
  }
}
