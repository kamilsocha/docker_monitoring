import React from "react"
import { Container } from "react-bootstrap"
import ContainersTable from "../ContainersTable/ContainersTable"

const SystemInstance = ({ system }) => {
  const { name, containers } = system
  return (
    <Container fluid>
      <div className="h5 p-2 font-weight-bold shadow rounded bg-light">
        {name}
      </div>
      <ContainersTable containers={containers} />
    </Container>
  )
}

export default SystemInstance
