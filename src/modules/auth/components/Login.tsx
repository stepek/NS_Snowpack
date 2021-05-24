import React, {useCallback, useState} from "react"
import {useDispatch} from "react-redux"

import Button from "../../../components/Button"
import TextField from "../../../components/TextField"
import {loginAction} from "../authDuck/actions"

export function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLoginClick = useCallback(() => {
    dispatch(loginAction(username, password))
  }, [dispatch, username, password])

  return (
    <>
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
