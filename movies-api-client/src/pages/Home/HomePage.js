import React from "react"
import { Container } from "react-bootstrap"

import AllMoviesList from "../../components/Home/AllMoviesList"
import UserCatalogMoviesList from "../../components/Home/UserCatalogMoviesList"

const HomePage = () => {
  return (
    <Container>
      <div className="h1 font-weight-bolder">All movies</div>
      <AllMoviesList />
      <div className="h1 font-weight-bolder">Your rated movies</div>
      <UserCatalogMoviesList />
    </Container>
  )
}

export default HomePage
