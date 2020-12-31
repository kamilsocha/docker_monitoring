import React from "react"
import { Card } from "react-bootstrap"

import "./containerLogsDetails.style.css"

const ContainerLogsDetails = ({ logs, name }) => {
  return (
    <Card className="shadow">
      <Card.Header className="h4 font-weight-bold">{name} logs</Card.Header>
      <Card.Body>
        <div className="m-div-container">
          {logs.map((el, index) => (
            <div key={index} className="m-div">
              {el}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ContainerLogsDetails
