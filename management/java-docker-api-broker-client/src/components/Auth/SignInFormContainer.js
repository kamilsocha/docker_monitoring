import React from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import SignInForm from "./SignInForm"
import * as authActions from "../../store/actions/auth"

const SignInFormContainer = () => {
  const error = useSelector((state) => state.auth.error)

  const dispatch = useDispatch()

  const handleSignIn = (values, { setSubmitting }) => {
    setSubmitting(true)
    dispatch(authActions.auth(values.email, values.password))
  }

  const displayError = () => {
    if (error.response.status === 401) {
      return <Card.Text className="text-danger">Wrong credentials</Card.Text>
    } else {
      return <Card.Text className="text-danger">{error.message}</Card.Text>
    }
  }

  return (
    <Card className="shadow mx-auto" style={{ maxWidth: "600px" }}>
      <Card.Body>
        <Card.Title className="text-center h3 font-weight-bolder">
          Sign In
        </Card.Title>
        {error && displayError()}
        <SignInForm onSubmit={handleSignIn} />
      </Card.Body>
    </Card>
  )
}

export default SignInFormContainer
