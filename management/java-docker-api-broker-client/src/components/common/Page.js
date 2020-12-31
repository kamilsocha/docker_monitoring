import React from "react"
import { Container } from "react-bootstrap"

const Page = ({ children, fluid = false }) => {
  return (
    <Container fluid={fluid} className="py-3">
      {children}
    </Container>
  )
}

export default Page
