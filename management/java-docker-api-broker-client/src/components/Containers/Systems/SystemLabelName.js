import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"
import { Form } from "react-bootstrap"

const validationSchema = Yup.object({
  labelName: Yup.string().required("Can't change to empty value."),
})

const SystemLabelName = () => {
  const systemLabelName = useSelector(
    (state) => state.containersReducer.systemLabelName
  )
  const [systemLabelNameInput, setSystemLabelNameInput] = useState("")
  useEffect(() => {
    setSystemLabelNameInput(systemLabelName)
  }, [systemLabelName])

  const handleSubmit = (values) => {}

  return (
    <Formik
      initialValues={{ labelName: systemLabelNameInput }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form inline onSubmit={handleSubmit} className="bg-light p-2">
          <Form.Label className="h5 font-weight-bold mr-2">
            Label to distinguish systems
          </Form.Label>
          <Form.Control
            type="text"
            name="labelName"
            placeholder="system label"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.labelName}
            className={touched.labelName && errors.labelName && "alert-danger"}
          />
          {touched.labelName && errors.labelName && (
            <Form.Text className="text-danger">{errors.labelName}</Form.Text>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default SystemLabelName
