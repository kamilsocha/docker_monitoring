import React from "react"
import { withRouter } from "react-router-dom"
import { Button } from "react-bootstrap"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BackButton = ({ history, text, styles }) => {
  return (
    <Button
      variant="link"
      style={{
        marginLeft: "3px",
        textDecoration: "none",
        color: "black",
        ...styles,
      }}
      onClick={() => history.goBack()}
    >
      <FontAwesomeIcon
        className={`${text ? "mr-2" : ""}`}
        icon={faChevronLeft}
        color="black"
        size="lg"
      />
      {text}
    </Button>
  )
}

export default withRouter(BackButton)
