import {
  applyMiddleware,
  combineReducers,
  createStore as _createStore,
} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

function isDebug() {
  return import.meta.env.NODE_ENV === "development"
}

function createRootReducer() {
  return combineReducers({})
}

export function createStore() {
  const middlewares = isDebug()
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)

  return _createStore(createRootReducer, {}, middlewares)
}
