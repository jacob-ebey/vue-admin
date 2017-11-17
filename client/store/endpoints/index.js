import prod from './prod'

const isDev = process.env.NODE_ENV === 'development'

export default {
  projects: '/api/projects',
  project: '/api/projects/{0}',
  createProject: '/api/projects',
  deleteProject: '/api/projects/{0}',
  addGatewayToProject: '/api/projects/{0}/{1}',
  removeGatewayFromProject: '/api/projects/{0}/{1}',
  linkConfiguration: 'api/gateways/{0}/config/{1}',

  gateways: '/api/gateways',
  gateway: '/api/gateways/{0}',
  createGateway: '/api/gateways',
  deleteGateway: '/api/gateways/{0}',

  configurations: '/api/configurations',
  configuration: '/api/configurations/{0}',
  createConfiguration: '/api/configurations',
  editConfiguration: '/api/configurations/{0}',
  deleteConfiguration: '/api/configurations/{0}',
  addDevice: '/api/configurations/{0}/devices',
  removeDevice: '/api/configurations/{0}/devices/{1}',
  editDevice: '/api/configurations/{0}/devices/{1}',
  addController: '/api/configurations/{0}/controllers',
  removeController: '/api/configurations/{0}/controllers/{1}',
  editController: '/api/configurations/{0}/controllers/{1}',

  // Add prod endpoints if not dev
  ...(!isDev ? prod : {})
}
