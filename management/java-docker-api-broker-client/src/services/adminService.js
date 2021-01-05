// import axios from "axios"
import axios, { authHeader } from "../axios-orders"

export const fetchUsers = async () => {
  // const response = await axios.get("http://localhost:8080/users", {
  const response = await axios.get("/auth/users", {
    headers: authHeader(),
  })
  return response?.data
}

export const createUser = async (email, password) => {
  // const response = await axios.post(
  //   "http://localhost:8080/users",
  //   { email, password },

  const response = await axios.post(
    "/auth/users",
    { email, password },
    {
      headers: authHeader(),
    }
  )
  return response?.data
}

export const deleteUser = async (id) => {
  // const res = await axios.delete(`http://localhost:8080/users/${id}`, {
  await axios.delete(`/auth/users/${id}`, {
    headers: authHeader(),
  })
}
