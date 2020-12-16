import React from "react"

import { containerStates } from "../../../constants/constants"

const StateCell = ({ State }) => {
  let c = ""
  switch (State) {
    case containerStates.RUNNING:
      c = "bg-success"
      break
    case containerStates.CREATED:
      c = "bg-primary"
      break
    case containerStates.STOPPED:
      c = "bg-warn"
      break
    case containerStates.EXITED:
      c = "bg-danger"
      break
    default:
      break
  }
  return (
    <td>
      <span className={`${c} p-2 rounded text-light`}>{State}</span>
    </td>
  )
}

export default StateCell
