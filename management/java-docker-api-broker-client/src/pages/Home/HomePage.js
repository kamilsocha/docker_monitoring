import React from "react"
import { Container } from "react-bootstrap"
import InfoComponent from "../../components/Home/InfoComponent"
import VersionComponent from "../../components/Home/VersionComponent"

const HomePage = () => {
  return (
    <Container fluid>
      <div className="h1 m-2 font-weight-bold">Host System Information</div>
      <InfoComponent />
      <VersionComponent />
    </Container>
  )
}

export default HomePage
