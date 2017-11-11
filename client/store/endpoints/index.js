import prod from './prod'

const isDev = process.env.NODE_ENV === 'development'

export default {
  projects: '/api/projects',
  project: '/api/projects/{0}',
  gateways: 'https://jsonplaceholder.typicode.com/posts',
  ...(!isDev ? prod : {})
}
