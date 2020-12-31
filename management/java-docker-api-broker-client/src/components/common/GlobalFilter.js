import React, { useState } from "react"
import { useAsyncDebounce } from "react-table"
import { FormControl, InputGroup } from "react-bootstrap"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const GlobalFilter = ({ filter, setFilter, children }) => {
  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 1000)

  return (
    <InputGroup className="my-2">
      <InputGroup.Prepend className="px-2 bg-secondary text-white rounded">
        <span className="my-auto">
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Search
        </span>
      </InputGroup.Prepend>
      <FormControl
        style={{ maxWidth: "500px" }}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
      {children}
    </InputGroup>
  )
}
