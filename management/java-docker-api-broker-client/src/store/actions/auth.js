import axios from "axios"
import moment from "moment"

const apiUri = `${process.env.REACT_APP_API_URL}`

export const AUTH_START = "AUTH_START"
export const AUTH_FAIL = "AUTH_FAIL"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_LOGOUT = "AUTH_LOGOUT"
export const AUTH_REDIRECT_PATH = "AUTH_REDIRECT_PATH"
export const AUTH_CHECK_STATE = "AUTH_CHECK_STATE"

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

export const auth = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart())
    console.log("start auth")
    const response = await axios
      .post(`${apiUri}/login`, { username: email, password })
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
      console.log("token", authData.accessToken)
      localStorage.setItem("token", authData.accessToken)
      localStorage.setItem("expirationDate", authData.accessTokenExpiration)
      dispatch(authSuccess(authData.token))
      dispatch(checkAuthTimeout(expiryTime))
    }
  }
}
