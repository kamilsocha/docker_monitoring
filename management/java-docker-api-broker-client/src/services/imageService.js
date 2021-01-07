// import axios from "axios"
// import { authHeader } from "../axios-orders"
import axios, { authHeader } from "../axios-orders"

export const fetchImages = async (showAll = false, dangling = false) => {
  const response = await axios.get("/docker-client/images", {
    // const response = await axios.get(
    // "http://localhost:8080/api/docker-client/images",

    headers: authHeader(),
    params: { showAll, dangling },
  })
  return response?.data
}

export const inspectImage = async (Id) => {
  const response = await axios.get(`/docker-client/images/inspect/${Id}`, {
    headers: authHeader(),
  })
  return response?.data
}
