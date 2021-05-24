import React from "react"
import {Provider} from "react-redux"

import {Login} from "../modules/auth"
import {createStore} from "../modules/createStore"

export function App() {
  const store = createStore()

  return (
    <Provider store={store}>
      <Login />
    </Provider>
  )
}

export default App
