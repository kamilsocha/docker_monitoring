import React from "react"
import { Link } from "react-router-dom"
import StateCell from "./StateCell"

const ContainersTableRow = ({ container }) => {
  const { Names, State, Id, Image, Created, Ports } = container

  const createdDate = new Date(new Date().getTime() - Created)

  return (
    <tr>
      <td>
        <Link to={`/containers/${Id}`}>{Names[0]}</Link>
      </td>
      <StateCell State={State} />
      <td>{Image}</td>
      <td>{createdDate.toLocaleString()}</td>
      <td>
        {Ports.map((p, index) => (
          <span key={index}>
            {p.PublicPort ? `${p.PublicPort}:${p.PrivatePort}` : "-"}
          </span>
        ))}
      </td>
    </tr>
  )
}

export default ContainersTableRow
