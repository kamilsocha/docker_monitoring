import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REDIRECT_PATH,
  FETCH_USER_DATA_SUCCESS,
} from "../actions/auth"
import { updateObject } from "../utils"

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  accessTokenExpiration: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  email: "",
  role: "",
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
    isAuthenticated: true,
    token: action.accessToken,
    accessTokenExpiration: action.accessTokenExpiration,
    error: null,
    loading: false,
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    isAuthenticated: false,
    accessToken: null,
    accessTokenExpiration: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
  })
}

const fetchUserDataSuccess = (state, action) => {
  return updateObject(state, {
    email: action.payload.email,
    role: action.payload.role,
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
    case FETCH_USER_DATA_SUCCESS:
      return fetchUserDataSuccess(state, action)
    default:
      return state
  }
}
