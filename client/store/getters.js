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

const gateways = state => state.app.loading.gateways
const gateway = state => state.app.loading.gateway
const createGateway = state => state.app.loading.createGateway
const deleteGateway = state => state.app.loading.deleteGateway

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

  gateways,
  gateway,
  createGateway,
  deleteGateway,

  componententry
}
