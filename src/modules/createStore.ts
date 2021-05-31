import {
  applyMiddleware,
  combineReducers,
  createStore as _createStore,
} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import {reducer as authReducer} from "./auth"
import type {AuthState} from "./auth/authDuck/reducer"
import {reducer as serverListReducer} from "./servers/serversDuck/reducer"
import type {ServerListState} from "./servers/serversDuck/reducer"

function isDebug() {
  return import.meta.env.NODE_ENV === "development"
}

export interface AppState {
  auth: AuthState
  serverList: ServerListState
}
function createRootReducer() {
  return combineReducers({
    auth: authReducer,
    serverList: serverListReducer,
  })
}

export function createStore() {
  const middlewares = isDebug()
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)

  return _createStore(createRootReducer(), {}, middlewares)
}
