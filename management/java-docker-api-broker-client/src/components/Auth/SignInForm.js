import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { Form, Button, Spinner } from "react-bootstrap"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please provide a valid email")
    .required("This field is required"),
  password: Yup.string().min(4).required("This field is required"),
})

const SignInForm = ({ onSubmit }) => {
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
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="name@domain.com"
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
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              type="password"
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
          <Form.Group className="my-1">
            <Button
              className="float-right"
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  )
}

export default SignInForm
