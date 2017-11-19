const isDev = process.env.NODE_ENV !== 'production'

import devEndpoints from './endpoints.dev'
import prodEndpoints from './endpoints.prod'

let endpoints = devEndpoints

if (!isDev) {
  endpoints = {
    ...endpoints,
    ...prodEndpoints
  }
}

export default endpoints
