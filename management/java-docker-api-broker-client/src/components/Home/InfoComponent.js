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
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    )
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
            if (k === "DriverStatus") {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold">
                      {k}
                    </Col>
                    <Col xs="auto">
                      {info[k].map((el, index) => (
                        <div key={`ds${index}`}>
                          <span className="font-weight-bold">{el[0]}: </span>
                          <span>{el[1]}</span>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            } else if (Array.isArray(info[k])) {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold">
                      {k}
                    </Col>
                    <Col xs="auto">
                      <ArrayProp parentIndex={index} array={info[k]} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            } else if (typeof info[k] === "object" && info[k] !== null) {
              return (
                <ObjectProp
                  key={index}
                  parentIndex={index}
                  name={k}
                  object={info[k]}
                />
              )
            } else if (info[k] !== null && info[k].toString() !== "") {
              return (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold">
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
