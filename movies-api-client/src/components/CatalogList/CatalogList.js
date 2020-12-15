import React from "react"
import { Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import CatalogItem from "../CatalogItem/CatalogItem"

const CatalogList = ({ movies }) => {
  return (
    <Row>
      {movies &&
        movies.map((movie) => (
          <>
            <Link to={`/user-catalog/${movie.movieId}`} key={movie.movieId}>
              <CatalogItem item={movie} />
            </Link>
          </>
        ))}
    </Row>
  )
}

export default CatalogList
