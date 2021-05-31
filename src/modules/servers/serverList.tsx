import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import Table from "../../components/Table"
import type {TableRow} from "../../components/Table/Table"

import {loadAction} from "./serversDuck/actions"
import {getErrorMessage, getServers} from "./serversDuck/selectors"

export default function ServerList() {
  const dispatch = useDispatch()

  const error = useSelector(getErrorMessage)
  const servers = useSelector(getServers)

  useEffect(() => {
    dispatch(loadAction())
  }, [dispatch])

  return (
    <div>
      {error && <div>{error}</div>}
      <Table
        headers={[
          {
            key: "name",
            displayName: "Name",
          },
          {key: "distance", displayName: "Distance"},
        ]}
        data={servers as unknown as TableRow[]}
      />
    </div>
  )
}
