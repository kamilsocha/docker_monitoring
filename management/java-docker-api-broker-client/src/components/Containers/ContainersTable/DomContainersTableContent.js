import React, { useState, useEffect } from "react"
import ContainersTableRow from "./ContainersTableRow"

const DomContainersTableContent = ({ domainContainers }) => {
  const [shouldDisplay, setShouldDisplay] = useState(false)
  useEffect(() => {
    if (domainContainers) {
      const { microservices, databases, guis } = domainContainers
      setShouldDisplay(
        microservices?.length || databases?.length || guis?.length
      )
    }
  }, [domainContainers])
  return (
    <>
      {shouldDisplay ? (
        <>
          <tr key="d">
            <td
              colSpan="5"
              className="pl-1 font-weight-bold"
              style={{ backgroundColor: "#d8dbe3" }}
            >
              Domain
            </td>
          </tr>
          <tr key="i-m">
            <td
              colSpan="5"
              className="pl-3 font-weight-bold"
              style={{ backgroundColor: "#e1e4eb" }}
            >
              Microservices
            </td>
          </tr>
          {domainContainers.microservices.length ? (
            domainContainers.microservices.map((c, index) => (
              <ContainersTableRow key={`i-m-${index}`} container={c} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="pl-3">
                none
              </td>
            </tr>
          )}
          <tr key="i-d">
            <td
              colSpan="5"
              className="pl-3 font-weight-bold"
              style={{ backgroundColor: "#e1e4eb" }}
            >
              Databases
            </td>
          </tr>
          {domainContainers.databases.length ? (
            domainContainers.databases.map((c, index) => (
              <ContainersTableRow key={`i-d-${index}`} container={c} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="pl-3">
                none
              </td>
            </tr>
          )}
          <tr key="i-g">
            <td
              colSpan="5"
              className="pl-3 font-weight-bold"
              style={{ backgroundColor: "#e1e4eb" }}
            >
              User interface
            </td>
          </tr>
          {domainContainers.guis.length ? (
            domainContainers.guis.map((c, index) => (
              <ContainersTableRow key={`i-g-${index}`} container={c} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="pl-3">
                none
              </td>
            </tr>
          )}
        </>
      ) : null}
    </>
  )
}

export default DomContainersTableContent
