import React, { useState } from "react"
import {
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import DecimalToRomanForm from "../../components/Converter/DecimalToRomanForm"
import RomanToDecimalForm from "../../components/Converter/RomanToDecimalForm"
import axios from "../../axios-orders"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEraser } from "@fortawesome/free-solid-svg-icons"

import "./converterPage.style.css"

const ConverterPage = () => {
  const [romanResult, setRomanResult] = useState("")
  const [decimalResult, setDecimalResult] = useState("")

  const handleSubmitDecimalToRoman = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const response = await axios.get("/converter-service/converter/toRoman", {
      params: { decimal: values.decimal },
    })
    const data = response?.data
    setRomanResult(data)
    setSubmitting(false)
  }

  const handleSubmitRomanToDecimal = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const response = await axios.get("/converter-service/converter/toDecimal", {
      params: { roman: values.roman.toUpperCase() },
    })
    const data = response?.data
    setDecimalResult(data)
    setSubmitting(false)
  }

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <DecimalToRomanForm onSubmit={handleSubmitDecimalToRoman} />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Roman Form</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={romanResult} disabled />
            <InputGroup.Prepend>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Clear</Tooltip>}
              >
                <InputGroup.Text
                  className="click-icon"
                  onClick={() => setRomanResult("")}
                >
                  <FontAwesomeIcon icon={faEraser} />
                </InputGroup.Text>
              </OverlayTrigger>
            </InputGroup.Prepend>
          </InputGroup>
        </Col>
      </Row>
      <br />
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <RomanToDecimalForm onSubmit={handleSubmitRomanToDecimal} />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Decimal Form</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={decimalResult} disabled />
            <InputGroup.Prepend>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Clear</Tooltip>}
              >
                <InputGroup.Text onClick={() => setDecimalResult("")}>
                  <FontAwesomeIcon className="click-icon" icon={faEraser} />
                </InputGroup.Text>
              </OverlayTrigger>
            </InputGroup.Prepend>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ConverterPage
