import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import ContainersNav from "../../components/Containers/ContainersNav/ContainersNav"
import Systems from "../../components/Containers/Systems/Systems"
import * as containersActions from "../../store/actions/containers"

import ContainerDetailsBoard from "../../components/Containers/Details/ContainerDetailsBoard"

const ContainersPage = (props) => {
  const { url } = useRouteMatch()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(containersActions.fetchContainers())
  }, [dispatch])

  return (
    <>
      <div>
        <div className="h1 m-2 font-weight-bold">Containers</div>
      </div>
      <ContainersNav baseurl={url} />
      <Switch>
        <Route exact path={`${url}/systems`}>
          <Systems />
        </Route>
        <Route path={`${url}/non-system`}>
          <div>non system</div>
        </Route>
        <Route path={`${url}/all`}>
          <div>all</div>
        </Route>
        <Route path={`${url}/:Id`}>
          <ContainerDetailsBoard />
        </Route>
        <Redirect from={`${url}`} to={`${url}/systems`} />
      </Switch>
    </>
  )
}

export default ContainersPage
