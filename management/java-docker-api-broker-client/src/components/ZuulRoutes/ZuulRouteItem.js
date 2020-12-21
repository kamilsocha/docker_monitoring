import React from "react"
import { Button, Col, ListGroup, Row } from "react-bootstrap"

const ZuulRouteItem = ({ route, url, onRemove }) => {
  return (
    <ListGroup.Item>
      <Row className="text-center">
        <Col xs="4" className="border-right">
          {route}
        </Col>
        <Col xs="4" className="border-right">
          {url}
        </Col>
        <Col xs="4">
          <Button variant="danger" onClick={() => onRemove(route)}>
            Remove
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default ZuulRouteItem
