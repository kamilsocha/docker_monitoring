import React, { useState, useEffect } from "react"
import { Container, Spinner, ListGroup, Row, Col } from "react-bootstrap"

import { fetchVersion } from "../../services/homeService"

import ObjectProp from "../common/ObjectProp"
import ArrayProp from "../common/ArrayProp"

const VersionComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    fetchVersion()
      .catch((err) => setError(err))
      .then((data) => {
        setIsLoading(false)

        setVersion(data)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return (
      <Container fluid>
        <div className="w-100 text-center">An error occured</div>
      </Container>
    )
  }

  return (
    <Container fluid>
      {version && (
        <ListGroup variant="flush">
          <ListGroup.Item
            variant="secondary"
            key="-1"
            className="h4 font-weight-bolder"
          >
            Version
          </ListGroup.Item>
          {Object.keys(version).map((k, index) => {
            if (Array.isArray(version[k])) {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold">
                      {k}
                    </Col>
                    <Col xs="auto">
                      <ArrayProp parentIndex={index} array={version[k]} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            } else if (typeof version[k] === "object" && version[k] !== null) {
              return <ObjectProp key={index} name={k} object={version[k]} />
            } else if (version[k] !== null && version[k].toString() !== "") {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold border-right">
                      {k}
                    </Col>
                    <Col xs="auto">{version[k].toString()}</Col>
                  </Row>
                </ListGroup.Item>
              )
            } else {
              return null
            }
          })}
        </ListGroup>
      )}
    </Container>
  )
}

export default VersionComponent
