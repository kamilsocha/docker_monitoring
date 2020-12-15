import React, { useMemo } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

import "./ratingIcon.styles.css"

const RatingIcon = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
  fillColor = "gold",
  blankColor = "black",
  size = "lg",
}) => {
  const fill = useMemo(() => {
    if (hoverRating >= index || (!hoverRating && rating >= index))
      return fillColor
    return blankColor
  }, [rating, hoverRating, index, fillColor, blankColor])

  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <FontAwesomeIcon size={size} icon={faStar} color={fill} />
    </div>
  )
}

export default RatingIcon
