import React from "react"
import { Formik } from "formik"

import { Button, Form, Row, Col, Spinner } from "react-bootstrap"
import * as Yup from "yup"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please provide a valid email")
    .required("This field is required"),
  password: Yup.string().min(4).required("This field is required"),
})

const AddUserForm = ({ onSubmit, styles }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className="shadow p-3"
          style={{ ...styles }}
        >
          <div className="h4 font-weight-bold text-center">Create User</div>
          <Form.Group>
            <Form.Label className="h5 font-weight-bold">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.email && errors.email && "alert-danger"}
            />
            {touched.email && errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="h5 font-weight-bold">Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={touched.password && errors.password && "alert-danger"}
            />
            {touched.password && errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Button
                className="float-right w-25"
                style={{ minWidth: "60px" }}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Add"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default AddUserForm
