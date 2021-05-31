import {getToken} from "../../auth/authDuck/selectors"

import {LOAD, LOAD_DONE} from "./actionTypes"
import duck from "./duck"
import type {ServerDescriptor} from "./reducer"

export interface ServerListPayload {
  data?: ServerDescriptor[]
  error?: string
}
const load = duck.createAction<void>(LOAD)
const loadSuccess = duck.createAction<ServerListPayload>(LOAD_DONE)
const loadFailure = duck.createAction<ServerListPayload>(LOAD_DONE, true)

export function loadAction() {
  return async (dispatch, getState) => {
    dispatch(load())

    const token = getToken(getState())

    if (token === undefined) {
      return dispatch(
        loadFailure({
          error: "MISSING AUTHENTICATION",
        }),
      )
    }

    await fetch("https://playground.tesonet.lt/v1/servers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(async res => {
        const data = await res.json()

        if (res.status === 200) {
          dispatch(loadSuccess({data}))
        } else {
          dispatch(
            loadFailure({
              error: data.message,
            }),
          )
        }
      })
      .catch(error => {
        dispatch(
          loadFailure({
            error: error.message,
          }),
        )
      })
  }
}
