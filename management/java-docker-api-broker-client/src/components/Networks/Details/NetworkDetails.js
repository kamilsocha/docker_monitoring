import React from "react"
import { Card, Col, ListGroup, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const NetworkDetails = ({ Id, network }) => {
  const {
    Attachable,
    Containers,
    Driver,
    EnableIPv6,
    IPAM,
    Internal,
    Labels,
    Name,
    Options,
    Scope,
  } = network
  return (
    <Card className="shadow">
      <Card.Header className="h4 font-weight-bolder">{Name}</Card.Header>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Id
            </Col>
            <Col xs="10">{Id}</Col>
          </Row>
        </ListGroup.Item>
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
              Attachable
            </Col>
            <Col xs="10">{Attachable.toString()}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              EnableIPv6
            </Col>
            <Col xs="10">{EnableIPv6.toString()}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Internal
            </Col>
            <Col xs="10">{Internal.toString()}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Scope
            </Col>
            <Col xs="10">{Scope}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              IPAM
            </Col>
            <Col xs="10">
              <Row className="border-bottom">
                <Col xs="2" className="font-weight-bold border-right">
                  Config
                </Col>
                <Col xs="10">
                  {IPAM?.Config?.map((c, index) => (
                    <Row key={index}>
                      <Col>
                        {Object.keys(c).map((prop, index) => (
                          <div key={`${prop}${index}`}>
                            <span className="font-weight-bold mr-3">
                              {prop}:
                            </span>
                            <span>{c[prop] || "-"}</span>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col xs="2" className="font-weight-bold border-right">
                  Driver
                </Col>
                <Col xs="10">{IPAM?.Driver || "-"}</Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
        {Object.keys(Options).length !== 0 && (
          <ListGroup.Item>
            <Row>
              <Col xs="2" className="font-weight-bold border-right">
                Options
              </Col>
              <Col xs="10">
                {Object.keys(Options).map((o) => (
                  <div>{o.toString()}</div>
                ))}
              </Col>
            </Row>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Labels
            </Col>
            <Col xs="10">
              {Object.keys(Labels).map((label, index) => (
                <Row key={index} className="border-bottom">
                  <Col xs="5" className="font-weight-bold border-right">
                    {label}
                  </Col>
                  <Col xs="7">{Labels[label]}</Col>
                </Row>
              ))}
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Containers
            </Col>
            <Col xs="10">
              {Object.keys(Containers).map((container, index) => (
                <Row key={index} className="border-bottom">
                  <Col xs="4" className="border-right">
                    <Link to={`/containers/${container}`}>{container}</Link>
                  </Col>
                  <Col xs="8">
                    {Object.keys(Containers[container]).map((prop, index) => (
                      <Row
                        key={`${container}${index}`}
                        className="border-bottom"
                      >
                        <Col xs="4" className="font-weight-bold border-right">
                          {prop}
                        </Col>
                        <Col xs="8" className="text-center">
                          {Containers[container][prop] || "-"}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default NetworkDetails
