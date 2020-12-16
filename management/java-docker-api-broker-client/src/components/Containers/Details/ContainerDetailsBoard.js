import React from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SystemDetails from "./SystemDetails"
import ContainerDetails from "./ContainerDetails"

const ContainerDetailsBoard = () => {
  const { Id } = useParams()
  const container = useSelector((state) =>
    state.containersReducer.allContainers.find((c) => c.Id === Id)
  )
  return (
    <Container fluid className="my-3">
      <SystemDetails container={container} />
      <ContainerDetails container={container} />
    </Container>
  )
}

export default ContainerDetailsBoard
