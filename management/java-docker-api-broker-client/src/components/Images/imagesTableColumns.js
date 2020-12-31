import React from "react"
import { Link } from "react-router-dom"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

import { truncate } from "../utils"

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "Id",
    Cell: ({ value, baseurl }) => {
      return (
        <OverlayTrigger placement="right" overlay={<Tooltip>{value}</Tooltip>}>
          <Link to={`${baseurl}/${value}`}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {truncate(value, 22, 19)}
            </span>
          </Link>
        </OverlayTrigger>
      )
    },
    sortType: "basic",
  },
  {
    Header: "Containers",
    accessor: "Containers",
    Cell: ({ value }) => (
      <span className="text-center">{value === -1 ? "0" : value}</span>
    ),
    disableFilters: true,
    sortType: "basic",
  },
  {
    Header: "Repo Tags",
    accessor: "RepoTags",
    Cell: ({ value }) => <span>{value[0]}</span>,
    sortType: "basic",
  },
  {
    Header: "Size",
    accessor: "Size",
    Cell: ({ value }) => <span>{Math.round(value / 1000000)} MB</span>,
    sortType: "basic",
  },
  {
    Header: "Created",
    accessor: "Created",
    Cell: ({ value }) => {
      const createdDate = new Date(new Date().getTime() - value)
      return <span>{createdDate.toLocaleString()}</span>
    },
    sortType: "basic",
  },
]
