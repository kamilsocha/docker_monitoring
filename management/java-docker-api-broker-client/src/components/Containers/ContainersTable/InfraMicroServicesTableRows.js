import React from "react"
import ContainersTableRow from "./ContainersTableRow"

import { findSubtypeInstances } from "./utils"

const InfraMicroServicesTableRows = ({
  containers,
  fullInfraSubtypeLabelKey,
}) => {
  const subtypeInstances = findSubtypeInstances(
    containers,
    fullInfraSubtypeLabelKey
  )
  return (
    <>
      {subtypeInstances.map((instance, index) => (
        <>
          <tr key={`${index}-1`}>
            <td
              className="pl-5 font-weight-bold"
              style={{ backgroundColor: "#efefef" }}
              colSpan="5"
            >
              {instance.name}
            </td>
          </tr>
          {instance.containers.map((c, i) => (
            <ContainersTableRow key={`${index}-${i}`} container={c} />
          ))}
        </>
      ))}
    </>
  )
}

export default InfraMicroServicesTableRows
