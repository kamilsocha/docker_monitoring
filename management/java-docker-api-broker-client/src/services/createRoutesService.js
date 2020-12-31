import axios from "axios"
import { authHeader } from "../axios-orders"

export const createOrUpdateLinks = async (serviceName, IPAddress, Port) => {
  const response = await axios.post(`/routes`, null, {
    headers: authHeader(),
    params: {
      name: serviceName.replace("/", ""),
      url: `http://${IPAddress}:${Port}`,
    },
  })
  const data = response?.data
  if (data) {
    return data._links
  }
}

export const refreshService = (serviceName) => {
  axios.post(`/systems/${serviceName.replace("/", "")}/actuator/refresh`)
}

export const shutdownService = (serviceName) => {
  axios.post(`/systems/${serviceName.replace("/", "")}/actuator/shutdown`)
}
