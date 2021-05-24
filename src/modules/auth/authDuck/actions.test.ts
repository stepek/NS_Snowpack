import fetchMock from "fetch-mock"

import {LOGIN, LOGIN_DONE} from "./actionTypes"
import {loginAction} from "./actions"

afterEach(() => {
  fetchMock.restore()
})

test("return success action", async () => {
  const dispatch = jest.fn()

  fetchMock.postOnce("https://playground.tesonet.lt/v1/tokens", {
    body: {
      token: "foo_bar_baz_bas",
    },
  })

  await loginAction("john", "epic_password")(dispatch)

  expect(dispatch).toBeCalledTimes(2)
  expect(dispatch).nthCalledWith(1, {
    error: false,
    type: LOGIN,
  })
  expect(dispatch).nthCalledWith(2, {
    error: false,
    payload: {
      token: "foo_bar_baz_bas",
      username: "john",
    },
    type: LOGIN_DONE,
  })
})

test("return failure action when server returns error", async () => {
  const dispatch = jest.fn()

  fetchMock.postOnce("https://playground.tesonet.lt/v1/tokens", {
    status: 401,
    body: {message: "Unauthorized"},
  })

  await loginAction("john", "epic_password")(dispatch)

  expect(dispatch).toBeCalledTimes(2)
  expect(dispatch).nthCalledWith(1, {
    error: false,
    type: LOGIN,
  })
  expect(dispatch).nthCalledWith(2, {
    error: true,
    payload: {
      error: "Unauthorized",
      username: "john",
    },
    type: LOGIN_DONE,
  })
})

test("return failure action when some internet connection or other internet issue ", async () => {
  const dispatch = jest.fn()

  fetchMock.postOnce("https://playground.tesonet.lt/v1/tokens", {
    throws: {message: "ERROR!"},
  })

  await loginAction("john", "epic_password")(dispatch)

  expect(dispatch).toBeCalledTimes(2)
  expect(dispatch).nthCalledWith(1, {
    error: false,
    type: LOGIN,
  })
  expect(dispatch).nthCalledWith(2, {
    error: true,
    payload: {
      error: "ERROR!",
      username: "john",
    },
    type: LOGIN_DONE,
  })
})
