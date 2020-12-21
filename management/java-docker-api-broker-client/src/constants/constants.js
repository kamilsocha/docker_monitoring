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

export const actuatorServiceSubtypes = [
  "ms",
  "apigateway",
  "discovery",
  "config",
]

export const serviceFullSubtype = {
  ms: "microservice",
  db: "database",
  ui: "scs(gui)",
  apigateway: "apigateway",
  discovery: "discovery",
  config: "configuration service",
  other: "other(none)",
}

export const allowedActuatorLinks = [
  "archaius",
  "beans",
  "caches",
  "conditions",
  "configprops",
  "env",
  "features",
  "health",
  "heapdump",
  "info",
  "loggers",
  "mappings",
  "metrics",
  "prometheus",
  "scheduledTasks",
  "seviceRegistry",
]

export const swaggerRoutes = [
  "/v2/api-docs",
  "/swagger-resources/**",
  "/configuration/**",
  "/swagger-ui/",
  "/webjars/**",
]
