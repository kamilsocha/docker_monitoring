import React from "react"
import { Form } from "react-bootstrap"

import "./imagesFilters.style.css"

const ImagesFilters = ({ showAll, setShowAll, dangling, setDangling }) => {
  return (
    <div className="d-flex">
      <Form.Group className="mx-2 my-1">
        <Form.Check
          className="m-checkbox"
          type="checkbox"
          label="Show All"
          checked={showAll}
          onChange={() => setShowAll(!showAll)}
        />
      </Form.Group>
      <Form.Group className="mx-2 my-1">
        <Form.Check
          className="m-checkbox"
          type="checkbox"
          label="Dangling"
          checked={dangling}
          onChange={() => setDangling(!dangling)}
        />
      </Form.Group>
    </div>
  )
}

export default ImagesFilters
