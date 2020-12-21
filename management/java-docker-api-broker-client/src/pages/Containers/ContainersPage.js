import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import ContainersNav from "../../components/Containers/ContainersNav/ContainersNav"
import Systems from "../../components/Containers/Systems/Systems"
import * as containersActions from "../../store/actions/containers"

import ContainerDetailsBoard from "../../components/Containers/Details/ContainerDetailsBoard"
import NoSystemContainers from "../../components/Containers/NoSystemContainers/NoSystemContainers"
import AllContainers from "../../components/Containers/AllContainers/AllContainers"
import { useCallback } from "react"
import { Button, Spinner } from "react-bootstrap"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ContainersPage = () => {
  const { url } = useRouteMatch()
  const isLoading = useSelector((state) => state.containersReducer.loading)
  const error = useSelector((state) => state.containersReducer.error)

  const dispatch = useDispatch()

  const handleContainersFetch = useCallback(() => {
    dispatch(containersActions.fetchContainers())
  }, [dispatch])

  useEffect(() => {
    handleContainersFetch()
  }, [handleContainersFetch])

  return (
    <>
      <div className="h1 m-2 font-weight-bold">
        <span>Containers</span>
        <Button variant="light" onClick={handleContainersFetch}>
          <FontAwesomeIcon icon={faSync} />
        </Button>
      </div>
      <div></div>
      {error && <div className="text-danger">Error fetching containers</div>}
      <ContainersNav baseurl={url} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path={`${url}/systems`}>
            <Systems />
          </Route>
          <Route path={`${url}/non-system`}>
            <NoSystemContainers />
          </Route>
          <Route path={`${url}/all`}>
            <AllContainers />
          </Route>
          <Route path={`${url}/:Id`}>
            <ContainerDetailsBoard />
          </Route>
          <Redirect from={`${url}`} to={`${url}/systems`} />
        </Switch>
      )}
    </>
  )
}

export default ContainersPage
