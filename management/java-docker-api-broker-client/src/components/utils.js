export const truncate = (value, maxLength, lengthToShow) => {
  return value.length > maxLength
    ? value.substring(0, lengthToShow) + "..."
    : value
}
