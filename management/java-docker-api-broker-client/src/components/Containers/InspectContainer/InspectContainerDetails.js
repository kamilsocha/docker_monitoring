import React from "react"
import { Card, ListGroup, Row, Col } from "react-bootstrap"

import ArrayProp from "../../common/ArrayProp"
import ObjectProp from "../../common/ObjectProp"

const InspectContainerDetails = ({ container }) => {
  const { Name } = container
  return (
    <Card className="shadow">
      <Card.Header className="h4 font-weight-bolder">
        Inspect Container: {Name.replace("/", "")}
      </Card.Header>
      <ListGroup>
        {Object.keys(container).map((k, index) => {
          if (Array.isArray(container[k])) {
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs="auto" className="font-weight-bold">
                    {k}
                  </Col>
                  <Col xs="auto">
                    <ArrayProp parentIndex={index} array={container[k]} />
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          } else if (
            typeof container[k] === "object" &&
            container[k] !== null
          ) {
            return <ObjectProp key={index} name={k} object={container[k]} />
          } else if (container[k] !== null && container[k].toString() !== "") {
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs="auto" className="font-weight-bold">
                    {k}
                  </Col>
                  <Col xs="auto">{container[k].toString()}</Col>
                </Row>
              </ListGroup.Item>
            )
          } else {
            return null
          }
        })}
      </ListGroup>
    </Card>
  )
}

export default InspectContainerDetails
