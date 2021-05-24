import fetchMock from "fetch-mock"

import {LOGIN_DONE} from "./actionTypes"
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

  expect(dispatch).toBeCalledWith({
    error: false,
    payload: {
      token: "foo_bar_baz_bas",
      username: "john",
    },
    type: LOGIN_DONE,
  })
})

test("return failure action", async () => {
  const dispatch = jest.fn()

  fetchMock.postOnce("https://playground.tesonet.lt/v1/tokens", {
    status: 401,
    throws: {message: "Unauthorized"},
  })

  await loginAction("john", "epic_password")(dispatch)

  expect(dispatch).toBeCalledWith({
    error: true,
    payload: {
      error: "Unauthorized",
      username: "john",
    },
    type: LOGIN_DONE,
  })
})
