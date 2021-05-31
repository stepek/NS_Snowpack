import {LOAD_DONE} from "./actionTypes"
import {ServerListPayload} from "./actions"
import duck from "./duck"

export interface ServerDescriptor {
  name: string
  distance: number
}

export interface ServerListState {
  data?: ServerDescriptor[]
  error?: string
}

export const reducer = duck.createReducer<ServerListState>(
  {
    [LOAD_DONE]: (state, action) => {
      const payload = action?.payload as unknown as ServerListPayload

      if (action?.error === true) {
        return {
          error: payload.error,
        }
      }

      return {
        error: undefined,
        data: payload.data,
      }
    },
  },
  {},
)
