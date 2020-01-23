import Api from 'api'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import store from 'store'
import * as settingsSelectors from 'store/settings/selectors'
import * as usersFixtures from 'tests/fixtures/users'
import { User } from 'types'
import rootReducer, { AppState } from '../../rootReducer'
import * as usersActions from '../actions'
import usersSagas from '../sagas'
import * as usersSelectors from '../selectors'

it('Users saga flow: start->bottom->idle->bottom should result in 0/0->50/0->50/50->100/0 users/prefetchedUsers', async () => {
  const initialState = store.getState()
  const page = usersSelectors.currentPage(initialState)
  const limit = usersSelectors.limit(initialState)
  const nationalities = settingsSelectors.nationalities(initialState)

  const fetchUsersResponse = (page = 1) => {
    usersFixtures.response.info.page = page
    return usersFixtures.response
  }

  const {
    storeState: storeAfterFirstBottom,
  }: { storeState: AppState } = await expectSaga(usersSagas)
    .withReducer(rootReducer)
    .provide([[matchers.call.fn(Api.user.fetchUsers), fetchUsersResponse(1)]])
    .dispatch(usersActions.bottomVisited())
    .put(usersActions.fetchUsersStarted(page + 1, limit, nationalities))
    .put(
      usersActions.fetchUsersSuccess(
        (fetchUsersResponse(1).results as unknown) as User[],
        page + 1,
      ),
    )
    .silentRun()

  if (storeAfterFirstBottom.users.list) {
    expect(storeAfterFirstBottom.users.list.length).toBe(50)
    expect(storeAfterFirstBottom.users.list[0]).toBe(
      fetchUsersResponse(1).results[0],
    )
  }

  const {
    storeState: storeAfterFirstBottomAndIdle,
  }: { storeState: AppState } = await expectSaga(usersSagas)
    .withReducer(rootReducer, storeAfterFirstBottom)
    .provide([[matchers.call.fn(Api.user.fetchUsers), fetchUsersResponse(2)]])
    .dispatch(usersActions.idleDetected())
    .put(usersActions.fetchUsersStarted(page + 2, limit, nationalities))
    .put(
      usersActions.setNextPageUsers(
        (fetchUsersResponse(2).results as unknown) as User[],
      ),
    )
    .silentRun()

  if (
    storeAfterFirstBottomAndIdle.users.list &&
    storeAfterFirstBottomAndIdle.users.nextPageUsers
  ) {
    expect(storeAfterFirstBottomAndIdle.users.list.length).toBe(50)
    expect(storeAfterFirstBottomAndIdle.users.nextPageUsers.length).toBe(50)
  } else {
    console.log(storeAfterFirstBottomAndIdle)
    throw new Error(`no list or nextPageUsers`)
  }

  const {
    storeState: storeAfterFirstBottomAndIdleAndBottom,
  }: { storeState: AppState } = await expectSaga(usersSagas)
    .withReducer(rootReducer, storeAfterFirstBottomAndIdle)
    .provide([[matchers.call.fn(Api.user.fetchUsers), fetchUsersResponse(2)]])
    .dispatch(usersActions.bottomVisited())
    .put(
      usersActions.fetchUsersSuccess(
        (fetchUsersResponse(2).results as unknown) as User[],
        page + 2,
      ),
    )
    .silentRun()

  if (storeAfterFirstBottomAndIdleAndBottom.users.list) {
    expect(storeAfterFirstBottomAndIdleAndBottom.users.list.length).toBe(100)
    expect(storeAfterFirstBottomAndIdleAndBottom.users.nextPageUsers).toBeNull()
  } else {
    console.log(storeAfterFirstBottomAndIdleAndBottom)
    throw new Error(`no list or nextPageUsers`)
  }
})
