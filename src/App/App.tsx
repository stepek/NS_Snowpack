import React from "react"
import {Provider} from "react-redux"

import {IsProtected} from "../modules/auth"
import {createStore} from "../modules/createStore"
import ServerList from "../modules/servers/serverList"

export function App() {
  const store = createStore()

  return (
    <Provider store={store}>
      <IsProtected>
        <ServerList />
      </IsProtected>
    </Provider>
  )
}

export default App
