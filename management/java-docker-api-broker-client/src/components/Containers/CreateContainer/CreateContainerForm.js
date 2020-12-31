import React from "react"
import { Form } from "react-bootstrap"
import { Formik, Field, FieldArray } from "formik"

export const CreateContainerForm = () => {
  return (
    <Formik
      initialValues={{
        friends: [
          { name: "jared", age: 1 },
          { name: "jared", age: 1 },
          { name: "jared", age: 1 },
        ],
      }}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
        }, 500)
      }
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
        <Form>
          <Form.Group>
            <Form.Label className="font-weight-bold">Label</Form.Label>
            <FieldArray
              name="friends"
              render={(arrayHelpers) => (
                <div>
                  {values.friends.map((friend, index) => (
                    <div key={index}>
                      <Form.Control
                        name={`${friend}.name`}
                        value={friend.name}
                      />
                      <Field name={`values.friends.${index}.age`} />

                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ name: "", age: "" })}
                  >
                    +
                  </button>
                </div>
              )}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  )
}
