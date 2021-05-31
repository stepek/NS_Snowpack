import {createSelector} from "reselect"

import type {AppState} from "../../createStore"

import type {ServerDescriptor, ServerListState} from "./reducer"

const getState = (state: AppState): ServerListState => state.serverList

export const getErrorMessage = createSelector<
  AppState,
  string | undefined,
  string | null
>(
  state => getState(state).error,
  error => (error ? error : null),
)

export const getServers = createSelector<
  AppState,
  ServerDescriptor[] | undefined,
  ServerDescriptor[] | undefined
>(
  state => getState(state).data,
  servers => servers,
)
