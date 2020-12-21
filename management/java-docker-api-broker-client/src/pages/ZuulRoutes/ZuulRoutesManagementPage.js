import React, { useState, useEffect } from "react"
import { Container, ListGroup, Spinner, Row, Col } from "react-bootstrap"

import axios from "axios"
import { apiUri, authHeader } from "../../axios-orders"

import ZuulRouteItem from "../../components/ZuulRoutes/ZuulRouteItem"

const ZuulRoutesManagementPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [zuulRoutes, setZuulRoutes] = useState(null)
  useEffect(() => {
    setError(null)
    setIsLoading(true)
    axios
      .get(`${apiUri}/actuator/routes`, { headers: authHeader() })
      .catch((err) => setError(err))
      .then((res) => {
        setZuulRoutes(res.data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Spinner>Loading...</Spinner>
  }

  if (error) {
    return (
      <Container>
        <div>There was an error...</div>
      </Container>
    )
  }

  const handleRouteRemove = (route) => {
    setError(null)
    setIsLoading(true)
    axios
      .delete(`${apiUri}/routes`, {
        headers: authHeader(),
        params: { name: route },
      })
      .catch((err) => {
        setError(err)
      })
      .then(() => {
        setIsLoading(false)
        let newRoutes = zuulRoutes
        delete newRoutes[route]
        setZuulRoutes(newRoutes)
      })
  }

  return (
    <Container>
      <div className="h1 m-2 font-weight-bold">
        <span>Api gateway routes management</span>
      </div>
      <ListGroup className="m-2">
        <ListGroup.Item variant="dark">
          <Row className="text-center">
            <Col xs="4" className="border-right">
              Route
            </Col>
            <Col xs="4" className="border-right">
              Url
            </Col>
            <Col xs="4">Action</Col>
          </Row>
        </ListGroup.Item>
        {zuulRoutes &&
          Object.keys(zuulRoutes).map((r) => (
            <ZuulRouteItem
              key={r}
              url={zuulRoutes[r]}
              route={r}
              onRemove={handleRouteRemove}
            />
          ))}
      </ListGroup>
    </Container>
  )
}

export default ZuulRoutesManagementPage
