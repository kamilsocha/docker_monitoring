import axios, { authHeader } from "../axios-orders"

export const fetchInfo = async () => {
  const response = await axios.get("/docker-client/info", {
    headers: authHeader(),
  })
  return response?.data
}

export const fetchVersion = async () => {
  const response = await axios.get("/docker-client/info/version", {
    headers: authHeader(),
  })
  return response?.data
}
