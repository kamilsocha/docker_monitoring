import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ContainersNav from "../../components/Containers/ContainersNav/ContainersNav"
import Systems from "../../components/Containers/Systems/Systems"
import * as containersActions from "../../store/actions/containers"

const ContainersPage = (props) => {
  const { url } = useRouteMatch()

  const isLoading = useSelector((state) => state.containersReducer.loading)
  const error = useSelector((state) => state.containersReducer.error)

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
        <Route exact path={`${url}/`}>
          <Systems />
        </Route>
        <Route path={`${url}/non-system`}>
          <div>non system</div>
        </Route>
        <Route path={`${url}/all`}>
          <div>all</div>
        </Route>
      </Switch>
    </>
  )
}

export default ContainersPage
