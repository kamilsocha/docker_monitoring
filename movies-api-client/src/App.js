import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AuthPage from "./pages/Auth/AuthPage"
import MainPage from "./pages/Main/MainPage"
import * as authActions from "./store/auth/actions"
import CenteredSpinner from "./components/common/CenteredSpinner"

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.userId !== null)
  const isLoading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.authCheckState())
  }, [dispatch])

  if (isLoading) {
    console.log("return spinner")
    return <CenteredSpinner animation="border" variant="dark" />
  }

  return isAuthenticated ? <MainPage /> : <AuthPage />
}

export default App
