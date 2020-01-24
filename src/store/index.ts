import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

let persistedState = undefined
try {
  persistedState = JSON.parse(localStorage.getItem('store') || '')
} catch (e) {
  console.error(e)
}

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(sagaMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
)

sagaMiddleware.run(rootSaga)

store.subscribe(() => {
  try {
    localStorage.setItem('store', JSON.stringify(store.getState()))
  } catch (e) {
    console.error(e)
  }
})

export default store
