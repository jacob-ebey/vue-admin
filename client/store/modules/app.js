import * as types from '../mutation-types'

const getProperty = (obj, path) => {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : undefined
  }, obj)
}

const createLoadObject = () => ({
  isLoading: false,
  data: null,
  error: null
})

const createLoading = () => ({
  projects: createLoadObject(),
  project: createLoadObject(),
  createProject: createLoadObject(),
  deleteProject: createLoadObject(),
  addGatewayToProject: createLoadObject(),
  removeGatewayFromProject: createLoadObject(),
  linkConfiguration: createLoadObject(),

  gateways: createLoadObject(),
  gateway: createLoadObject(),
  gatewayLogs: createLoadObject(),
  createGateway: createLoadObject(),
  deleteGateway: createLoadObject(),
  unregisterGateway: createLoadObject(),

  configurations: createLoadObject(),
  configuration: createLoadObject(),
  createConfiguration: createLoadObject(),
  editConfiguration: createLoadObject(),
  deleteConfiguration: createLoadObject(),
  addDevice: createLoadObject(),
  removeDevice: createLoadObject(),
  editDevice: createLoadObject(),
  addController: createLoadObject(),
  removeController: createLoadObject(),
  editController: createLoadObject()
})

const state = {
  loading: createLoading(),
  token: null,
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.SET_TOKEN] (state, token) {
    state.token = token
  },

  [types.LOGOUT] (state) {
    state.loading = createLoading()
  },

  [types.SET_LOADING] (state, { whatToLoad, isLoading }) {
    state.loading[whatToLoad].isLoading = isLoading
  },

  [types.SET_LOADING_DATA] (state, { whatToLoad, data }) {
    state.loading[whatToLoad].data = data
  },

  [types.SET_LOADING_ERROR] (state, { whatToLoad, error }) {
    state.loading[whatToLoad].error = error
  },

  [types.SET_PROPERTY] (state, { whereToSet, callback }) {
    const obj = state.loading[whereToSet]
    callback(obj)
  },

  [types.DO_PUSH] (state, { whereToPush, subPath, item, beginning = false }) {
    if (beginning) {
      state.loading[whereToPush].data = [
        item,
        ...state.loading[whereToPush].data
      ]
      return
    }

    let obj = state.loading[whereToPush].data
    if (subPath) {
      obj = getProperty(obj, subPath)
    }
    obj.push(item)
  },

  [types.DO_SPLICE] (state, { whereToSplice, subPath, start, deleteCount, newItems }) {
    let obj = state.loading[whereToSplice].data
    if (subPath) {
      obj = getProperty(obj, subPath)
    }
    obj.splice(start, deleteCount, ...(newItems || []))
  }
}

export default {
  state,
  mutations
}
