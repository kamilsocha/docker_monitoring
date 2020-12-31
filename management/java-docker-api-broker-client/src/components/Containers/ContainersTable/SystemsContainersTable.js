import React from "react"
import { Table } from "react-bootstrap"
import InfraContainersTableContent from "./InfraContainersTableContent"
import DomContainersTableContent from "./DomContainersTableContent"

const SystemContainersTable = ({ domainContainers, infraContainers }) => {
  return (
    <Table bordered responsive style={{ width: "96%" }} className="mx-auto">
      <thead>
        <tr className="text-center">
          <th className="align-middle">Name</th>
          <th className="align-middle">State</th>
          <th className="align-middle">Image</th>
          <th className="align-middle">Created</th>
          <th className="align-middle">Published Ports</th>
        </tr>
      </thead>
      <tbody>
        <InfraContainersTableContent infraContainers={infraContainers} />
        <tr key="break">
          <td colSpan="5"></td>
        </tr>
        <DomContainersTableContent domainContainers={domainContainers} />
      </tbody>
    </Table>
  )
}

export default SystemContainersTable
