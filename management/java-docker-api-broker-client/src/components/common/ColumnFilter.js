import React from "react"
import { FormControl, InputGroup } from "react-bootstrap"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <InputGroup style={{ maxWidth: "500px" }}>
      <InputGroup.Prepend className="px-2 bg-secondary text-white rounded">
        <FontAwesomeIcon icon={faSearch} className="my-auto" />
      </InputGroup.Prepend>
      <FormControl
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </InputGroup>
  )
}

export default ColumnFilter
