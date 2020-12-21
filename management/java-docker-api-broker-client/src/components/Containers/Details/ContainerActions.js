import React, { useState } from "react"
import { ButtonGroup, Button, Card, Spinner } from "react-bootstrap"

import {
  startContainer,
  stopContainer,
  killContainer,
  restartContainer,
  removeContainer,
} from "../../../services/containerService"

import ButtonWithRouter from "./ButtonWithRouter"

import { containerStates } from "../../../constants/constants"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ContainerActions = ({ container, onContainerFetch, fetchIsLoading }) => {
  const [isLoading, setIsLoading] = useState({
    startIsLoading: false,
    stopIsLoading: false,
    killIsLoading: false,
    restartIsLoading: false,
    removeIsLoading: false,
  })
  const handleContainerStart = () => {
    setIsLoading({ ...isLoading, startIsLoading: true })
    startContainer(container.Id)
      .catch((err) => console.log(err))
      .then(() => {
        setIsLoading({ ...isLoading, startIsLoading: false })
        onContainerFetch()
      })
  }

  const handleContainerStop = () => {
    setIsLoading({ ...isLoading, stopIsLoading: true })
    stopContainer(container.Id)
      .catch((err) => console.log(err))
      .then(() => {
        setIsLoading({ ...isLoading, stopIsLoading: false })
        onContainerFetch()
      })
  }

  const handleContainerKill = () => {
    setIsLoading({ ...isLoading, killIsLoading: true })
    killContainer(container.Id)
      .catch((err) => console.log(err))
      .then(() => {
        setIsLoading({ ...isLoading, killIsLoading: false })
        onContainerFetch()
      })
  }

  const handleContainerRestart = () => {
    setIsLoading({ ...isLoading, restartIsLoading: true })
    restartContainer(container.Id)
      .catch((err) => console.log(err))
      .then(() => {
        setIsLoading({ ...isLoading, restartIsLoading: false })
        onContainerFetch()
      })
  }

  const handleContainerRemove = async () => {
    return await removeContainer(container.Id).catch((err) => console.log(err))
  }

  return (
    <Card className="my-2">
      <Card.Header className="h4 font-weight-bolder">
        <span className="mr-3">Actions</span>
        {container.Names[0]}
      </Card.Header>
      <ButtonGroup>
        <Button
          variant="success"
          onClick={handleContainerStart}
          disabled={container.State === containerStates.RUNNING}
        >
          {isLoading.startIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Start"
          )}
        </Button>
        <Button
          variant="warning"
          onClick={handleContainerStop}
          disabled={container.State !== containerStates.RUNNING}
        >
          {isLoading.stopIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Stop"
          )}
        </Button>
        <Button
          variant="danger"
          onClick={handleContainerKill}
          disabled={container.State !== containerStates.RUNNING}
        >
          {isLoading.killIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Kill"
          )}
        </Button>
        <Button
          variant="primary"
          onClick={handleContainerRestart}
          disabled={container.State !== containerStates.RUNNING}
        >
          {isLoading.restartIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Restart"
          )}
        </Button>
        <ButtonWithRouter
          variant="danger"
          onClick={handleContainerRemove}
          disabled={container.State === containerStates.RUNNING}
        >
          {isLoading.removeisLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Remove"
          )}
        </ButtonWithRouter>
        <Button variant="secondary" onClick={onContainerFetch}>
          {fetchIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <>
              <span className="mr-1">Refresh</span>
              <FontAwesomeIcon icon={faSync} />
            </>
          )}
        </Button>
      </ButtonGroup>
    </Card>
  )
}

export default ContainerActions
