import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SystemInstance from "./SystemInstance"
import SystemLabelName from "./SystemLabelName"

const Systems = () => {
  const systems = useSelector((state) => state.containersReducer.systems)
  return (
    <div className="m-3 ">
      <SystemLabelName />
      <>
        {systems.map((s, index) => (
          <SystemInstance key={index} system={s} />
        ))}
      </>
    </div>
  )
}

export default Systems
