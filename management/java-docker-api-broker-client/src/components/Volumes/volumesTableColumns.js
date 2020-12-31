import React from "react"
import { Link } from "react-router-dom"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

import { truncate } from "../utils"

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "Name",
    Cell: ({ value, baseurl }) => {
      return (
        <OverlayTrigger placement="right" overlay={<Tooltip>{value}</Tooltip>}>
          <Link to={`${baseurl}/${value}`}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {truncate(value, 30, 27)}
            </span>
          </Link>
        </OverlayTrigger>
      )
    },
    sortType: "basic",
  },

  {
    Header: "Mountpoint",
    accessor: "Mountpoint",
    Cell: ({ value }) => {
      return (
        <OverlayTrigger placement="right" overlay={<Tooltip>{value}</Tooltip>}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {truncate(value, 30, 27)}
          </span>
        </OverlayTrigger>
      )
    },
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
            <div>
              {truncate(label, 30, 27)} : {truncate(value[label], 30, 27)}
            </div>
          </OverlayTrigger>
        ))
      )
    },
    sortType: "basic",
  },
  {
    Header: "Driver",
    accessor: "Driver",
    sortType: "basic",
  },
]
