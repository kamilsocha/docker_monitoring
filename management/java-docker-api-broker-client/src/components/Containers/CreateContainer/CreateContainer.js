import React from "react"
import { Container } from "react-bootstrap"

import { CreateContainerForm } from "./CreateContainerForm"

const CreateContainer = () => {
  return (
    <Container fluid>
      <div className="h2 my-3">Container data</div>
      <CreateContainerForm />
    </Container>
  )
}

export default CreateContainer
