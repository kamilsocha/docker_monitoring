import React from "react"
import { Card, Col, ListGroup, Row } from "react-bootstrap"

const VolumeDetails = ({ Name, volume }) => {
  const { Driver, Labels, Mountpoint } = volume
  return (
    <Card className="shadow">
      <Card.Header className="h4 font-weight-bolder">{Name}</Card.Header>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Driver
            </Col>
            <Col xs="10">{Driver}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Mountpoint
            </Col>
            <Col xs="10">{Mountpoint}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Labels
            </Col>
            <Col xs="10">
              {Labels &&
                Object.keys(Labels).map((key, index) => (
                  <Row key={index} className="border-bottom">
                    <Col xs="6" className="font-weight-bold border-right">
                      {key}
                    </Col>
                    <Col xs="6">{Labels[key]}</Col>
                  </Row>
                ))}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default VolumeDetails
