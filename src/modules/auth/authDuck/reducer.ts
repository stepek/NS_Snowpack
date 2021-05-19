import {LOGIN, LOGIN_DONE} from "./actionTypes"
import {LoginDonePayload} from "./actions"
import duck from "./duck"

export interface AuthState {
  userName?: string
  token?: string
  error?: string
}

export const reducer = duck.createReducer<AuthState>(
  {
    [LOGIN]: (state, action) => {
      if (action === undefined) {
        return state
      }

      return {
        ...state,
        error: undefined,
        token: undefined,
      }
    },
    [LOGIN_DONE]: (state, action) => {
      if (action === undefined) {
        return state
      }
      const payload = action.payload as unknown as LoginDonePayload

      if (action.error === true) {
        return {
          error: payload.error,
          userName: payload.username,
          token: undefined,
        }
      }

      return {
        userName: payload.username,
        error: undefined,
        token: payload.token,
      }
    },
  },
  {},
)
