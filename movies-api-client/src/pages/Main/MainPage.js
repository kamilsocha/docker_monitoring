import React from "react"
import { Container } from "react-bootstrap"
import NavbarMenu from "../../navigation/NavbarMenu"
import Routes from "../../navigation/routes"

import styles from "./style.module.css"

const MainPage = () => {
  return (
    <>
      <NavbarMenu classes={styles.topBar} />
      <Container fluid className={styles.mainContainer}>
        <Routes />
      </Container>
      {/* <div className={styles.mainContainer}>
        <Routes />
      </div> */}
    </>
  )
}

export default MainPage
