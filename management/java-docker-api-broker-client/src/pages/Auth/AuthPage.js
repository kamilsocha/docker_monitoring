import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import SignInFormContainer from "../../components/Auth/SignInFormContainer"

import "./authPage.style.css"

const AuthPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  let authRedirect = null
  if (isAuthenticated) {
    authRedirect = <Redirect push to="/" />
  }

  return (
    <Container>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={{ span: 6, offset: 3 }} className="align-self-center">
          <>
            {authRedirect}
            <SignInFormContainer />
          </>
        </Col>
      </Row>
    </Container>
  )
}

export default AuthPage
