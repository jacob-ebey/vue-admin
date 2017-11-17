export default {
  login: 'https://device-platform.herokuapp.com/api/auth/login',
  userData: 'https://device-platform.herokuapp.com/api/users',

  projects: 'https://device-platform.herokuapp.com/api/projects',
  project: 'https://device-platform.herokuapp.com/api/projects/{0}',
  createProject: 'https://device-platform.herokuapp.com/api/projects',
  deleteProject: 'https://device-platform.herokuapp.com/api/projects/{0}',
  addGatewayToProject: 'https://device-platform.herokuapp.com/api/projects/{0}/{1}',
  removeGatewayFromProject: 'https://device-platform.herokuapp.com/api/projects/{0}/{1}',
  linkConfiguration: 'https://device-platform.herokuapp.com/api/gateways/{0}/config/{1}',

  gateways: 'https://device-platform.herokuapp.com/api/gateways',
  gateway: 'https://device-platform.herokuapp.com/api/gateways/{0}',
  createGateway: 'https://device-platform.herokuapp.com/api/gateways',
  deleteGateway: 'https://device-platform.herokuapp.com/api/gateways/{0}',

  configurations: 'https://device-platform.herokuapp.com/api/configurations',
  configuration: 'https://device-platform.herokuapp.com/api/configurations/{0}',
  createConfiguration: 'https://device-platform.herokuapp.com/api/configurations',
  editConfiguration: 'https://device-platform.herokuapp.com/api/configurations/{0}',
  deleteConfiguration: 'https://device-platform.herokuapp.com/api/configurations/{0}',
  addDevice: 'https://device-platform.herokuapp.com/api/configurations/{0}/devices',
  removeDevice: 'https://device-platform.herokuapp.com/api/configurations/{0}/devices/{1}',
  editDevice: 'https://device-platform.herokuapp.com/api/configurations/{0}/devices/{1}',
  addController: 'https://device-platform.herokuapp.com/api/configurations/{0}/controllers',
  removeController: 'https://device-platform.herokuapp.com/api/configurations/{0}/controllers/{1}',
  editController: 'https://device-platform.herokuapp.com/api/configurations/{0}/controllers/{1}'
}
