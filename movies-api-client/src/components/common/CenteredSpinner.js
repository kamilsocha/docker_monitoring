import React from "react"
import { Container, Row, Col, Spinner } from "react-bootstrap"

const CenteredSpinner = ({
  animation = "border",
  variant = "dark",
  fullHeight = false,
}) => {
  return (
    <Container className="h-100">
      <Row className="h-100" style={fullHeight ? { minHeight: "100vh" } : null}>
        <Col md={{ span: 2, offset: 5 }} className="align-self-center">
          <Spinner animation={animation} variant={variant} />
        </Col>
      </Row>
    </Container>
  )
}

export default CenteredSpinner
