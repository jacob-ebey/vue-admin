import prod from './prod'

const isDev = process.env.NODE_ENV === 'development'

export default {
  projects: 'https://jsonplaceholder.typicode.com/posts',
  project: 'https://jsonplaceholder.typicode.com/posts/{0}',
  gateways: 'https://jsonplaceholder.typicode.com/posts',
  ...(!isDev ? prod : {})
}
