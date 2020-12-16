import axios from "axios"

const instance = axios.create({
  // baseURL: "http://localhost:8001",
  baseURL: "http://localhost:7080/api",
  timeout: 5000,
})

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
