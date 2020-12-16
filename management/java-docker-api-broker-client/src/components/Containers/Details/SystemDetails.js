import React from "react"
import { Card, ListGroup, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { serviceTypes, serviceFullSubtype } from "../../../constants/constants"
import SystemContainerLinks from "./SystemContainerLinks"
import { findLabelValue, findServiceName, findSubtype, findType } from "./utils"

const SystemDetails = ({ container }) => {
  const systemLabel = useSelector(
    (state) => state.containersReducer.systemLabelName
  )

  const system = findLabelValue(container, systemLabel)
  const serviceName = findServiceName(container, systemLabel)
  const serviceType = findType(container)
  const serviceSubtype = findSubtype(container, serviceType)
  // console.log("info", system, serviceName, serviceType, serviceSubtype)
  console.log("container", container)
  return (
    <Card className="my-2">
      <Card.Header className="h4 font-weight-bolder">
        System information
      </Card.Header>
      <ListGroup>
        <ListGroup.Item className="h5 font-weight-bold ">
          <Row>
            <Col xs="3" className="border-right">
              System
            </Col>
            <Col xs="9">{system}</Col>
          </Row>
        </ListGroup.Item>
        <div className="ml-2">
          <Card.Title className="font-weight-bold">Service details</Card.Title>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Name
              </Col>
              <Col xs="9">{serviceName}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Type
              </Col>
              <Col xs="9">{serviceType}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                {serviceType === serviceTypes.INFRA ? "Subtype" : "Role"}
              </Col>
              <Col xs="9">{serviceFullSubtype[serviceSubtype]}</Col>
            </Row>
          </ListGroup.Item>
        </div>
      </ListGroup>
      <Card.Body>
        <Card.Title className="font-weight-bold">Links</Card.Title>
        <SystemContainerLinks serviceName={serviceName} />
      </Card.Body>
    </Card>
  )
}

export default SystemDetails
