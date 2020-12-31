import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Spinner } from "react-bootstrap"

import { inspectContainer } from "../../../services/containerService"
import InspectContainerDetails from "./InspectContainerDetails"
import BackButton from "../../common/BackButton"

const InspectContainer = () => {
  const { Id } = useParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [container, setContainer] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    inspectContainer(Id)
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      })
      .then((data) => {
        setContainer(data)
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
      {container && <InspectContainerDetails container={container} />}
    </div>
  )
}

export default InspectContainer
