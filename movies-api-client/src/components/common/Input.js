import React, { useReducer, useEffect } from "react"
import Form from "react-bootstrap/Form"

const INPUT_CHANGE = "INPUT_CHANGE"
const INPUT_BLUR = "INPUT_BLUR"

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      }
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      }
    default:
      return state
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initallyValid,
    touched: false,
  })

  const { onInputChange, id } = props

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid)
    }
  }, [id, inputState, onInputChange])

  const handleTextChange = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid = true
    if (props.required && text.trim().length === 0) {
      isValid = false
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false
    }
    if (props.min != null && +text < props.min) {
      isValid = false
    }
    if (props.max != null && +text > props.max) {
      isValid = false
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
  }

  const handleBlur = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <Form.Group>
      <Form.Label className="font-weight-bold">{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        onBlur={handleBlur}
        onChange={(event) => handleTextChange(event.target.value)}
      />
      {!inputState.isValid && inputState.touched && (
        <Form.Text className="text-danger">{props.errorMessage}</Form.Text>
      )}
    </Form.Group>
  )
}

export default Input
