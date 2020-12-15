import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"

const NavbarMenuItem = ({ icon, text }) => {
  return (
    <div className="px-2">
      {text}
      <FontAwesomeIcon icon={icon} className={`ml-2`} />
    </div>
  )
}

NavbarMenuItem.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string.isRequired,
}

export default NavbarMenuItem
