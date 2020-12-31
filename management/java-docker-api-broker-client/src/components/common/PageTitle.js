import React from "react"

const PageTitle = ({ children, title }) => {
  return (
    <div className="h1 m-2 font-weight-bold">
      <span>{title}</span>
      {children}
    </div>
  )
}

export default PageTitle
