import Api from 'api'
import { FetchSunriseSunsetInfoResponse, ResponseStatus } from 'api/types'
import { call, put, takeEvery } from 'redux-saga/effects'
import * as locationsSelectors from 'store/locations/selectors'
import { AppState } from 'store/rootReducer'
// import { SettingsActionsConsts } from 'store/settings/types'
import { select } from 'utils/saga/typedEffects'
import * as locationsActions from './actions'
import { AddLocation, LocationsActionsConsts } from './types'

// function* fetchUsers(action: FetchUsersStarted) {
//   const abortController = new window.AbortController()
//   try {
//     const { nationalities, page, limit } = action

//     yield put(userActions.fetchUsersStarted(page, limit, nationalities))
//     const response: FetchUsersResponse = yield call(
//       Api.user.fetchUsers,
//       page,
//       limit,
//       nationalities,
//       abortController
//     )
//     return response
//   } catch (e) {
//     yield put(userActions.fetchUsersError(e))
//     console.error(`fetchUsers`, e)
//   } finally {
//     if (yield cancelled()) {
//       abortController.abort()
//     }
//   }
// }

// function* fetchNextPage() {
//   const page = yield* select(userSelectors.currentPage)
//   const limit = yield* select(userSelectors.limit)
//   const nationalities = yield* select(settingsSelectors.nationalities)

//   const response = yield call(
//     fetchUsers,
//     userActions.fetchUsersStarted(page + 1, limit, nationalities)
//   )

//   return response
// }

// function* preloadNextPageData() {
//   const response = yield fetchNextPage()
//   yield put(userActions.setNextPageUsers(response.results))
// }

// function* bottomVisited() {
//   try {
//     const nextPageUsers = yield select(userSelectors.nextPageUsers)
//     let users, page

//     if (nextPageUsers) {
//       users = nextPageUsers
//       page = (yield select(userSelectors.currentPage)) + 1
//     } else {
//       const response: FetchUsersResponse = yield fetchNextPage()
//       users = response.results
//       page = response.info.page
//     }

//     yield put(userActions.fetchUsersSuccess(users, page))
//   } catch (e) {
//     console.error(`bottomVisited`, e)
//   }
// }

// function* canFetchMore() {
//   const endOfData = yield select(userSelectors.isEnd) // aleady fetched all data
//   const query = yield select(userSelectors.query) // not while searching
//   return !endOfData && !query
// }

// function* watchBottomVisited() {
//   while (true) {
//     yield take(LocationsActionsConsts.BOTTOM_VISITED)
//     if (yield canFetchMore()) {
//       yield call(bottomVisited)
//     }
//   }
// }

function* locationAdded(action: AddLocation) {
  // yield put(locationsActions.setDate(''))
  const { name, lat, lon } = action
  const store = yield* select((state: AppState) => state)
  console.log(store)
  try {
    const date = yield select(locationsSelectors.date)
    yield put(locationsActions.fetchLocationInfoStarted(lat, lon))
    
    const response: FetchSunriseSunsetInfoResponse = yield call(
      Api.sunriseSunset.getInfoForGeolocationAndDate,
      lat,
      lon,
      date,
      // moment().add(1, 'days') // for tomorrow test
    )
    console.log({response})
    if (response.status === ResponseStatus.OK) {
      yield put(locationsActions.fetchLocationInfoSuccess(lat, lon, response.results))
    } else {
      yield put(locationsActions.fetchLocationInfoError(lat, lon, response.status))
    }
  } catch (e) {
    console.error(e)
  }
}

// function* idleDetected() {
//   const nextPageUsers = yield* select(userSelectors.nextPageUsers)
//   const fetchMore = yield canFetchMore()
//   if (!nextPageUsers && fetchMore) {
//     yield call(preloadNextPageData)
//   }
// }

export default function*() {
  yield takeEvery(LocationsActionsConsts.ADD_LOCATION, locationAdded)
  // yield takeLatest(LocationsActionsConsts.IDLE_DETECTD, idleDetected)
  // yield fork(watchBottomVisited)
}
