import {LOGIN_DONE} from "./actionTypes"
import duck from "./duck"

export interface LoginDonePayload {
  username: string
  token?: string
  error?: string
}

const loginSuccess = duck.createAction<LoginDonePayload>(LOGIN_DONE)
const loginFailure = duck.createAction<LoginDonePayload>(LOGIN_DONE, true)

export function loginAction(username: string, password: string) {
  return async dispatch => {
    await fetch("https://playground.tesonet.lt/v1/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password}),
    })
      .then(body => body.json())
      .then(data => {
        dispatch(
          loginSuccess({
            username: username,
            token: data.token,
          }),
        )
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
