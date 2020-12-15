import axios from "../../axios-orders"

export const FETCH_CONTAINERS_START = "FETCH_CONTAINERS_START"
export const FETCH_CONTAINERS_FAIL = "FETCH_CONTAINERS_FAIL"
export const FETCH_CONTAINERS_SUCCESS = "FETCH_CONTAINERS_SUCCESS"

export const CHANGE_LABEL_NAME = "CHANGE_LABEL_NAME"

// start fetching containers

const fetchContainersStart = () => {
  return { type: FETCH_CONTAINERS_START }
}

const fetchContainersFail = (err) => {
  return { type: FETCH_CONTAINERS_FAIL, payload: err }
}

const fetchContainersSuccess = (containers) => {
  return { type: FETCH_CONTAINERS_SUCCESS, payload: containers }
}

export const fetchContainers = () => {
  return async (dispatch) => {
    dispatch(fetchContainersStart())
    const response = await axios
      .get("/containers", {
        params: {
          showSize: true,
          showAll: true,
        },
      })
      .catch((err) => {
        console.log("error fetching containers", err)
        dispatch(fetchContainersFail(err))
      })
    const data = response?.data
    if (data) {
      dispatch(fetchContainersSuccess(data))
    }
  }
}

// end fetching containers

// start change label

export const changeLabelName = (newLabelName) => {
  return { type: CHANGE_LABEL_NAME, payload: newLabelName }
}

// end change label
