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
import CreateContainer from "../../components/Containers/CreateContainer/CreateContainer"
import PageTitle from "../../components/common/PageTitle"
import Page from "../../components/common/Page"
import PageContent from "../../components/common/PageContent"
import InspectContainer from "../../components/Containers/InspectContainer/InspectContainer"
import ContainerLogs from "../../components/Containers/ContainerLogs/ContainerLogs"

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
    <Page fluid="true">
      <PageTitle title="Containers">
        <Button variant="light" onClick={handleContainersFetch}>
          <FontAwesomeIcon icon={faSync} spin={isLoading} />
        </Button>
      </PageTitle>
      <PageContent>
        <ContainersNav baseurl={url} />
        {error && (
          <div className="mt-3 text-danger">Error fetching containers</div>
        )}
        {isLoading ? (
          <div className="mt-3 text-center">
            <Spinner animation="border" />
          </div>
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
            <Route path={`${url}/create`}>
              <CreateContainer />
            </Route>
            <Route path={`${url}/:Id/inspect`}>
              <InspectContainer />
            </Route>
            <Route path={`${url}/:Id/logs`}>
              <ContainerLogs />
            </Route>
            <Route path={`${url}/:Id`}>
              <ContainerDetailsBoard />
            </Route>
            <Redirect from={`${url}`} to={`${url}/systems`} />
          </Switch>
        )}
      </PageContent>
    </Page>
  )
}

export default ContainersPage
