import React, { useState, useEffect, useCallback } from "react"
import AddUserForm from "./AddUserForm"
import UsersTable from "./UsersTable"

import * as adminActions from "../../services/adminService"
import { Col, Row, Container, Spinner, Button } from "react-bootstrap"

const UsersManagement = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  const getUsers = useCallback(() => {
    setIsLoading(true)
    setError(null)
    adminActions
      .fetchUsers()
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
      .then((data) => {
        setUsers(data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleUserAdd = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    adminActions
      .createUser(values.email, values.password)
      .catch((error) => {
        setSubmitting(false)
        setError(error.message)
      })
      .then(() => {
        setSubmitting(false)
        resetForm()
        getUsers()
      })
  }

  const handleUserDelete = (id) => {
    setIsLoading(true)
    setError(null)
    adminActions
      .deleteUser(id)
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
      .then(() => {
        getUsers()
      })
  }

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

  if (error) {
    return (
      <Container className="text-center">
        <div className="text-danger mb-2">An error occured. {error}</div>
        <Button variant="secondary" onClick={getUsers}>
          Try again
        </Button>
      </Container>
    )
  }
  return (
    <Container>
      <UsersTable users={users} onUserDelete={handleUserDelete} />
      <div className="d-flex justify-content-center">
        <AddUserForm onSubmit={handleUserAdd} styles={{ width: "500px" }} />
      </div>
    </Container>
  )
}

export default UsersManagement
