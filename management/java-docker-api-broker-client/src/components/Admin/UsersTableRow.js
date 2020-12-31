import React from "react"
import { Button } from "react-bootstrap"
import { USER_ROLES } from "../../constants/constants"

const UsersTableRow = ({ user, onUserDelete }) => {
  const { id, email, role } = user
  return (
    <tr className="text-center">
      <td>{id}</td>
      <td>{email}</td>
      <td>
        <Button
          variant="danger"
          onClick={() => onUserDelete(id)}
          disabled={role.name.includes(USER_ROLES.ROLE_ADMIN)}
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default UsersTableRow
