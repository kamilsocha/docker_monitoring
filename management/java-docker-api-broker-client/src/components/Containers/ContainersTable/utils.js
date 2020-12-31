export const findSubtypeInstances = (microServiceContainers, label) => {
  const allLabelValues = microServiceContainers.map((c) => c.Labels[label])
  const distinctSubtypes = [...new Set(allLabelValues)].filter(Boolean)
  let subtypeInstances = []
  for (let subtype of distinctSubtypes) {
    let containers = microServiceContainers.filter(
      (c) => c.Labels[label] === subtype
    )
    subtypeInstances = [
      ...subtypeInstances,
      {
        name: subtype,
        containers,
      },
    ]
  }
  return subtypeInstances
}
