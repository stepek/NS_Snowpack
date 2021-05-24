import {
  applyMiddleware,
  combineReducers,
  createStore as _createStore,
} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import {reducer as authReducer} from "./auth"
import {AuthState} from "./auth/authDuck/reducer"

function isDebug() {
  return import.meta.env.NODE_ENV === "development"
}

export interface AppState {
  auth: AuthState
}
function createRootReducer() {
  return combineReducers({
    auth: authReducer,
  })
}

export function createStore() {
  const middlewares = isDebug()
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)

  return _createStore(createRootReducer(), {}, middlewares)
}
