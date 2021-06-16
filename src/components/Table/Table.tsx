import React, {useCallback, useState} from "react"
import {createUseStyles} from "react-jss"

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

const useStyles = createUseStyles(() => ({
  table: {
    fontSize: "1.3em",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#afc2ff",
  },
  body: {
    background: "#c9c9c9",
  },
  cel: {
    border: "solid 1px #313131",
    width: "50%",
    padding: "0.2em",
  },
  row: {
    display: "flex",
  },
  search: {
    width: "100%",
  },
}))

interface SearchQuery {
  [key: string]: string
}

type SortOption = "desc" | "asc" | undefined

interface SortQuery {
  [key: string]: SortOption
}
function filterData(query: SearchQuery, data: TableRow[]): TableRow[] {
  const queryEntries = Object.entries(query)

  return data.filter(row =>
    queryEntries.reduce((result: boolean, [key, value]) => {
      if (!result) {
        return false
      }

      return row[key].toString().toLowerCase().includes(value.toLowerCase())
    }, true),
  )
}

function sortData(query: SortQuery, data: TableRow[]): TableRow[] {
  const queryEntries = Object.entries(query)

  let sortedData = data.slice()

  for (let [key, value] of queryEntries) {
    sortedData.sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]

      if (value === "asc") {
        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue
        }
        return aValue
          .toString()
          .toLowerCase()
          .localeCompare(bValue.toString().toLowerCase())
      }
      if (value === "desc") {
        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue
        }
        return bValue
          .toString()
          .toLowerCase()
          .localeCompare(aValue.toString().toLowerCase())
      }

      return 0
    })
  }

  return sortedData
}

function getAsciArrow(sort: SortOption) {
  switch (sort) {
    case "asc":
      return `\\/ `
    case "desc":
      return `/\\`
  }
}

export default function Table({headers = [], data = []}: TableProps) {
  const classes = useStyles()
  const [search, setSearch] = useState<SearchQuery>({})
  const [sort, setSort] = useState<SortQuery>({})

  const parsedData = sortData(sort, filterData(search, data))

  const updateSearch = useCallback(
    (key: string, value: string) => {
      setSearch({...search, [key]: value})
    },
    [search, setSearch],
  )

  const updateSort = useCallback(
    (key: string) => {
      if (sort[key] === undefined) {
        setSort({[key]: "asc"})
      } else if (sort[key] === "asc") {
        setSort({[key]: "desc"})
      } else if (sort[key] === "desc") {
        setSort({[key]: undefined})
      }
    },
    [sort, setSort],
  )

  return (
    <div className={classes.table}>
      <div className={classes.header}>
        <div className={classes.row}>
          {headers.map(({key, displayName}) => (
            <div className={classes.cel} key={`search_${key}`}>
              <input
                className={classes.search}
                placeholder={`Search by ${displayName}`}
                onChange={event => updateSearch(key, event.target.value)}
              />
            </div>
          ))}
        </div>
        <div className={classes.row}>
          {headers.map(({key, displayName}) => (
            <div
              className={classes.cel}
              key={key}
              onClick={() => updateSort(key)}
            >
              {displayName}
              {sort[key] ? ` ${getAsciArrow(sort[key])} ` : ""}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.body}>
        {parsedData.map(row => (
          <div className={classes.row}>
            {headers.map(({key}, index) => (
              <div className={classes.cel} key={`${key}_${index}`}>
                {row[key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
