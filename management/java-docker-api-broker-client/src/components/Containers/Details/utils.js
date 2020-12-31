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

export const findType = (container, typeLabel) => {
  return container.Labels[
    Object.keys(container.Labels).find((l) => l.endsWith(typeLabel))
  ]
}

export const findSubtype = (container, subtypeLabel) => {
  return container.Labels[
    Object.keys(container.Labels).find((l) => l.endsWith(subtypeLabel))
  ]
}
