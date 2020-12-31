import {
  FETCH_CONTAINERS_FAIL,
  FETCH_CONTAINERS_START,
  FETCH_CONTAINERS_SUCCESS,
} from "../actions/containers"
import { distinguishSystems, updateObject } from "../utils"

const initialState = {
  selectedContainer: null,
  allContainers: [],
  noSystemContainers: [],
  systems: [],
  loading: false,
  error: null,
  containerStates: {
    CREATED: "created",
    RUNNING: "running",
    RESTARTING: "restarting",
    STOPPED: "stopped",
    PAUSED: "paused",
    EXITED: "exited",
  },
}

const fetchContainersStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  })
}

const fetchContainersFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  })
}

const fetchContainersSuccess = (state, action) => {
  const {
    systems,
    noSystemContainers,
    systemNameLabelFullKey,
  } = distinguishSystems(
    action.containers,
    action.labelKeys,
    action.labelValues
  )
  return updateObject(state, {
    allContainers: action.containers,
    noSystemContainers,
    systems,
    loading: false,
    systemNameLabelFullKey,
  })
}

export function containersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTAINERS_START:
      return fetchContainersStart(state, action)
    case FETCH_CONTAINERS_FAIL:
      return fetchContainersFail(state, action)
    case FETCH_CONTAINERS_SUCCESS:
      return fetchContainersSuccess(state, action)
    default:
      return state
  }
}
