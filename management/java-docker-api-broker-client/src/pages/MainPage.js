import React from "react"
import { Container } from "react-bootstrap"
import Menu from "../components/Menu/Menu"
import Routes from "../navigation/Routes"

import "./mainPage.style.css"

const MainPage = () => {
  return (
    <>
      <Menu classes="topBar" />
      <Container fluid className="mainContainer">
        <Routes />
      </Container>
    </>
  )
}

export default MainPage
