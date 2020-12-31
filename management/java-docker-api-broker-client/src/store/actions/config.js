import axios from "axios"
import { authHeader } from "../../axios-orders"

export const FETCH_CONFIG_SUCCESS = "FETCH_CONFIG_SUCCESS"

const fetchConfigSuccess = (configuration) => {
  return {
    type: FETCH_CONFIG_SUCCESS,
    payload: configuration,
  }
}

export const fetchConfig = () => {
  return async (dispatch) => {
    const response = await axios
      .get("/systems-configuration", { headers: authHeader() })
      // .get("http://localhost:8080/systems-configuration", {
      //   headers: authHeader(),
      // })
      .catch((err) => {
        console.log(err)
      })
    const data = response?.data
    if (data) {
      dispatch(fetchConfigSuccess(data))
    }
  }
}
