import React, { useEffect, useCallback } from "react"
import { Container, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SystemDetails from "./SystemDetails"
import ContainerDetails from "./ContainerDetails"

import axios, { authHeader } from "../../../axios-orders"
import { useState } from "react"
import ContainerActions from "./ContainerActions"

const ContainerDetailsBoard = () => {
  const { Id } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const systemLabel = useSelector(
    (state) => state.containersReducer.systemLabelFullName
  )
  const [container, setContainer] = useState(null)

  const fetchContainer = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`/containers/${Id}`, { headers: authHeader() })
      .catch((err) => setError(err.message))
      .then((res) => {
        if (!res?.data) {
        }
        setContainer(res.data)
        setIsLoading(false)
      })
  }, [Id])

  useEffect(() => {
    fetchContainer()
  }, [fetchContainer])

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="text-danger">An error occured. {error}</div>
      </Container>
    )
  }

  return (
    <Container fluid className="my-3">
      {container && (
        <>
          <ContainerActions
            container={container}
            onContainerFetch={fetchContainer}
            fetchIsLoading={isLoading}
          />
          {Object.keys(container.Labels).includes(systemLabel) && (
            <SystemDetails container={container} />
          )}
          <ContainerDetails container={container} />
        </>
      )}
    </Container>
  )
}

export default ContainerDetailsBoard
