import prod from './prod'

const isDev = process.env.NODE_ENV === 'development'

export default {
  projects: '/api/projects',
  project: '/api/projects/{0}',
  createProject: '/api/projects',
  addGatewayToProject: '/api/projects/{0}/{1}',

  gateways: '/api/gateways',
  gateway: '/api/gateways/{0}',
  createGateway: '/api/gateways',
  ...(!isDev ? prod : {})
}
