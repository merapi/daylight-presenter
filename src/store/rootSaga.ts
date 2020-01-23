import { all } from 'redux-saga/effects'
import locations from './locations/sagas'

export default function* rootSaga() {
  yield all([locations()])
}
