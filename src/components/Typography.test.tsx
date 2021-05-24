import React from "react"
import renderer from "react-test-renderer"

import Typography from "./Typography"

test("<Typography> render correctly default variant", () => {
  expect(renderer.create(<Typography />).toJSON()).toMatchSnapshot()
})
