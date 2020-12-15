import React from "react"
import { NavLink } from "react-router-dom"
import { Nav } from "react-bootstrap"
import "./containersNav.css"

const ContainersNav = ({ baseurl }) => {
  return (
    <div className="mx-auto mc-nav" style={{ maxWidth: "800px" }}>
      <Nav variant="pills" fill className="h5">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            exact={true}
            to={`${baseurl}`}
            className="text-dark font-weight-bold"
            activeClassName="mc-active"
          >
            Systems
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to={`${baseurl}/non-system`}
            className="text-dark font-weight-bold"
            activeClassName="mc-active"
          >
            Non System
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to={`${baseurl}/all`}
            className="text-dark font-weight-bold"
            activeClassName="mc-active"
          >
            All
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default ContainersNav
