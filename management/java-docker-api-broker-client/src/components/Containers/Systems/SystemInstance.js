import React from "react"

const SystemInstance = ({ system }) => {
  const { name, containers } = system
  return <div>{name}</div>
}

export default SystemInstance
