import axios from "../../axios-orders"

export const AUTH_START = "AUTH_START"
export const AUTH_FAIL = "AUTH_FAIL"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_LOGOUT = "AUTH_LOGOUT"
export const AUTH_REDIRECT_PATH = "AUTH_REDIRECT_PATH"
export const AUTH_CHECK_STATE = "AUTH_CHECK_STATE"

const authValidity = 3600 * 10

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(authStart())
    const email = localStorage.getItem("email")
    console.log("email", email)
    if (email === undefined || email === null) {
      dispatch(logout())
    } else {
      const userId = localStorage.getItem("userId")
      const firstName = localStorage.getItem("firstName")
      const lastName = localStorage.getItem("lastName")
      const userRole = localStorage.getItem("userRole")
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if (expirationDate < new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(userId, email, userRole, firstName, lastName))
        dispatch(
          checkAuthTimeout(
            Math.abs((expirationDate.getTime() - new Date().getTime()) / 1000)
          )
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

export const authSuccess = (userId, email, userRole, firstName, lastName) => {
  return {
    type: AUTH_SUCCESS,
    userId,
    email,
    userRole,
    firstName,
    lastName,
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  console.log("logout called")
  localStorage.removeItem("userId")
  localStorage.removeItem("email")
  localStorage.removeItem("userRole")
  localStorage.removeItem("firstName")
  localStorage.removeItem("lastName")
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

export const auth = (email, password, isSignIn) => {
  return async (dispatch) => {
    dispatch(authStart())
    const response = await axios
      .get(`user-service/users/email/${email}`)
      .catch((err) => {
        dispatch(authFail(err))
      })
    const data = response?.data
    if (data) {
      console.log("saving to storage")
      const expirationDate = new Date(
        new Date().getTime() + authValidity * 1000
      )
      localStorage.setItem("userId", data?.id)
      localStorage.setItem("email", data?.email)
      localStorage.setItem("userRole", data?.role)
      localStorage.setItem("firstName", data?.firstName)
      localStorage.setItem("lastName", data?.lastName)
      localStorage.setItem("expirationDate", expirationDate)
      dispatch(
        authSuccess(
          data?.id,
          email,
          data?.role,
          data?.firstName,
          data?.lastName
        )
      )
      dispatch(checkAuthTimeout(authValidity))
    }
  }
}
