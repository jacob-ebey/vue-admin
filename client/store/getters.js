const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items
const loading = state => state.app.loading

const projects = state => state.app.loading.projects
const project = state => state.app.loading.project
const createProject = state => state.app.loading.createProject
const deleteProject = state => state.app.loading.deleteProject
const addGatewayToProject = state => state.app.loading.addGatewayToProject
const removeGatewayFromProject = state => state.app.loading.removeGatewayFromProject
const linkConfiguration = state => state.app.loading.linkConfiguration

const gateways = state => state.app.loading.gateways
const gateway = state => state.app.loading.gateway
const createGateway = state => state.app.loading.createGateway
const deleteGateway = state => state.app.loading.deleteGateway

const configurations = state => state.app.loading.configurations
const configuration = state => state.app.loading.configuration
const createConfiguration = state => state.app.loading.createConfiguration
const deleteConfiguration = state => state.app.loading.deleteConfiguration
const addDevice = state => state.app.loading.addDevice
const removeDevice = state => state.app.loading.removeDevice
const addController = state => state.app.loading.addController
const removeController = state => state.app.loading.removeController

const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  loading,

  projects,
  project,
  createProject,
  deleteProject,
  addGatewayToProject,
  removeGatewayFromProject,
  linkConfiguration,

  gateways,
  gateway,
  createGateway,
  deleteGateway,

  configurations,
  configuration,
  createConfiguration,
  deleteConfiguration,
  addDevice,
  removeDevice,
  addController,
  removeController,

  componententry
}
