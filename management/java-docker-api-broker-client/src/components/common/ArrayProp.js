import React from "react"
import ObjectProp from "./ObjectProp"

const ArrayProp = ({ parentIndex, array }) => {
  return array.map((el, index) => {
    if (typeof el === "object" && el !== null) {
      return (
        <ObjectProp key={index} index={`${parentIndex}a${index}`} object={el} />
      )
    } else if (Array.isArray(el)) {
      return (
        <ArrayProp key={index} index={`${parentIndex}a${index}`} array={el} />
      )
    } else {
      return (
        <span key={index} index={`${parentIndex}a${index}`}>
          {el.toString()},{" "}
        </span>
      )
    }
  })
}

export default ArrayProp
