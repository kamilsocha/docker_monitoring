import { FETCH_CONFIG_SUCCESS } from "../actions/config"
import { updateObject } from "../utils"

const initialState = {}

const fetchConfigSuccess = (state, action) => {
  return updateObject(state, action.payload)
}

export function configReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONFIG_SUCCESS:
      return fetchConfigSuccess(state, action)
    default:
      return state
  }
}
