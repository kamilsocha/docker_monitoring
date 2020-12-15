import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import Logout from "../components/Logout/Logout"
import AdminPage from "../pages/Admin/AdminPage"
import HomePage from "../pages/Home/HomePage"
import MovieDetails from "../components/MovieDetails/MovieDetails"
import AllMoviesPage from "../pages/AllMovies/AllMoviesPage"
import UserCatalogPage from "../pages/UserCatalog/UserCatalogPage"
import ConverterPage from "../pages/Converter/ConverterPage"

const Routes = () => {
  const isAuthenticated = useSelector((state) => state.auth.userId !== null)

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/all-movies/:id">
        <AllMoviesPage />
      </Route>
      <Route path="/all-movies">
        <AllMoviesPage />
      </Route>

      <Route exact path="/user-catalog">
        <UserCatalogPage />
      </Route>
      <Route exact path="/user-catalog/:id">
        <UserCatalogPage />
      </Route>

      <Route path="/converter">
        <ConverterPage />
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      {/* <Route exact path="/">
        <HomePage />
      </Route> */}
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
