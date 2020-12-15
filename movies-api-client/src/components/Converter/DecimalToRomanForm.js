import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { Button, ButtonGroup, Form } from "react-bootstrap"

const DecimalToRomanForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        decimal: "",
      }}
      validationSchema={Yup.object({
        decimal: Yup.number()
          .min(0, "Must be positive number.")
          .max(3999, "Must be smaller than 3999.")
          .required("Required"),
      })}
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
        ...formProps
      }) => (
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group>
            <Form.Label className="w-100 h3 font-weight-bold text-center">
              Convert Decimal to Roman
            </Form.Label>
            <Form.Control
              type="text"
              name="decimal"
              placeholder="Decimal Number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.decimal}
              className={touched.decimal && errors.decimal && "alert-danger"}
            />
            {touched.decimal && errors.decimal && (
              <Form.Text className="text-danger">{errors.decimal}</Form.Text>
            )}
            <ButtonGroup className="mt-2 w-100">
              <Button
                className="float-left"
                variant="danger"
                type="button"
                disabled={isSubmitting}
                onClick={formProps.handleReset}
              >
                Reset
              </Button>
              <Button
                className="float-right"
                variant="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Convert
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Form>
      )}
    </Formik>
  )
}

export default DecimalToRomanForm
