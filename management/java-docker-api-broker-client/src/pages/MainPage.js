import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Menu from "../components/Menu/Menu"
import Routes from "../navigation/Routes"

const MainPage = () => {
  return (
    <>
      <Row noGutters className="bg-dark" style={{ minHeight: "100vh" }}>
        <Col xs="3" className="h-100" style={{ minHeight: "100vh" }}>
          <Menu />
        </Col>
        <Col xs={{ span: 9 }} className="bg-light">
          <Routes />
        </Col>
      </Row>
    </>
  )
}

export default MainPage
