import axios from "../axios-orders"
import { useEffect, useState } from "react"

export const useFetch = (method, url, data) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios({ method, url, data }).catch((err) => {
        setError(error)
      })
      const resData = res?.data
      setResponse(resData)
    }
    fetchData()
  }, [])
  return { response, error }
}
