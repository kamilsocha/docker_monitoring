import React from "react"
import { useSelector } from "react-redux"

import ContainersTable from "../ContainersTable/ContainersTable"

const AllContainers = () => {
  const containers = useSelector(
    (state) => state.containersReducer.allContainers
  )
  return (
    <div className="my-3">
      {containers && <ContainersTable containers={containers} />}
    </div>
  )
}

export default AllContainers
