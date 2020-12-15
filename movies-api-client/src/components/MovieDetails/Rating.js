import React, { useEffect, useState } from "react"

import RatingIcon from "./RatingIcon"

export const range = (from, to, step = 1) => {
  let length = Math.floor((to - from) / step) + 1
  return Array(length)
    .fill()
    .map((_, idx) => from + idx * step)
}

const Rating = ({
  onSaveRating,
  initRating,
  iconSize,
  fillColor,
  blankColor,
  ratingScale,
}) => {
  const [rating, setRating] = useState(initRating ? initRating : 0)
  const [hoverRating, setHoverRating] = useState(0)
  const [ratings, setRatings] = useState([])

  useEffect(() => {
    setRatings(range(1, 10, 1))
  }, [ratingScale])

  const onMouseEnter = (index) => {
    setHoverRating(index)
  }
  const onMouseLeave = () => {
    setHoverRating(0)
  }
  const handleSaveRating = (index) => {
    setRating(index)
    onSaveRating(index)
  }

  return (
    <div style={{ display: "flex" }} className="mb-3">
      {ratings &&
        ratings.map((index) => (
          <RatingIcon
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={handleSaveRating}
            size="1x"
            fillColor={fillColor}
            blankColor={blankColor}
          />
        ))}
    </div>
  )
}

export default Rating
