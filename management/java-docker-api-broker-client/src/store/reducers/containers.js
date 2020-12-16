import {
  FETCH_CONTAINERS_FAIL,
  FETCH_CONTAINERS_START,
  FETCH_CONTAINERS_SUCCESS,
  CHANGE_LABEL_NAME,
} from "../actions/containers"
import { distinguishSystems, updateObject } from "../utils"

const initialState = {
  selectedContainer: null,
  allContainers: [],
  noSystemContainers: [],
  systems: [],
  loading: false,
  error: null,
  systemLabelName: "systembelongto",
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
  const { systems, noSystemContainers } = distinguishSystems(
    action.payload,
    state.systemLabelName
  )
  return updateObject(state, {
    allContainers: action.payload,
    noSystemContainers,
    systems,
    loading: false,
  })
}

const changeLabelName = (state, action) => {
  return updateObject(state, {
    systemLabelName: action.payload,
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
    case CHANGE_LABEL_NAME:
      return changeLabelName(state, action)
    default:
      return state
  }
}
