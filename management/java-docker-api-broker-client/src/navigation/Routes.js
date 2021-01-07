import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Logout from "../components/Logout/Logout"
import HomePage from "../pages/Home/HomePage"
import ContainersPage from "../pages/Containers/ContainersPage"
import ImagesPage from "../pages/Images/ImagesPage"
import ImageDetailsPage from "../pages/Images/ImageDetailsPage"
import VolumesPage from "../pages/Volumes/VolumesPage"
import VolumeDetailsPage from "../pages/Volumes/VolumeDetailsPage"
import ZuulRoutesManagementPage from "../pages/ZuulRoutes/ZuulRoutesManagementPage"
import NetworksPage from "../pages/Networks/NetworksPage"
import NetworkDetailsPage from "../pages/Networks/NetworkDetailsPage"
import { useSelector } from "react-redux"
import { USER_ROLES } from "../constants/constants"
import AdminPage from "../pages/Admin/AdminPage"

const Routes = () => {
  const userRole = useSelector((state) => state.auth.role)
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/containers">
        <ContainersPage />
      </Route>
      <Route path="/images/:Id">
        <ImageDetailsPage />
      </Route>
      <Route path="/images">
        <ImagesPage />
      </Route>
      <Route path="/volumes/:Name">
        <VolumeDetailsPage />
      </Route>
      <Route path="/volumes">
        <VolumesPage />
      </Route>
      <Route path="/networks/:Id">
        <NetworkDetailsPage />
      </Route>
      <Route path="/networks">
        <NetworksPage />
      </Route>
      {userRole.includes(USER_ROLES.ROLE_ADMIN) && (
        <Route path="/zuul-routes">
          <ZuulRoutesManagementPage />
        </Route>
      )}
      {userRole.includes(USER_ROLES.ROLE_ADMIN) && (
        <Route path="/admin">
          <AdminPage />
        </Route>
      )}
      <Route path="/logout">
        <Logout />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
