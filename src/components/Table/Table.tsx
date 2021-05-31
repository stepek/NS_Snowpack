import React from "react"

export interface TableHeader {
  key: string
  displayName: string
}

export interface TableRow {
  [key: string]: string | number
}

export interface TableProps {
  headers?: TableHeader[]
  data?: TableRow[]
}

export default function Table({headers = [], data = []}: TableProps) {
  return (
    <div>
      <div>
        {headers.map(({key, displayName}) => (
          <div key={key}>{displayName}</div>
        ))}
      </div>
      <div>
        {data.map(row => (
          <div>
            {headers.map(({key}) => (
              <div>{row[key]}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
