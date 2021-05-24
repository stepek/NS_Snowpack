import {createSelector} from "reselect"

import {AppState} from "../../createStore"

const getState = (state: AppState) => state.auth

function parseError(error: string): string {
  switch (error) {
    case "Unauthorized":
      return "Unauthorized"
    default:
      return "Something goes wrong! Please try again."
  }
}

export const getErrorMessage = createSelector<
  AppState,
  string | undefined,
  string | null
>(
  state => getState(state).error,
  error => (error ? parseError(error) : null),
)

export const getAuthorizedState = createSelector<
  AppState,
  string | undefined,
  boolean
>(
  state => getState(state).token,
  token => Boolean(token),
)
