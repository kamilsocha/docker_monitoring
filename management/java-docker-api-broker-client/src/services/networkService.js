import axios, { authHeader } from "../axios-orders"

export const fetchNetworks = async () => {
  const response = await axios.get("/networks", {
    headers: authHeader(),
  })
  return response?.data
}

export const inspectNetwork = async (Id) => {
  const response = await axios.get(`/networks/${Id}/inspect`, {
    headers: authHeader(),
  })
  return response?.data
}
