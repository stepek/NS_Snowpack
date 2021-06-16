import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

// prettier-ignore
import React from "react"
import {render} from "react-dom"

import App from "./App"

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)
