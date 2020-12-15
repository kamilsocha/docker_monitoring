import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { Button, Form, ButtonGroup } from "react-bootstrap"

const RomanToDecimalForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        roman: "",
      }}
      validationSchema={Yup.object({
        roman: Yup.string().required("Required"),
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
              Conver Roman to Decimal
            </Form.Label>
            <Form.Control
              type="text"
              name="roman"
              placeholder="Roman Number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.roman}
              className={touched.roman && errors.roman && "alert-danger"}
            />
            {touched.roman && errors.roman && (
              <Form.Text className="text-danger">{errors.roman}</Form.Text>
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

export default RomanToDecimalForm
