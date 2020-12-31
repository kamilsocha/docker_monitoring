import axios, { authHeader } from "../axios-orders"

export const fetchContainer = async (Id) => {
  const response = await axios.get(`/containers/${Id}`, {
    headers: authHeader(),
  })
  return response?.data
}

export const inspectContainer = async (Id) => {
  const response = await axios.get(`/containers/${Id}/inspect`, {
    headers: authHeader(),
  })
  return response?.data
}

export const logContainer = async (Id) => {
  const response = await axios.get(`/containers/${Id}/logs`, {
    headers: authHeader(),
  })
  return response?.data
}

export const startContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/start`, null, {
    headers: authHeader(),
  })
  console.log(response)
}

export const stopContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/stop`, null, {
    headers: authHeader(),
  })
  console.log(response)
}

export const killContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/kill`, null, {
    headers: authHeader(),
  })
  console.log(response)
}

export const restartContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/restart`, null, {
    headers: authHeader(),
  })
  console.log(response)
}

export const removeContainer = async (Id) => {
  const response = await axios.delete(`/containers/${Id}`, {
    headers: authHeader(),
  })
  console.log(response)
}
