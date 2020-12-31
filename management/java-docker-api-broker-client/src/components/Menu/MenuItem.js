import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MenuItem = ({ icon, text }) => {
  return (
    <div className="" style={{ fontSize: "1.2em" }}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {text}
    </div>
  )
}

export default MenuItem
