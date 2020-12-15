import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import AddMovie from "../../components/Admin/AddMovie"

const AdminPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <AddMovie />
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
