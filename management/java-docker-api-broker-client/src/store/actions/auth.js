import axios from "axios"
import { authHeader } from "../../axios-orders"
import moment from "moment"
import { fetchConfig } from "./config"

export const AUTH_START = "AUTH_START"
export const AUTH_FAIL = "AUTH_FAIL"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_LOGOUT = "AUTH_LOGOUT"
export const AUTH_REDIRECT_PATH = "AUTH_REDIRECT_PATH"
export const AUTH_CHECK_STATE = "AUTH_CHECK_STATE"

export const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS"

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(authStart())
    const token = localStorage.getItem("token")
    if (token === undefined || token === null) {
      dispatch(logout())
    } else {
      const expirationDate = moment(
        localStorage.getItem("expirationDate"),
        "YYYY-MM-DD HH:mm:ss"
      )
      if (expirationDate.isBefore(moment())) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(
          checkAuthTimeout(Math.abs(expirationDate.diff(moment(), "seconds")))
        )
        dispatch(fetchUserData(token))
        dispatch(fetchConfig())
      }
    }
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: AUTH_REDIRECT_PATH,
    path,
  }
}

export const authStart = () => {
  return {
    type: AUTH_START,
  }
}

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    payload: token,
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationDate")
  return { type: AUTH_LOGOUT }
}

export const checkAuthTimeout = (timeout) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, timeout * 1000)
  }
}

const fetchUserDataSuccess = (email, role) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: { email, role },
  }
}

export const fetchUserData = (accessToken) => {
  let header
  if (accessToken) {
    header = { Authorization: accessToken }
  } else {
    header = authHeader()
  }
  return async (dispatch) => {
    const response = await axios.get("/users/current", {
      // const response = await axios.get("http://localhost:8080/users/current", {
      headers: header,
    })

    if (response?.status === 200) {
      const { email, role } = response.data
      dispatch(fetchUserDataSuccess(email, role))
    }
  }
}

export const auth = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart())
    const response = await axios
      .post(`/login`, { username: email, password })
      // .post(`http://localhost:8080/login`, { username: email, password })
      .catch((err) => {
        dispatch(authFail(err))
      })
    if (response?.status === 200) {
      const authData = {
        accessToken: response.headers.authorization,
        accessTokenExpiration: response.headers.expires,
      }
      let start = moment()
      let end = moment(authData.accessTokenExpiration, "YYYY-MM-DD HH:mm:ss")
      const expiryTime = end.diff(start, "seconds")
      localStorage.setItem("token", authData.accessToken)
      localStorage.setItem("expirationDate", authData.accessTokenExpiration)
      dispatch(fetchUserData(authData.accessToken))
      dispatch(authSuccess(authData.token))
      dispatch(fetchConfig())
      dispatch(checkAuthTimeout(expiryTime))
    }
  }
}
