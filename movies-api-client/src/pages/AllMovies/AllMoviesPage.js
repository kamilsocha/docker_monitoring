import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import MovieDetails from "../../components/MovieDetails/MovieDetails"
import MovieList from "../../components/MovieList/MovieList"

import * as userCatalogActions from "../../store/movieCatalog/actions"

const AllMoviesPage = () => {
  const { id } = useParams()
  const movies = useSelector((state) => state.movieCatalog.allUserMovies)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const isLoading = useSelector((state) => state.movieCatalog.loadingAll)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userCatalogActions.fetchUserAllMovies())
  }, [dispatch])

  useEffect(() => {
    if (id && movies) {
      setSelectedMovie(movies?.find((m) => m.id === parseInt(id)))
    }
  }, [id, setSelectedMovie, movies])

  const handleMovieRate = (movie, rating) => {
    dispatch(userCatalogActions.addMovieToUserCatalog(movie, rating))
  }

  return (
    <Container fluid>
      <Row>
        <Col md="6">
          <MovieList movies={movies} />
        </Col>
        <Col md="6" className="mt-0">
          <div className="h-100">
            {selectedMovie && (
              <MovieDetails
                movie={selectedMovie}
                onButtonClick={handleMovieRate}
                isLoading={isLoading}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AllMoviesPage
