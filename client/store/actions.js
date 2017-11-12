import * as types from './mutation-types'
import endpoints from './endpoints'

export const toggleSidebar = ({ commit }, config) => {
  if (config instanceof Object) {
    commit(types.TOGGLE_SIDEBAR, config)
  }
}

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({ commit }, menuItem) => {
  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false
    commit(types.EXPAND_MENU, menuItem)
  }
}

export const switchEffect = ({ commit }, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}

const format = (string, ...params) => {
  let s = string
  let i = params.length
  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), params[i])
  }
  return s
}

// TODO: Add option to handle error globally
export const doLoad = ({ commit, state }, { http, whatToLoad, params, mutator, forceLoad = false }) => {
  if (http && whatToLoad) {
    if (!forceLoad && state.app.loading[whatToLoad].data) {
      return
    }

    commit(types.SET_LOADING, { whatToLoad, isLoading: true })
    commit(types.SET_LOADING_DATA, { whatToLoad, data: null })

    http({
      url: format(endpoints[whatToLoad], ...(params || [])),
      transformResponse: [(data) => {
        let parsed = JSON.parse(data)
        if (mutator) {
          parsed = mutator(parsed)
        }
        return parsed
      }]
    }).then((response) => {
      commit(types.SET_LOADING_DATA, { whatToLoad, data: response.data })
      commit(types.SET_LOADING_ERROR, { whatToLoad, error: null })
    }).catch((error) => {
      commit(types.SET_LOADING_DATA, { whatToLoad, data: null })
      commit(types.SET_LOADING_ERROR, { whatToLoad, error })
    }).then(() => {
      commit(types.SET_LOADING, { whatToLoad, isLoading: false })
    })
  }
}

export const doPost = ({ commit, state }, { http, whatToPost, params, body, mutator, callback }) => {
  if (http && whatToPost) {
    commit(types.SET_LOADING, { whatToLoad: whatToPost, isLoading: true })
    commit(types.SET_LOADING_DATA, { whatToLoad: whatToPost, data: null })

    http.post(format(endpoints[whatToPost], ...(params || [])), body, {
      emulateJSON: true,
      transformResponse: [(data) => {
        let parsed = JSON.parse(data)
        if (mutator) {
          parsed = mutator(parsed)
        }
        return parsed
      }]
    }).then((response) => {
      const data = response ? response.data : undefined

      commit(types.SET_LOADING_DATA, { whatToLoad: whatToPost, data })
      commit(types.SET_LOADING_ERROR, { whatToLoad: whatToPost, error: null })
      if (callback) {
        callback(data)
      }
    }).catch((error) => {
      console.log(error)
      let e = error
      if (error && error.response && error.response.data && error.response.data.message) {
        e = error.response.data.message
      }

      commit(types.SET_LOADING_DATA, { whatToLoad: whatToPost, data: null })
      commit(types.SET_LOADING_ERROR, { whatToLoad: whatToPost, error: e })
    }).then(() => {
      commit(types.SET_LOADING, { whatToLoad: whatToPost, isLoading: false })
    })
  }
}

export const doPush = ({ commit }, { whereToPush, subPath, item }) => {
  commit(types.DO_PUSH, { whereToPush, subPath, item })
}
