import React from "react"
import { Form } from "react-bootstrap"

import "./volumesFilters.style.css"

const VolumesFilters = ({ dangling, setDangling }) => {
  return (
    <>
      <Form.Group className="mx-2 my-1">
        <Form.Check
          className="m-checkbox"
          type="checkbox"
          label="Dangling"
          checked={dangling}
          onChange={() => setDangling(!dangling)}
        />
      </Form.Group>
    </>
  )
}

export default VolumesFilters
