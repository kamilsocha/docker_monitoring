import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Logout from "../components/Logout/Logout"
import HomePage from "../pages/Home/HomePage"
import ContainersPage from "../pages/Containers/ContainersPage"
import ImagesPage from "../pages/Images/ImagesPage"
import VolumesPage from "../pages/Volumes/VolumesPage"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/containers">
        <ContainersPage />
      </Route>
      <Route path="/images">
        <ImagesPage />
      </Route>
      <Route path="/volumes">
        <VolumesPage />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
