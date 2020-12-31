import axios, { authHeader } from "../axios-orders"

export const fetchImages = async (showAll = false, dangling = false) => {
  const response = await axios.get("/images", {
    headers: authHeader(),
    params: { showAll, dangling },
  })
  return response?.data
}

export const inspectImage = async (Id) => {
  const response = await axios.get(`/images/inspect/${Id}`, {
    headers: authHeader(),
  })
  return response?.data
}
