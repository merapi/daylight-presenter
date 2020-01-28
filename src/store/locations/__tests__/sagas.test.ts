it('...', () => {})

// import Api from 'api'
// import { expectSaga } from 'redux-saga-test-plan'
// import * as matchers from 'redux-saga-test-plan/matchers'
// import store from 'store'
// import * as settingsSelectors from 'store/settings/selectors'
// import * as usersFixtures from 'tests/fixtures/users'
// import { User } from 'types'
// import rootReducer, { AppState } from '../../rootReducer'
// import * as usersActions from '../actions'
// import usersSagas from '../sagas'
// import * as usersSelectors from '../selectors'

// it('Users saga flow: start->bottom->idle->bottom should result in 0/0->50/0->50/50->100/0 users/prefetchedUsers', async () => {
//   const initialState = store.getState()
//   const page = usersSelectors.currentPage(initialState)
//   const limit = usersSelectors.limit(initialState)
//   const nationalities = settingsSelectors.nationalities(initialState)

//   const fetchUsersResponse = (page = 1) => {
//     usersFixtures.response.info.page = page
//     return usersFixtures.response
//   }

//   const {
//     storeState: storeAfterFirstBottom,
//   }: { storeState: AppState } = await expectSaga(usersSagas)
//     .withReducer(rootReducer)
//     .provide([[matchers.call.fn(Api.user.fetchUsers), fetchUsersResponse(1)]])
//     .dispatch(usersActions.bottomVisited())
//     .put(usersActions.fetchUsersStarted(page + 1, limit, nationalities))
//     .put(
//       usersActions.fetchUsersSuccess(
//         (fetchUsersResponse(1).results as unknown) as User[],
//         page + 1,
//       ),
//     )
//     .silentRun()
// })
