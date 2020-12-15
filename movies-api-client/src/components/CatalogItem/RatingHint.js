import React, { useEffect, useState } from "react"
import RatingIcon from "../MovieDetails/RatingIcon"

import { range } from "../MovieDetails/Rating"

const RatingHint = ({ rating }) => {
  const [ratings, setRatings] = useState([])
  useEffect(() => {
    setRatings(range(1, 10, 1))
  }, [])

  return (
    <div>
      <div style={{ display: "flex" }} className="mb-3">
        {ratings.map((index) => (
          <RatingIcon
            key={index}
            index={index}
            rating={rating}
            hoverRating={rating}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            onSaveRating={() => {}}
            size="xs"
            fillColor="#f0ad4e"
            blankColor="#292b2c"
          />
        ))}
      </div>
    </div>
  )
}

export default RatingHint
