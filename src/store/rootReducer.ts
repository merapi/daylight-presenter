import { combineReducers } from 'redux'
import locations from 'store/locations/reducer'

const rootReducer = combineReducers({
  locations
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
