import {FSA} from "redux-duck"

import {LOGIN, LOGIN_DONE} from "./actionTypes"
import {LoginDonePayload} from "./actions"
import {AuthState, reducer} from "./reducer"

test("returns initial state", () => {
  expect(reducer()).toEqual({})
})

test("handle LOGIN action", () => {
  const loginAction: FSA<undefined, undefined> = {
    type: LOGIN,
  }

  expect(reducer({error: "SOME ERROR"}, loginAction)).toEqual({})
})

test("handle LOGIN_DONE action", () => {
  const loginDoneAction: FSA<LoginDonePayload, undefined> = {
    type: LOGIN_DONE,
    payload: {
      username: "Epic user",
      token: "FOObarBAZ",
    },
  }
  const result: AuthState = {
    userName: "Epic user",
    token: "FOObarBAZ",
  }

  expect(reducer({}, loginDoneAction)).toEqual(result)
})

test("handle error of LOGIN_DONE action", () => {
  const loginDoneAction: FSA<LoginDonePayload, undefined> = {
    type: LOGIN_DONE,
    payload: {
      username: "Epic user",
      error: "Some went wrong",
    },
    error: true,
  }
  const result: AuthState = {
    userName: "Epic user",
    error: "Some went wrong",
  }

  expect(reducer({}, loginDoneAction)).toEqual(result)
})
