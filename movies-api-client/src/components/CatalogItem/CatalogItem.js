import React from "react"

import { placeholderImage } from "../../constants/constants"

import "./catalogItem.style.css"
import RatingHint from "./RatingHint"

const CatalogItem = ({ item }) => {
  const { posterUri, rating } = item

  return (
    <div className="my-5 mx-2">
      <div className="image-container d-flex justify-content-start mx-2 shadow">
        <img src={posterUri} alt={placeholderImage} className="catalog-item" />
        <div className="overlay d-flex align-items-center justify-content-center">
          <RatingHint rating={rating} />
        </div>
      </div>
    </div>
  )
}

export default CatalogItem
