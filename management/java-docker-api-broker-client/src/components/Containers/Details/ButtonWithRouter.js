import React from "react"
import { withRouter } from "react-router-dom"
import { Button } from "react-bootstrap"

const ButtonWithRouter = withRouter(
  ({ children, history, onClick, variant, disabled, classes }) => {
    const handleClick = () => {
      onClick()
      history.push("/containers")
    }
    return (
      <Button
        variant={variant}
        onClick={handleClick}
        disabled={disabled}
        className={classes}
      >
        {children}
      </Button>
    )
  }
)

export default ButtonWithRouter
