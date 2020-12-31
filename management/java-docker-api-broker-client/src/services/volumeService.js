import axios, { authHeader } from "../axios-orders"

export const fetchVolumes = async (dangling = false) => {
  const response = await axios.get("/volumes", {
    headers: authHeader(),
    params: { dangling },
  })
  return response?.data
}

export const inspectVolume = async (Name) => {
  const response = await axios.get(`/volumes/${Name}/inspect`, {
    headers: authHeader(),
  })
  return response?.data
}
