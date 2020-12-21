import React from "react"
import { Table } from "react-bootstrap"
import ContainersTableRow from "./ContainersTableRow"

const ContainersTable = ({ containers }) => {
  return (
    <Table hover striped bordered responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>State</th>
          <th>Image</th>
          <th>Created</th>
          <th>Published Ports</th>
        </tr>
      </thead>
      <tbody>
        {containers.map((c) => (
          <ContainersTableRow key={c.Id} container={c} />
        ))}
      </tbody>
    </Table>
  )
}

export default ContainersTable
