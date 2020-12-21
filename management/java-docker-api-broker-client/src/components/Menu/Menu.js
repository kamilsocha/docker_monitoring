import React from "react"
import { NavLink } from "react-router-dom"
import { Image, Nav, Navbar } from "react-bootstrap"
import {
  faBezierCurve,
  faBoxOpen,
  faDatabase,
  faHome,
  faImages,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import MenuItem from "./MenuItem"
import "./menuStyles.css"

import dac_logo from "../../assets/dac_logo.png"

const Menu = () => {
  return (
    <Navbar variant="dark">
      <Nav
        variant="pills"
        defaultActiveKey="/"
        className="flex-column w-100 h-100"
        // style={{ minHeight: "100vh" }}
      >
        <Navbar.Brand className="text-center w-100 my-2">
          <Image src={dac_logo} className="dac_logo mx-auto d-block" />
          <div className="h3 my-1">Docker API Client</div>
        </Navbar.Brand>
        <Nav.Item>
          <Nav.Link as={NavLink} exact={true} to="/" activeClassName="m-active">
            <MenuItem text="Home" icon={faHome} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/containers" activeClassName="m-active">
            <MenuItem text="Containers" icon={faBoxOpen} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/images" activeClassName="m-active">
            <MenuItem text="Images" icon={faImages} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/volumes" activeClassName="m-active">
            <MenuItem text="Volumes" icon={faDatabase} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/zuul-routes" activeClassName="m-active">
            <MenuItem text="Zuul Routes" icon={faBezierCurve} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Link as={NavLink} to="/logout">
          <MenuItem text="Logout" icon={faSignOutAlt} />
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Menu
