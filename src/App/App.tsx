import React from "react"
import {Provider} from "react-redux"

import {IsProtected} from "../modules/auth"
import {createStore} from "../modules/createStore"

export function App() {
  const store = createStore()

  return (
    <Provider store={store}>
      <IsProtected>
        <div>protectedContent</div>
      </IsProtected>
    </Provider>
  )
}

export default App
