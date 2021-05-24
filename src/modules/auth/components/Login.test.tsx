import React from "react"
import {useSelector, useDispatch} from "react-redux"
import renderer from "react-test-renderer"

import Login from "./Login"

jest.mock("react-redux")

afterEach(() => {
  useSelector.mockClear()
  useDispatch.mockClear()
})

test("<Login> render correctly", () => {
  useSelector.mockImplementationOnce(() => null)
  useDispatch.mockImplementationOnce(() => undefined)

  expect(renderer.create(<Login />).toJSON()).toMatchSnapshot()
})

test("<Login> render correctly with error", () => {
  useSelector.mockImplementationOnce(() => "Unauthorized")
  useDispatch.mockImplementationOnce(() => undefined)

  expect(renderer.create(<Login />).toJSON()).toMatchSnapshot()
})

test("<Login> render correctly with unknown error", () => {
  useSelector.mockImplementationOnce(() => "unknown error")
  useDispatch.mockImplementationOnce(() => undefined)

  expect(renderer.create(<Login />).toJSON()).toMatchSnapshot()
})
