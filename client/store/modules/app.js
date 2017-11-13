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

const state = {
  loading: {
    projects: createLoadObject(),
    project: createLoadObject(),
    createProject: createLoadObject(),
    deleteProject: createLoadObject(),
    addGatewayToProject: createLoadObject(),
    removeGatewayFromProject: createLoadObject(),

    gateways: createLoadObject(),
    gateway: createLoadObject(),
    createGateway: createLoadObject(),
    deleteGateway: createLoadObject(),

    configurations: createLoadObject()
  },
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

  [types.SET_LOADING] (state, { whatToLoad, isLoading }) {
    state.loading[whatToLoad].isLoading = isLoading
  },

  [types.SET_LOADING_DATA] (state, { whatToLoad, data }) {
    state.loading[whatToLoad].data = data
  },

  [types.SET_LOADING_ERROR] (state, { whatToLoad, error }) {
    state.loading[whatToLoad].error = error
  },

  [types.DO_PUSH] (state, { whereToPush, subPath, item }) {
    let obj = state.loading[whereToPush].data
    if (subPath) {
      obj = getProperty(obj, subPath)
    }
    obj.push(item)
  },

  [types.DO_SPLICE] (state, { whereToSplice, subPath, start, deleteCount }) {
    let obj = state.loading[whereToSplice].data
    if (subPath) {
      obj = getProperty(obj, subPath)
    }
    obj.splice(start, deleteCount)
  }
}

export default {
  state,
  mutations
}
