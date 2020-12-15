import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import * as userCatalogActions from "../../store/movieCatalog/actions"
import CenteredSpinner from "../common/CenteredSpinner"
import MovieList from "../MovieList/MovieList"

import "./allMovies.style.css"

const AllMoviesList = () => {
  const movies = useSelector((state) => state.movieCatalog.allUserMovies)

  const isLoading = useSelector((state) => state.movieCatalog.loadingAll)
  const error = useSelector((state) => state.movieCatalog.errorAll)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userCatalogActions.fetchUserAllMovies())
  }, [dispatch])

  if (isLoading) {
    return <CenteredSpinner />
  }

  if (error) {
    return <div>error</div>
  }

  return (
    <div className="list-container">
      <Container
        id="movies-container"
        className="movies-container container-horizontal-scroll"
      >
        <MovieList movies={movies} />
      </Container>
    </div>
  )
}

export default AllMoviesList
