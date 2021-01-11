// import axios from "axios"
import axios, { authHeader } from "../../axios-orders"
import { logout } from "./auth"

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
      .get("/systems-config/config", { headers: authHeader() })
      // .get("http://localhost:8080/systems-configuration", {
      //   headers: authHeader(),
      // })
      .catch((err) => {
        console.log(err)
      })
    const data = response?.data
    if (data) {
      dispatch(fetchConfigSuccess(data))
    } else {
      logout()
    }
  }
}
