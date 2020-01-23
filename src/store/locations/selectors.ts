import { AppState } from 'store/rootReducer'

export const list = (state: AppState) => state.locations.list
export const date = (state: AppState) => state.locations.date
