export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

const findLabelFullName = (containers, systemLabelName) => {
  let systemLabelFullName = ""
  for (const c of containers) {
    systemLabelFullName = Object.keys(c?.Labels).find((l) =>
      l.includes(systemLabelName)
    )
    if (systemLabelFullName !== undefined && systemLabelFullName !== null) break
  }
  return systemLabelFullName
}

const designateSystemLabels = (containers, systemLabelName) => {
  const systemLabelFullName = findLabelFullName(containers, systemLabelName)
  const allLabels = containers.map((c) => c.Labels[systemLabelFullName])
  return {
    systemLabelFullName,
    systemLabels: [...new Set(allLabels)].filter(Boolean),
  }
}

export const distinguishSystems = (containers, systemLabelName) => {
  const { systemLabelFullName, systemLabels } = designateSystemLabels(
    containers,
    systemLabelName
  )
  let systems = []
  for (const l of systemLabels) {
    systems = [
      ...systems,
      {
        name: l,
        containers: containers.filter(
          (c) => c.Labels[systemLabelFullName] === l
        ),
      },
    ]
  }
  return {
    systems,
    noSystemContainers: containers.filter(
      (c) => c.Labels[systemLabelFullName] === undefined
    ),
    systemLabelFullName,
  }
}
