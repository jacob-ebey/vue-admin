const baseUrl = 'https://device-platform.herokuapp.com'

export default {
  login: `${baseUrl}/api/auth/login`,
  userData: `${baseUrl}/api/users`,

  projects: `${baseUrl}/api/projects`,
  project: `${baseUrl}/api/projects/{0}`,
  createProject: `${baseUrl}/api/projects`,
  deleteProject: `${baseUrl}/api/projects/{0}`,
  addGatewayToProject: `${baseUrl}/api/projects/{0}/{1}`,
  removeGatewayFromProject: `${baseUrl}/api/projects/{0}/{1}`,
  linkConfiguration: `${baseUrl}/api/gateways/{0}/config/{1}`,

  gateways: `${baseUrl}/api/gateways`,
  gateway: `${baseUrl}/api/gateways/{0}`,
  createGateway: `${baseUrl}/api/gateways`,
  deleteGateway: `${baseUrl}/api/gateways/{0}`,

  configurations: `${baseUrl}/api/configurations`,
  configuration: `${baseUrl}/api/configurations/{0}`,
  createConfiguration: `${baseUrl}/api/configurations`,
  editConfiguration: `${baseUrl}/api/configurations/{0}`,
  deleteConfiguration: `${baseUrl}/api/configurations/{0}`,
  addDevice: `${baseUrl}/api/configurations/{0}/devices`,
  removeDevice: `${baseUrl}/api/configurations/{0}/devices/{1}`,
  editDevice: `${baseUrl}/api/configurations/{0}/devices/{1}`,
  addController: `${baseUrl}/api/configurations/{0}/controllers`,
  removeController: `${baseUrl}/api/configurations/{0}/controllers/{1}`,
  editController: `${baseUrl}/api/configurations/{0}/controllers/{1}`
}
