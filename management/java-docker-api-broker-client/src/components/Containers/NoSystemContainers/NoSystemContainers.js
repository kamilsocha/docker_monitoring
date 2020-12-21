import React from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import ContainersTable from "../ContainersTable/ContainersTable"

const NoSystemContainers = () => {
  const containers = useSelector(
    (state) => state.containersReducer.noSystemContainers
  )
  return (
    <div className="m-3">
      <Container fluid>
        {containers && <ContainersTable containers={containers} />}
      </Container>
    </div>
  )
}

export default NoSystemContainers
