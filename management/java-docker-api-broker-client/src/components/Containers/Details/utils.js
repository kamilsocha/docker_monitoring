export const findLabelValue = (container, label) => {
  return container.Labels[
    Object.keys(container.Labels).find((l) => l.includes(label))
  ]
}

export const findServiceName = (container, systemLabel) => {
  return container.Labels[
    Object.keys(container.Labels).find(
      (l) => l.includes("name") && !l.includes(systemLabel)
    )
  ]
}

export const findType = (container) => {
  return container.Labels[
    Object.keys(container.Labels).find((l) => l.includes("type"))
  ]
}

export const findSubtype = (container, type) => {
  return container.Labels[
    Object.keys(container.Labels).find((l) => l.includes(`${type}.subtype`))
  ]
}
