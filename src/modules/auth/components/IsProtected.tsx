import React, {ReactNode} from "react"
import {useSelector} from "react-redux"

import {getAuthorizedState} from "../authDuck/selectors"

import {Login} from "./Login"

interface IsProtectedProps {
  children?: ReactNode
}
export function IsProtected({children}: IsProtectedProps) {
  const isAuthorized = useSelector(getAuthorizedState)

  if (isAuthorized) {
    return <>{children}</> // Make ts happy
  }

  return <Login />
}

export default IsProtected
