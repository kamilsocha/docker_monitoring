import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CatalogList from "../../components/CatalogList/CatalogList"
import MovieDetails from "../../components/MovieDetails/MovieDetails"

import * as userCatalogActions from "../../store/movieCatalog/actions"

const UserCatalogPage = () => {
  const { id } = useParams()
  const movies = useSelector((state) => state.movieCatalog.userCatalogMovies)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const isLoading = useSelector((state) => state.movieCatalog.loadingCatalog)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userCatalogActions.fetchUserCatalogMovies())
  }, [dispatch])

  useEffect(() => {
    if (id && movies) {
      setSelectedMovie(movies?.find((m) => m.movieId === parseInt(id)))
    }
  }, [id, setSelectedMovie, movies])

  const handleMovieRateUpdate = (movie, rating) => {
    dispatch(userCatalogActions.updateMovieRating(movie, rating))
  }

  return (
    <Container fluid>
      <Row>
        <Col md="6">
          <CatalogList movies={movies} />
        </Col>
        <Col md="6" className="mt-0">
          <div className="h-100">
            {selectedMovie && (
              <MovieDetails
                movie={selectedMovie}
                onButtonClick={handleMovieRateUpdate}
                buttonText="Update Your Rating"
                isLoading={isLoading}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default UserCatalogPage
