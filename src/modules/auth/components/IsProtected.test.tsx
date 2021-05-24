import React from "react"
import {useSelector} from "react-redux"
import renderer from "react-test-renderer"

import IsProtected from "./IsProtected"

jest.mock("./Login", () => ({
  Login: () => <div>LoginComponent</div>,
}))

jest.mock("react-redux")

afterEach(() => {
  useSelector.mockClear()
})

test("<IsProtected> render correctly for non authorized", () => {
  useSelector.mockImplementationOnce(() => false)

  expect(renderer.create(<IsProtected />).toJSON()).toMatchSnapshot()
})

test("<IsProtected> render correctly for authorized component", () => {
  useSelector.mockImplementationOnce(() => true)

  expect(
    renderer
      .create(
        <IsProtected>
          <div>Hidden component</div>
        </IsProtected>,
      )
      .toJSON(),
  ).toMatchSnapshot()
})
