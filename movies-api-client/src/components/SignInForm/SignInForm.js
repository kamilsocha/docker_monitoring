import React from "react"
import Form from "react-bootstrap/Form"
import { Row, Col, Button, Spinner } from "react-bootstrap"

import styles from "./style.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import Input from "../common/Input"

const SignInForm = (props) => {
  return (
    <Form className={`p-5 ${styles.shadow}`}>
      <Row>
        <Col>
          <h2 className="text-center font-weight-bolder">Sign in</h2>
          <Input
            id="email"
            label="Email"
            type="text"
            required
            email
            errorMessage="Please enter a valid email."
            onInputChange={props.onInputChange}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required
            errorMessage="Please enter a valid password."
            onInputChange={props.onInputChange}
            initialValue=""
          />
          <Button
            variant="link"
            className="float-left pl-0"
            onClick={props.onModeChange}
          >
            Don't have an account yet? Sign up
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
                Sign In
                <FontAwesomeIcon className="ml-2" icon={faSignInAlt} />
              </>
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SignInForm
