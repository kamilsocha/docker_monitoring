import React from "react"
import { Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import MovieItem from "../MovieItem/MovieItem"

const MovieList = ({ movies }) => {
  return (
    <Row>
      {movies &&
        movies.map((movie) => (
          <>
            <Link
              to={`/all-movies/${movie.id || movie.movieId}`}
              key={movie.id ? movie.id : movie.movieId}
            >
              <MovieItem item={movie} />
            </Link>
          </>
        ))}
    </Row>
  )
}

export default MovieList
