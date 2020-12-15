import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REDIRECT_PATH,
} from "./actions"
import { updateObject } from "../utility"

const initialState = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  userRole: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    email: action.email,
    userRole: action.userRole,
    firstName: action.firstName,
    lastName: action.lastName,
    error: null,
    loading: false,
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    userId: null,
    email: null,
    userRole: null,
    firstName: null,
    lastName: null,
    loading: false,
  })
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action)
    case AUTH_FAIL:
      return authFail(state, action)
    case AUTH_SUCCESS:
      return authSuccess(state, action)
    case AUTH_LOGOUT:
      return authLogout(state, action)
    case AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)
    default:
      return state
  }
}
