import React from "react"
import { ListGroup, Row, Col } from "react-bootstrap"
import ArrayProp from "./ArrayProp"

const ObjectProp = ({ parentIndex, name, object }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col xs="auto" className="font-weight-bold">
          {name}
        </Col>
        <Col xs="auto">
          {Object.keys(object).map((k, index) => {
            if (Array.isArray(object[k])) {
              return (
                <ListGroup.Item key={`${parentIndex}${index}`}>
                  <Row>
                    <Col xs="auto" className="font-weight-bold">
                      {k}
                    </Col>
                    <Col xs="auto">
                      <ArrayProp
                        parentIndex={`${parentIndex}${index}`}
                        array={object[k]}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            } else if (typeof object[k] === "object" && object[k] !== null) {
              return (
                <ObjectProp
                  key={`${parentIndex}${index}`}
                  level={1}
                  name={k}
                  object={object[k]}
                />
              )
            } else if (object[k] !== null && object[k].toString() !== "") {
              return (
                <ListGroup.Item
                  key={`${parentIndex}${index}`}
                  className="w-100"
                >
                  <Row>
                    <Col xs="auto" className="font-weight-bold">
                      {k}
                    </Col>
                    <Col xs="auto">{object[k].toString()}</Col>
                  </Row>
                </ListGroup.Item>
              )
            } else {
              return null
            }
          })}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default ObjectProp
