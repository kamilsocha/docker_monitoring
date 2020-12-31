import React from "react"
import { Card, Col, ListGroup, Row } from "react-bootstrap"

const ImageDetails = ({ Id, image }) => {
  const {
    RepoTags,
    Architecture,
    Author,
    Comment,
    Config,
    Created,
    DockerVersion,
    Os,
    Parent,
    Size,
  } = image
  const creationDate = new Date(Created)
  return (
    <Card className="shadow">
      <Card.Header className="h4 font-weight-bolder">
        {RepoTags[0] ? RepoTags[0] : Id}
      </Card.Header>
      <ListGroup>
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
              Parent
            </Col>
            <Col xs="9">{Parent}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="3" className="font-weight-bold border-right">
              Author
            </Col>
            <Col xs="9">{Author ? Author : "unknown"}</Col>
          </Row>
        </ListGroup.Item>
        {Comment && (
          <ListGroup.Item>
            <Row>
              <Col xs="3" className="font-weight-bold border-right">
                Comment
              </Col>
              <Col xs="9">{Comment}</Col>
            </Row>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <Row>
            <Col xs="3" className="font-weight-bold border-right">
              Created
            </Col>
            <Col xs="9">{creationDate.toUTCString()}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="3" className="font-weight-bold border-right">
              Size
            </Col>
            <Col xs="9">{Math.round(Size / 1000000)} MB</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="3" className="font-weight-bold border-right">
              Os
            </Col>
            <Col xs="9">{Os}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="3" className="font-weight-bold border-right">
              Architecture
            </Col>
            <Col xs="9">{Architecture}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="3" className="font-weight-bold border-right">
              Docker Version
            </Col>
            <Col xs="9">{DockerVersion}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs="2" className="font-weight-bold border-right">
              Config
            </Col>
            <Col xs="10">
              {Config.Cmd && (
                <Row className="border-bottom">
                  <Col xs="3" className="border-right">
                    Cmd
                  </Col>
                  <Col xs="9">cmd...</Col>
                </Row>
              )}
              {Config.Entrypoint && (
                <Row className="border-bottom">
                  <Col xs="3" className="border-right">
                    Entrypoint
                  </Col>
                  <Col xs="9">[ {Config.Entrypoint.join(", ")} ]</Col>
                </Row>
              )}
              {Config.Env && (
                <Row className="border-bottom">
                  <Col xs="3" className="border-right">
                    Env
                  </Col>
                  <Col xs="9">{Config.Env.join(", ")}</Col>
                </Row>
              )}
              {Config.ExposedPorts && (
                <Row className="border-bottom">
                  <Col xs="3" className="border-right">
                    Exposed Ports
                  </Col>
                  <Col xs="9">
                    {Object.keys(Config.ExposedPorts).map((p) => (
                      <div>{p}</div>
                    ))}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default ImageDetails
