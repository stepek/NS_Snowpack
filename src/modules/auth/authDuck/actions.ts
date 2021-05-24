import {LOGIN, LOGIN_DONE} from "./actionTypes"
import duck from "./duck"

export interface LoginDonePayload {
  username: string
  token?: string
  error?: string
}

const login = duck.createAction<void>(LOGIN)
const loginSuccess = duck.createAction<LoginDonePayload>(LOGIN_DONE)
const loginFailure = duck.createAction<LoginDonePayload>(LOGIN_DONE, true)

export function loginAction(username: string, password: string) {
  return async dispatch => {
    dispatch(login())

    await fetch("https://playground.tesonet.lt/v1/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password}),
    })
      .then(async res => {
        const data = await res.json()

        if (res.status === 200) {
          dispatch(
            loginSuccess({
              username: username,
              token: data.token,
            }),
          )
        } else {
          dispatch(
            loginFailure({
              username: username,
              error: data.message,
            }),
          )
        }
      })
      .catch(error => {
        dispatch(
          loginFailure({
            username: username,
            error: error.message,
          }),
        )
      })
  }
}
