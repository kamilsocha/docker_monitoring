import React from "react"
import { Link } from "react-router-dom"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

import { truncate } from "../utils"

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "Name",
    sortType: "basic",
  },
  {
    Header: "Id",
    accessor: "Id",
    Cell: ({ value, baseurl }) => {
      return value ? (
        <OverlayTrigger placement="right" overlay={<Tooltip>{value}</Tooltip>}>
          <Link to={`${baseurl}/${value}`}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {truncate(value, 22, 19)}
            </span>
          </Link>
        </OverlayTrigger>
      ) : (
        <span>-</span>
      )
    },
    sortType: "basic",
  },
  {
    Header: "Driver",
    accessor: "Driver",
    sortType: "basic",
  },
  {
    Header: "Labels",
    accessor: "Labels",
    Cell: ({ value }) => {
      return (
        value &&
        Object.keys(value).map((label, index) => (
          <OverlayTrigger
            key={index}
            placement="top"
            overlay={<Tooltip>{`${label} : ${value[label]}`}</Tooltip>}
          >
            <div>{`${label} : ${value[label]}`}</div>
          </OverlayTrigger>
        ))
      )
    },
    sortType: "basic",
  },
  {
    Header: "Containers",
    accessor: "Containers",
    Cell: ({ value }) => <span>{value ? value.length : "0"}</span>,
    sortType: "basic",
  },
]
