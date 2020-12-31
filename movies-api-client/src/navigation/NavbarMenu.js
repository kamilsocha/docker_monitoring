import React from "react"
import { NavLink } from "react-router-dom"
import { Nav, Navbar } from "react-bootstrap"
import NavbarMenuItem from "./NavbarMenuItem"
import {
  faHome,
  faUserShield,
  faFilm,
  faUserLock,
  faArchway,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"

const NavbarMenu = (props) => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={{ ...props.classes }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact={true} to="/">
            <NavbarMenuItem text="Home" icon={faHome} />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/all-movies">
            <NavbarMenuItem text="All Movies" icon={faFilm} />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/user-catalog">
            <NavbarMenuItem text="Your Catalog" icon={faUserLock} />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/converter">
            <NavbarMenuItem text="Converter" icon={faArchway} />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin">
            <NavbarMenuItem text="Admin" icon={faUserShield} />
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/logout">
            <NavbarMenuItem text="Logout" icon={faSignOutAlt} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarMenu
