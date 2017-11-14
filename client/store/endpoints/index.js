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
  deleteConfiguration: '/api/configurations/{0}',

  // Add prod endpoints if not dev
  ...(!isDev ? prod : {})
}
