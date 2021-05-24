import React, {useCallback, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {Button, TextField, Typography} from "../../../components"
import {loginAction} from "../authDuck/actions"
import {getErrorMessage} from "../authDuck/selectors"

function parseLoginError(error: string): string {
  if (error === "Unauthorized") {
    return "The username or password is incorrect."
  }
  return error
}

export function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const errorMessage = useSelector(getErrorMessage)

  const handleLoginClick = useCallback(() => {
    dispatch(loginAction(username, password))
  }, [dispatch, username, password])

  return (
    <>
      {errorMessage !== null && (
        <Typography>{parseLoginError(errorMessage)}</Typography>
      )}
      <TextField
        placeholder={"User Name"}
        value={username}
        onChange={setUsername}
      />
      <TextField
        placeholder={"Password"}
        value={password}
        onChange={setPassword}
      />
      <Button label={"Login"} onClick={handleLoginClick} />
    </>
  )
}

export default Login
