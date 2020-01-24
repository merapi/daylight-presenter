import Api from 'api'
import { FetchSunriseSunsetInfoResponse, ResponseStatus } from 'api/types'
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as locationsSelectors from 'store/locations/selectors'
import { select } from 'utils/saga/typedEffects'
import * as locationsActions from './actions'
import { AddLocation, LocationsActionsConsts, SetDate, UpdateLocation } from './types'

function* fetchInfoForLocation(lat: number, lon: number, date: string) {
  try {
    const list = yield* select(locationsSelectors.list)
    const locationIndex = list.findIndex(
      location => location.lat === lat && location.lon === lon
    )
    if (locationIndex !== -1) {
      const existingLocation = list[locationIndex]
      if (date in existingLocation.infoByDate) {
        return
      }
    }

    yield put(locationsActions.fetchLocationInfoStarted(lat, lon))

    const response: FetchSunriseSunsetInfoResponse = yield call(
      Api.sunriseSunset.getInfoForGeolocationAndDate,
      lat,
      lon,
      date
    )
    if (response.status === ResponseStatus.OK) {
      yield put(
        locationsActions.fetchLocationInfoSuccess(lat, lon, response.results)
      )
    } else {
      yield put(
        locationsActions.fetchLocationInfoError(lat, lon, response.status)
      )
    }
  } catch (e) {
    console.error(e)
  }
}

function* locationAdded(action: AddLocation) {
  const { lat, lon } = action
  const date = yield select(locationsSelectors.date)
  yield fork(fetchInfoForLocation, lat, lon, date)
}

function* dateChanged(action: SetDate) {
  const { date } = action
  if (date) {
    yield fetchMissingInfo(date)
  }
}

function* updateLocation(action: UpdateLocation) {
  const date = yield select(locationsSelectors.date)
  yield fetchMissingInfo(date)
}

function* fetchMissingInfo(date: string) {
  const locations = yield* select(locationsSelectors.list)
  for (let location of locations) {
    const { lat, lon } = location
    yield fork(fetchInfoForLocation, lat, lon, date)
  }
}

export default function*() {
  yield takeEvery(LocationsActionsConsts.ADD_LOCATION, locationAdded)
  yield takeLatest(LocationsActionsConsts.SET_DATE, dateChanged)
  yield takeEvery(LocationsActionsConsts.UPDATE_LOCATION, updateLocation)
}
