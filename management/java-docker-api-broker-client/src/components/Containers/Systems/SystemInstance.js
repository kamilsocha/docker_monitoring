import React from "react"
import SystemContainersTable from "../ContainersTable/SystemsContainersTable"

const SystemInstance = ({ system }) => {
  const { name, domainContainers, infraContainers } = system
  return (
    <div className="shadow rounded bg-light">
      <div
        className="h3 p-2 font-weight-bold rounded"
        style={{ backgroundColor: "#cacfd00" }}
      >
        {name}
      </div>
      <SystemContainersTable
        domainContainers={domainContainers}
        infraContainers={infraContainers}
      />
    </div>
  )
}

export default SystemInstance
