import axios from "../axios-orders"

export const startContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/start`)
  console.log(response)
}

export const stopContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/stop`)
  console.log(response)
}

export const killContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/kill`)
  console.log(response)
}

export const restartContainer = async (Id) => {
  const response = await axios.put(`/containers/${Id}/restart`)
  console.log(response)
}

export const removeContainer = async (Id) => {
  const response = await axios.delete(`/containers/${Id}`)
  console.log(response)
}
