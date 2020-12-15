import React, { useState, useReducer, useCallback } from "react"
import { Row, Col, Card, Container } from "react-bootstrap"
import { Redirect } from "react-router-dom"
import styles from "./style.module.css"

import SignInForm from "../../components/SignInForm/SignInForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import { useDispatch, useSelector } from "react-redux"

import * as authActions from "../../store/auth/actions"

export const FORM_UPDATE = "FORM_UPDATE"

export const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    }
  }
  return state
}

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const isAuthenticated = useSelector((state) => state.auth.userId !== null)
  const isLoading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false,
    },
    formIsValid: false,
  })

  const handleModeChange = useCallback(() => {
    setIsSignIn((prevState) => !prevState)
  }, [setIsSignIn])

  const handleInputChange = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      })
    },
    [dispatchFormState]
  )

  const handleAuth = async (event) => {
    event.preventDefault()
    dispatch(
      authActions.auth(
        formState.inputValues.email,
        formState.inputValues.password
      )
    )
  }

  let authRedirect = null
  if (isAuthenticated) {
    console.log("should redirect")
    authRedirect = <Redirect push to="/" />
  }

  return (
    <Container>
      <Row className="h-100" style={{ minHeight: "100vh" }}>
        <Col md={{ span: 6, offset: 3 }} className="align-self-center">
          <Card className={`${styles.cardMaxWidth}`}>
            <>
              {authRedirect}
              {error && (
                <Card.Title className="text-danger text-center">
                  {error.message}
                </Card.Title>
              )}
              {isSignIn ? (
                <SignInForm
                  isLoading={isLoading}
                  onModeChange={handleModeChange}
                  onInputChange={handleInputChange}
                  onSignIn={handleAuth}
                />
              ) : (
                <SignUpForm
                  isLoading={isLoading}
                  onModeChange={handleModeChange}
                  onInputChange={handleInputChange}
                  onSignUp={handleAuth}
                />
              )}
            </>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AuthPage
