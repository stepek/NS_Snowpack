import React from "react"
import renderer from "react-test-renderer"

import TextField from "./TextField"

test("<TextField> render correctly", () => {
  expect(renderer.create(<TextField />).toJSON()).toMatchSnapshot()
  expect(
    renderer.create(<TextField placeholder={"FooBarBaz"} />).toJSON(),
  ).toMatchSnapshot()
  expect(
    renderer.create(<TextField value={"Foo"} />).toJSON(),
  ).toMatchSnapshot()
})

test("<TextField> call onChange callback", () => {
  const handleChange = jest.fn()
  const component = renderer.create(<TextField onChange={handleChange} />)

  const event = {
    target: {value: "foo"},
  } as React.ChangeEvent<HTMLInputElement>

  component.root.findByType("input").props.onChange(event)

  expect(handleChange).toBeCalledTimes(1)
  expect(handleChange).toBeCalledWith("foo")
})
