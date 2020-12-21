import React, { useState, useEffect } from "react"
import { Container, Spinner, ListGroup, Row, Col } from "react-bootstrap"

import { fetchInfo } from "../../services/homeService"
import ArrayProp from "../common/ArrayProp"
import ObjectProp from "../common/ObjectProp"

const InfoComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    fetchInfo()
      .catch((err) => setError(err))
      .then((data) => {
        setIsLoading(false)
        setInfo(data)
      })
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <Container>
        <div className="w-100 text-center">An error occured</div>
      </Container>
    )
  }

  return (
    <Container fluid>
      {info && (
        <ListGroup variant="flush">
          <ListGroup.Item
            variant="secondary"
            key="-1"
            className="h4 font-weight-bolder"
          >
            General
          </ListGroup.Item>
          {Object.keys(info).map((k, index) => {
            if (Array.isArray(info[k])) {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold border-right">
                      {k}
                    </Col>
                    <Col xs="auto">
                      <ArrayProp parenttIndex={index} array={info[k]} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            } else if (typeof info[k] === "object" && info[k] !== null) {
              return <ObjectProp key={index} name={k} object={info[k]} />
            } else if (info[k] !== null && info[k].toString() !== "") {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold border-right">
                      {k}
                    </Col>
                    <Col xs="auto">{info[k].toString()}</Col>
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

export default InfoComponent
