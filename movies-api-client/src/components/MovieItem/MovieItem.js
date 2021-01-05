import React from "react"
import { placeholderImage } from "../../constants/constants"
import "./movieItem.style.css"
import RateMovieHint from "../RateMovieHint/RateMovieHint"

import { OverlayTrigger, Popover } from "react-bootstrap"

import { apiUri } from "../../axios-orders"

const MovieItem = ({ item }) => {
  const { name, posterUri } = item

  const popover = (
    <Popover>
      <Popover.Content>Have you seen {name}? Rate it!</Popover.Content>
    </Popover>
  )

  return (
    <>
      <div className="my-5 mx-2">
        <div className="image-container d-flex justify-content-start mx-2 shadow">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 250 }}
            overlay={popover}
          >
            <img
              src={`${apiUri}/movie-service${posterUri}`}
              alt={placeholderImage}
              className="movie-item"
            />
          </OverlayTrigger>
          <div className="overlay d-flex align-items-center justify-content-center">
            <RateMovieHint />
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieItem
