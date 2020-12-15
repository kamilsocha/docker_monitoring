import React from "react"
import Form from "react-bootstrap/Form"
import { Row, Col, Button, Spinner } from "react-bootstrap"

import styles from "./style.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"

const SignUpForm = (props) => {
  return (
    <Form className={`p-5 ${styles.shadow}`}>
      <Row>
        <Col>
          <h2 className="text-center font-weight-bolder">Sign up</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" disabled />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              disabled
            />
          </Form.Group>
          <Button
            variant="link"
            className="float-left pl-0"
            onClick={props.onModeChange}
          >
            Do you have an account? Sign in!
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            className="float-right"
            onClick={props.onSignIn}
          >
            {props.isLoading ? (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <>
                Sign Up
                <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
              </>
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SignUpForm
