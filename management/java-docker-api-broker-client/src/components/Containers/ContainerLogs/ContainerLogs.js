import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { Container, Row, Col, Spinner } from "react-bootstrap"

import { logContainer } from "../../../services/containerService"
import BackButton from "../../common/BackButton"
import ContainerLogsDetails from "./ContainerLogsDetails"
import { useSelector } from "react-redux"

const ContainerLogs = () => {
  const { Id } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState(null)

  const name = useSelector((state) =>
    state.containersReducer.allContainers
      .find((c) => c.Id === Id)
      .Names[0].replace("/", "")
  )

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    logContainer(Id)
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      })
      .then((data) => {
        setLogs(data)
        setIsLoading(false)
      })
  }, [Id])

  if (isLoading) {
    return (
      <Container style={{ minHeight: "100vh" }}>
        <Row style={{ minHeight: "100vh" }}>
          <Col
            md={{ span: 2, offset: 5 }}
            className="align-self-center text-center"
          >
            <Spinner animation="border" variant="dark" />
          </Col>
        </Row>
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
    <div className="m-3">
      <BackButton text="back" />
      {logs && <ContainerLogsDetails logs={logs} name={name} />}
    </div>
  )
}

export default ContainerLogs
