import React from "react"
import { useSelector } from "react-redux"
import { Container } from "react-bootstrap"

import ContainersTable from "../ContainersTable/ContainersTable"

const AllContainers = () => {
  const containers = useSelector(
    (state) => state.containersReducer.allContainers
  )
  return (
    <div className="m-3">
      <Container fluid>
        {containers && <ContainersTable containers={containers} />}
      </Container>
    </div>
  )
}

export default AllContainers
