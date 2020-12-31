import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as authActions from "./store/actions/auth"
import "./App.css"
import MainPage from "./pages/MainPage"
import AuthPage from "./pages/Auth/AuthPage"
import { Container, Row, Col, Spinner } from "react-bootstrap"

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isLoading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.authCheckState())
  }, [dispatch])

  if (isLoading) {
    return (
      <Container style={{ minHeight: "100vh" }}>
        <Row style={{ minHeight: "100vh" }}>
          <Col
            md={{ span: 2, offset: 5 }}
            className="align-self-center text-center"
          >
            <Spinner animation="border" variant="dark" />
          </Col>
        </Row>
      </Container>
    )
  }

  return isAuthenticated ? <MainPage /> : <AuthPage />
}

export default App
