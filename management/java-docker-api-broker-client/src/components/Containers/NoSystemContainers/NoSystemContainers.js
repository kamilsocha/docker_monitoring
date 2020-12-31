import React from "react"
import { useSelector } from "react-redux"
import ContainersTable from "../ContainersTable/ContainersTable"

const NoSystemContainers = () => {
  const containers = useSelector(
    (state) => state.containersReducer.noSystemContainers
  )
  return (
    <div className="my-3">
      {containers && <ContainersTable containers={containers} />}
    </div>
  )
}

export default NoSystemContainers
