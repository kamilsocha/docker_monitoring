import React from "react"
import { Card, Row, Col, ListGroup } from "react-bootstrap"

import StateField from "./StateField"

const ContainerDetails = ({ container }) => {
  const {
    Names,
    State,
    Status,
    Id,
    Image,
    Mounts,
    NetworkSettings,
    Ports,
  } = container
  return (
    <Card className="my-2">
      <Card.Header className="h4 font-weight-bolder">
        Container details
      </Card.Header>
      {container ? (
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Name
              </Col>
              <Col xs="9">{Names[0]}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                State
              </Col>
              <Col xs="9">
                <StateField State={State} />
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Status
              </Col>
              <Col xs="9">{Status}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Id
              </Col>
              <Col xs="9">{Id}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Image
              </Col>
              <Col xs="9">{Image}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Mounts
              </Col>
              <Col xs="9">
                <ListGroup>
                  <>
                    <ListGroup.Item key="headers-mounts">
                      <Row>
                        <Col xs="6" className="border-right">
                          Source
                        </Col>
                        <Col xs="6">Destination</Col>
                      </Row>
                    </ListGroup.Item>
                    {Mounts.map((m, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col xs="6" className="border-right">
                            {m.Source}
                          </Col>
                          <Col xs="6">{m.Destination}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </>
                </ListGroup>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="2" className="font-weight-bold border-right">
                Networks
              </Col>
              <Col xs="10">
                <ListGroup>
                  {Object.keys(NetworkSettings.Networks).map(
                    (network, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col xs="4" className="border-right">
                            {network}
                          </Col>
                          <Col xs="8">
                            <Row>
                              <Col xs="4" className="border-right">
                                IPAddress
                              </Col>
                              <Col className="text-center">
                                {NetworkSettings.Networks[network].IPAddress ||
                                  "none"}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs="4" className="border-right">
                                NetworkID
                              </Col>
                              <Col xs="8" className="text-center">
                                {NetworkSettings.Networks[network].NetworkID ||
                                  "none"}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Ports
              </Col>
              <Col xs="9">
                {Ports.map((p, index) => (
                  <ListGroup.Item key={index}>
                    {`${p.PublicPort ? p.PublicPort : "-"}:${p.PrivatePort}`};{" "}
                  </ListGroup.Item>
                ))}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div>Not available</div>
      )}
    </Card>
  )
}

export default ContainerDetails
