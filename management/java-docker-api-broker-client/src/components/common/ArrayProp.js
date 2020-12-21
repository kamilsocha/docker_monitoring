import React from "react"
import ObjectProp from "./ObjectProp"

const ArrayProp = ({ parentIndex, array }) => {
  return (
    <div>
      {array.map((el, index) => {
        if (typeof el === "object" && el !== null) {
          return <ObjectProp index={`${parentIndex}a${index}`} object={el} />
        } else {
          return (
            <span index={`${parentIndex}a${index}`}>{el.toString()}, </span>
          )
        }
      })}
    </div>
  )
}

export default ArrayProp
