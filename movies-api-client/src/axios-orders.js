import axios from "axios"

const instance = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "http://apigateway:8080/",
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
