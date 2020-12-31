import React from "react"

import ContainersTableRow from "./ContainersTableRow"
import InfraMicroServicesTableRows from "./InfraMicroServicesTableRows"

const InfraContainersTableContent = ({ infraContainers }) => {
  return (
    <>
      <tr key="i">
        <td
          colSpan="5"
          className="pl-1 font-weight-bold"
          style={{ backgroundColor: "#d8dbe3" }}
        >
          Infrastructural
        </td>
      </tr>
      <tr key="d-m">
        <td
          colSpan="5"
          className="pl-3 font-weight-bold"
          style={{ backgroundColor: "#e1e4eb" }}
        >
          Microservices
        </td>
      </tr>
      {infraContainers?.microservices?.length ? (
        <InfraMicroServicesTableRows
          containers={infraContainers.microservices}
          fullInfraSubtypeLabelKey={infraContainers.fullInfraSubtypeLabelKey}
        />
      ) : (
        <tr>
          <td colSpan="5" className="pl-3">
            none
          </td>
        </tr>
      )}
      <tr key="d-d">
        <td
          colSpan="5"
          className="pl-3 font-weight-bold"
          style={{ backgroundColor: "#e1e4eb" }}
        >
          Databases
        </td>
      </tr>
      {infraContainers?.databases?.length ? (
        infraContainers.databases.map((c, index) => (
          <ContainersTableRow key={`i-m-${index}`} container={c} />
        ))
      ) : (
        <tr>
          <td colSpan="5" className="pl-3">
            none
          </td>
        </tr>
      )}
      <tr key="d-g">
        <td
          colSpan="5"
          className="pl-3 font-weight-bold"
          style={{ backgroundColor: "#e1e4eb" }}
        >
          User interface
        </td>
      </tr>
      {infraContainers?.guis?.length ? (
        infraContainers.guis.map((c, index) => (
          <ContainersTableRow key={`i-m-${index}`} container={c} />
        ))
      ) : (
        <tr>
          <td colSpan="5" className="pl-3">
            none
          </td>
        </tr>
      )}
    </>
  )
}

export default InfraContainersTableContent
