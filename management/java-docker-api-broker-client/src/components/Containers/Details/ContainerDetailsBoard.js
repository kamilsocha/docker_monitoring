import React, { useEffect, useCallback, useState } from "react"
import { Container, Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SystemDetails from "./SystemDetails"
import ContainerDetails from "./ContainerDetails"
import BackButton from "../../common/BackButton"

import { fetchContainer } from "../../../services/containerService"
import ContainerActions from "./ContainerActions"

const ContainerDetailsBoard = () => {
  const { Id } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const systemLabel = useSelector(
    (state) => state.configReducer.labelKeys.systemNameLabelKey
  )

  const [container, setContainer] = useState(null)

  const getContainer = useCallback(() => {
    setIsLoading(true)
    setError(null)
    fetchContainer(Id)
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
      .then((data) => {
        setContainer(data)
        setIsLoading(false)
      })
  }, [Id])

  useEffect(() => {
    getContainer()
  }, [getContainer])

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
      <BackButton />
      {container && (
        <>
          <ContainerActions
            container={container}
            onContainerFetch={getContainer}
            fetchIsLoading={isLoading}
          />
          {Object.keys(container.Labels).find((l) =>
            l.includes(systemLabel)
          ) && <SystemDetails container={container} />}
          <ContainerDetails container={container} />
        </>
      )}
    </Container>
  )
}

export default ContainerDetailsBoard
