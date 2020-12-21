import axios from "axios"
import { authHeader } from "../axios-orders"
const apiUri = `${process.env.REACT_APP_API_URL}`

export const createOrUpdateLinks = async (serviceName, IPAddress, Port) => {
  const response = await axios.post(`${apiUri}/routes`, null, {
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
  axios.post(`${apiUri}/${serviceName.replace("/", "")}/actuator/refresh`)
}

export const shutdownService = (serviceName) => {
  axios.post(`${apiUri}/${serviceName.replace("/", "")}/actuator/shutdown`)
}
