import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, ListGroup, Spinner, Row, Col } from "react-bootstrap"

import axios from "axios"
import { authHeader } from "../../axios-orders"

import ZuulRouteItem from "../../components/ZuulRoutes/ZuulRouteItem"
import Page from "../../components/common/Page"
import PageTitle from "../../components/common/PageTitle"

import { USER_ROLES } from "../../constants/constants"

const ZuulRoutesManagementPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [zuulRoutes, setZuulRoutes] = useState(null)
  const userRole = useSelector((state) => state.auth.role)
  useEffect(() => {
    setError(null)
    setIsLoading(true)
    axios
      .get(`/actuator/routes`, { headers: authHeader() })
      .catch((err) => setError(err))
      .then((res) => {
        setZuulRoutes(res?.data)
        setIsLoading(false)
      })
  }, [])

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
        <div>There was an error...</div>
      </Container>
    )
  }

  const handleRouteRemove = (route) => {
    setError(null)
    setIsLoading(true)
    axios
      .delete(`/routes`, {
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
    <Page fluid="true">
      <PageTitle title="Api gateway routes management"></PageTitle>
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
              disabled={!userRole.includes(USER_ROLES.ROLE_ADMIN)}
            />
          ))}
      </ListGroup>
    </Page>
  )
}

export default ZuulRoutesManagementPage
