import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import CatalogList from "../CatalogList/CatalogList"
import CenteredSpinner from "../common/CenteredSpinner"

import * as userCatalogActions from "../../store/movieCatalog/actions"
import { useDispatch, useSelector } from "react-redux"

import "./allMovies.style.css"

const UserCatalogMoviesList = () => {
  const movies = useSelector((state) => state.movieCatalog.userCatalogMovies)

  const isLoading = useSelector((state) => state.movieCatalog.loadingCatalog)
  const error = useSelector((state) => state.movieCatalog.errorCatalog)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userCatalogActions.fetchUserCatalogMovies())
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
        <CatalogList movies={movies} />
      </Container>
    </div>
  )
}

export default UserCatalogMoviesList
