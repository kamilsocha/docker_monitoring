import React from "react"
import { useSelector } from "react-redux"
import SystemInstance from "./SystemInstance"

const Systems = () => {
  const systems = useSelector((state) => state.containersReducer.systems)
  return (
    <div className="my-3 py-3">
      {systems.map((s, index) => (
        <SystemInstance key={index} system={s} />
      ))}
    </div>
  )
}

export default Systems
