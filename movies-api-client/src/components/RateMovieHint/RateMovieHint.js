import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGrinStars } from "@fortawesome/free-solid-svg-icons"

const RateMovieHint = () => {
  return (
    <>
      <span className="mr-2 text-white">Rate The Movie</span>
      <FontAwesomeIcon icon={faGrinStars} color="white" />
    </>
  )
}

export default RateMovieHint
