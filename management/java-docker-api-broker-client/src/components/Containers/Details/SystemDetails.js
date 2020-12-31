import React from "react"
import { Card, ListGroup, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import SystemContainerLinks from "./SystemContainerLinks"
import { findLabelValue, findServiceName, findSubtype, findType } from "./utils"

const SystemDetails = ({ container }) => {
  const microServiceLabel = useSelector(
    (state) => state.configReducer.labelValues.microServiceSubtypeLabelValue
  )

  const containerStates = useSelector(
    (state) => state.containersReducer.containerStates
  )
  const labelKeys = useSelector((state) => state.configReducer.labelKeys)
  const labelValues = useSelector((state) => state.configReducer.labelValues)

  const system = findLabelValue(container, labelKeys.systemNameLabelKey)
  const serviceName = findServiceName(container, labelKeys.systemNameLabelKey)
  const serviceType = findType(container, labelKeys.serviceTypeLabelKey)
  const serviceSubtype = findSubtype(
    container,
    serviceType,
    labelKeys.serviceSubtypeLabelKey
  )

  let infraMicroserviceSubtype
  if (serviceType === labelValues.infraTypeLabelValue) {
    infraMicroserviceSubtype = findLabelValue(
      container,
      `${serviceType}${labelKeys.serviceSubtypeLabelKey}`
    )
  }

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
                Subtype
              </Col>
              <Col xs="9">{serviceSubtype}</Col>
            </Row>
          </ListGroup.Item>
          {infraMicroserviceSubtype && (
            <ListGroup.Item>
              <Row>
                <Col xs="3" className="font-weight-bold border-right">
                  Role
                </Col>
                <Col xs="9">{infraMicroserviceSubtype}</Col>
              </Row>
            </ListGroup.Item>
          )}
        </div>
      </ListGroup>
      {container.State === containerStates.RUNNING &&
        serviceSubtype === microServiceLabel && (
          <Card.Body>
            <Card.Title className="font-weight-bold">Links</Card.Title>
            <SystemContainerLinks
              serviceName={container.Names[0]}
              infraMicroServiceSubtype={infraMicroserviceSubtype}
              IPAddress={
                container.NetworkSettings.Networks.management.IPAddress
              }
              Port={container.Ports[0]?.PrivatePort}
            />
          </Card.Body>
        )}
    </Card>
  )
}

export default SystemDetails
