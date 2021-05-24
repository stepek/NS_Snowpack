import React from "react"
import renderer from "react-test-renderer"

import Button from "./Button"

test("<Button> render correctly", () => {
  const component = renderer.create(<Button label={"FooBarBaz"} />)

  expect(component.toJSON()).toMatchSnapshot()
})

test("<Button> call click callback", () => {
  const handleOnClick = jest.fn()

  const component = renderer.create(
    <Button label={"FooBarBaz"} onClick={handleOnClick} />,
  )

  component.root.findByType("button").props.onClick()

  expect(handleOnClick).toBeCalledTimes(1)
})
