import React from "react"
import { NavLink } from "react-router-dom"
import { Nav, Navbar } from "react-bootstrap"
import {
  faBoxOpen,
  faDatabase,
  faHome,
  faImages,
  faNetworkWired,
  faProjectDiagram,
  faSignOutAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons"
import MenuItem from "./MenuItem"
import "./menuStyles.css"

import dac_logo from "../../assets/dac_logo.png"
import { useSelector } from "react-redux"
import { USER_ROLES } from "../../constants/constants"

const Menu = (props) => {
  const userRole = useSelector((state) => state.auth?.role)
  return (
    <Navbar
      variant="dark"
      bg="dark"
      expand="xl"
      className={{ ...props.classes }}
    >
      <Navbar.Brand className="text-center">
        <img
          src={dac_logo}
          width="54px"
          height="54px"
          className="m-0 p-0"
          alt=""
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={NavLink}
            exact={true}
            to="/"
            activeClassName="m-active rounded"
          >
            <MenuItem text="Home" icon={faHome} />
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/containers"
            activeClassName="m-active rounded"
          >
            <MenuItem text="Containers" icon={faBoxOpen} />
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/images"
            activeClassName="m-active rounded"
          >
            <MenuItem text="Images" icon={faImages} />
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/volumes"
            activeClassName="m-active rounded"
          >
            <MenuItem text="Volumes" icon={faDatabase} />
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/networks"
            activeClassName="m-active rounded"
          >
            <MenuItem text="Networks" icon={faNetworkWired} />
          </Nav.Link>
          {userRole?.includes(USER_ROLES.ROLE_ADMIN) && (
            <Nav.Link
              as={NavLink}
              to="/zuul-routes"
              activeClassName="m-active rounded"
            >
              <MenuItem text="Proxy Routes" icon={faProjectDiagram} />
            </Nav.Link>
          )}
          {userRole?.includes(USER_ROLES.ROLE_ADMIN) && (
            <Nav.Link
              as={NavLink}
              to="/admin"
              activeClassName="m-active rounded"
            >
              <MenuItem text="Admin" icon={faUserShield} />
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/logout">
            <MenuItem text="Logout" icon={faSignOutAlt} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
