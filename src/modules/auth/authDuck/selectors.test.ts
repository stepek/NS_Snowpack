import {getAuthorizedState, getErrorMessage} from "./selectors"

test("getErrorMessage return parsed error", () => {
  const mockStateCorrectError = {
    auth: {
      error: "Unauthorized",
    },
  }
  const mockStateOtherError = {
    auth: {
      error: "ERROR!",
    },
  }
  expect(getErrorMessage(mockStateCorrectError)).toEqual("Unauthorized")
  expect(getErrorMessage(mockStateOtherError)).toEqual(
    "Something goes wrong! Please try again.",
  )
})

test("getErrorMessage return null when no error", () => {
  const mockState = {
    auth: {},
  }
  expect(getErrorMessage(mockState)).toEqual(null)
})

test("getAuthorizedState return authorized state", () => {
  const mockState = {
    auth: {
      token: "1234Token",
    },
  }
  expect(getAuthorizedState(mockState)).toEqual(true)
})
