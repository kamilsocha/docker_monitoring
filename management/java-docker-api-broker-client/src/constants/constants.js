export const containerStates = {
  CREATED: "created",
  RUNNING: "running",
  STOPPED: "stopped",
  EXITED: "exited",
}

export const serviceTypes = {
  INFRA: "infra",
  DOMAIN: "dom",
}

export const serviceFullSubtype = {
  ms: "microservice",
  db: "database",
  ui: "scs(gui)",
  apigateway: "apigateway",
  discovery: "discovery",
  config: "configuration service",
  other: "other(none)",
}
