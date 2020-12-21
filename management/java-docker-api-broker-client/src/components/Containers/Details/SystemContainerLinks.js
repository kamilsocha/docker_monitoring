import React, { useEffect, useCallback } from "react"
import { useState } from "react"
import {
  Button,
  Container,
  ListGroup,
  Spinner,
  Row,
  Col,
} from "react-bootstrap"
import {
  createOrUpdateLinks,
  refreshService,
  shutdownService,
} from "../../../services/createRoutesService"

import {
  allowedActuatorLinks,
  swaggerRoutes,
} from "../../../constants/constants"

const apiUri = `${process.env.REACT_APP_API_URL}`

const filter = (links) => {
  if (links) {
    return Object.keys(links)
      .filter((key) => allowedActuatorLinks.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: links[key],
        }
      }, {})
  }
}

const SystemContainerLinks = ({ serviceName, IPAddress, Port }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [links, setLinks] = useState([])

  const createLinks = useCallback(() => {
    // prepare all routes(links) on load
    setIsLoading(true)
    setError(null)
    createOrUpdateLinks(serviceName, IPAddress, Port)
      .catch((err) => {
        console.log("err", err)
        setIsLoading(false)
        setError(err)
      })
      .then((l) => {
        setLinks(filter(l))
        setIsLoading(false)
      })
  }, [serviceName, IPAddress, Port])

  useEffect(() => {
    createLinks()
  }, [createLinks])

  const handleRefresh = () => {
    refreshService(serviceName)
  }

  const handleShutdown = () => {
    shutdownService(serviceName)
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" className=""></Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <Row>
        <Col className="text-center">
          <div>An error occured. Maybe container did not start yet.</div>
          <div>{error.message}</div>
          <Button variant="primary" className="mt-2" onClick={createLinks}>
            Try again
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      <ListGroup horizontal className="text-center">
        <ListGroup.Item
          key="-2"
          variant="success"
          action
          onClick={handleRefresh}
        >
          Refresh
        </ListGroup.Item>
        <ListGroup.Item
          key="-1"
          variant="danger"
          action
          onClick={handleShutdown}
        >
          Shutdown
        </ListGroup.Item>
      </ListGroup>
      <ListGroup className="font-italic">
        {links &&
          Object.keys(links).map((l, index) => (
            <ListGroup.Item key={index}>
              <a
                href={`${apiUri}/systems/${serviceName.replace(
                  "/",
                  ""
                )}/actuator/${l}`}
                target="_blank"
                rel="noreferrer"
              >{`${apiUri}/systems/${serviceName.replace(
                "/",
                ""
              )}/actuator/${l}`}</a>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <ListGroup className="font-italic">
        {swaggerRoutes.map((r, index) => (
          <ListGroup.Item key={index}>
            <a
              href={`${apiUri}/systems/${serviceName.replace(
                "/",
                ""
              )}${r.replace("**", "")}`}
              target="_blank"
              rel="noreferrer"
            >{`${apiUri}/systems/${serviceName.replace("/", "")}${r.replace(
              "**",
              ""
            )}`}</a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default SystemContainerLinks
