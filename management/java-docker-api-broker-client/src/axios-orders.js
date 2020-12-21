import axios from "axios"

export const apiUri = process.env.REACT_APP_API_URL

const instance = axios.create({
  baseURL: `${apiUri}/api`,
  timeout: 5000,
})

export const authHeader = () => {
  const accessToken = localStorage.getItem("token")
  if (accessToken) {
    return { Authorization: `${accessToken}` }
  } else {
    return {}
  }
}

export const parseParams = (params) => {
  const keys = Object.keys(params)
  let options = ""

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object"
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element) => {
        options += `${key}=${element}&`
      })
    }
  })

  return options ? options.slice(0, -1) : options
}

export default instance
