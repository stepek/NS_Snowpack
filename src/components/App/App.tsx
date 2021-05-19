import React from "react"
import {Provider} from "react-redux"

import {createStore} from "../../modules/createStore"

export function App() {
  const store = createStore()

  return (
    <Provider store={store}>
      <div>App Component</div>
    </Provider>
  )
}

export default App
