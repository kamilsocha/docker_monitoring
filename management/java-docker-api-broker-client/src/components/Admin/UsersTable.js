import React from "react"
import { Table } from "react-bootstrap"
import UsersTableRow from "./UsersTableRow"

const UsersTable = ({ users, onUserDelete }) => {
  return (
    <Table bordered responsive>
      <thead>
        <tr className="text-center">
          <th>Id</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UsersTableRow key={index} user={user} onUserDelete={onUserDelete} />
        ))}
      </tbody>
    </Table>
  )
}

export default UsersTable
