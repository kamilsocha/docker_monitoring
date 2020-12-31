export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

const findSystemLabelFullName = (containers, systemNameLabelKey) => {
  let systemNameFullLabelKey = ""
  for (const c of containers) {
    systemNameFullLabelKey = Object.keys(c?.Labels).find((l) =>
      l.endsWith(systemNameLabelKey)
    )
    if (systemNameFullLabelKey !== undefined && systemNameFullLabelKey !== null)
      break
  }
  return systemNameFullLabelKey
}

const designateSystemLabels = (containers, systemNameLabelKey) => {
  const fullKey = findSystemLabelFullName(containers, systemNameLabelKey)
  const allLabels = containers.map((c) => c.Labels[fullKey])
  return {
    systemNameFullLabelKey: fullKey,
    systemLabels: [...new Set(allLabels)].filter(Boolean),
  }
}

const findFullLabelKey = (containers, labelKey) => {
  let fullLabelKey = ""
  for (const c of containers) {
    fullLabelKey = Object.keys(c?.Labels).find((l) => l.endsWith(labelKey))
    if (fullLabelKey !== undefined && fullLabelKey !== null) break
  }
  return fullLabelKey
}

const findInfraServices = (
  containers,
  fullTypeLabelKey,
  labelKeys,
  labelValues
) => {
  const infraContainers = containers.filter(
    (c) => c.Labels[fullTypeLabelKey] === labelValues.infraTypeLabelValue
  )

  const fullSubtypeLabelKey = `${fullTypeLabelKey}.${labelValues.infraTypeLabelValue}`

  return {
    microservices: infraContainers.filter(
      (c) =>
        c.Labels[fullSubtypeLabelKey] ===
        labelValues.microServiceSubtypeLabelValue
    ),
    databases: infraContainers.filter(
      (c) =>
        c.Labels[fullSubtypeLabelKey] ===
        labelValues.databaseServiceSubtypeLabelValue
    ),
    guis: infraContainers.filter(
      (c) =>
        c.Labels[fullSubtypeLabelKey] ===
        labelValues.guiServiceSubtypeLabelValue
    ),
    fullInfraSubtypeLabelKey: `${fullSubtypeLabelKey}${labelKeys.serviceSubtypeLabelKey}`,
  }
}

const findDomainServices = (containers, fullTypeLabelKey, labelValues) => {
  const domainContainers = containers.filter(
    (c) => c.Labels[fullTypeLabelKey] === labelValues.domainTypeLabelValue
  )

  const fullSubtypeLabelKey = `${fullTypeLabelKey}.${labelValues.domainTypeLabelValue}`

  return {
    microservices: domainContainers.filter(
      (c) =>
        c.Labels[fullSubtypeLabelKey] ===
        labelValues.microServiceSubtypeLabelValue
    ),
    databases: domainContainers.filter(
      (c) =>
        c.Labels[fullSubtypeLabelKey] ===
        labelValues.databaseServiceSubtypeLabelValue
    ),
    guis: domainContainers.filter(
      (c) =>
        c.Labels[fullSubtypeLabelKey] ===
        labelValues.guiServiceSubtypeLabelValue
    ),
  }
}

export const distinguishSystems = (containers, labelKeys, labelValues) => {
  const { systemNameFullLabelKey, systemLabels } = designateSystemLabels(
    containers,
    labelKeys.systemNameLabelKey
  )
  let systems = []
  for (const l of systemLabels) {
    const systemInstanceContainers = containers.filter(
      (c) => c.Labels[systemNameFullLabelKey] === l
    )
    const fullTypeLabelKey = findFullLabelKey(
      containers,
      labelKeys.serviceTypeLabelKey
    )
    systems = [
      ...systems,
      {
        name: l,
        containers: systemInstanceContainers,
        infraContainers: findInfraServices(
          systemInstanceContainers,
          fullTypeLabelKey,
          labelKeys,
          labelValues
        ),
        domainContainers: findDomainServices(
          systemInstanceContainers,
          fullTypeLabelKey,
          labelValues
        ),
        fullTypeLabelKey,
      },
    ]
  }
  return {
    systems,
    noSystemContainers: containers.filter(
      (c) => c.Labels[systemNameFullLabelKey] === undefined
    ),
    systemNameFullLabelKey,
  }
}
