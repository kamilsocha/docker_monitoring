import React from "react"
import { Formik } from "formik"

import { Button, Form, Row } from "react-bootstrap"
import * as Yup from "yup"

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  director: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  file: Yup.string().required("Required"),
})

const AddMovieForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={{
        name: initialValues ? initialValues.name : "",
        director: initialValues ? initialValues.director : "",
        description: initialValues ? initialValues.description : "",
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
        ...formProps
      }) => (
        <Form onSubmit={handleSubmit} className="">
          <Form.Group>
            <Form.Label className="h4 font-weight-bold">Movie Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Movie Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name && "alert-danger"}
            />
            {touched.name && errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="h4 font-weight-bold">
              Director of the Movie
            </Form.Label>
            <Form.Control
              type="text"
              name="director"
              placeholder="Director"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.director}
              className={touched.director && errors.director && "alert-danger"}
            />
            {touched.director && errors.director && (
              <Form.Text className="text-danger">{errors.director}</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="h4 font-weight-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className={
                touched.description && errors.description && "alert-danger"
              }
            />
            {touched.description && errors.description && (
              <Form.Text className="text-danger">
                {errors.description}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="h4 font-weight-bold">Poster File</Form.Label>
            <Form.File
              name="file"
              type="file"
              onChange={(event) =>
                setFieldValue("file", event.currentTarget.files[0])
              }
              className={`${
                touched.file && errors.file && "alert-danger"
              } position-relative`}
            />
            {touched.file && errors.file && (
              <Form.Text className="text-danger">{errors.file}</Form.Text>
            )}
          </Form.Group>
          <Row className="mt-2 justify-content-center">
            <Button
              block
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default AddMovieForm
