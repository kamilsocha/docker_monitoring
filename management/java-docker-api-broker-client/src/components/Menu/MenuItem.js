import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MenuItem = ({ icon, text }) => {
  return (
    <div className="px-2 h5">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {text}
    </div>
  )
}

export default MenuItem
