import * as types from '../mutation-types'

const createLoadObject = () => ({
  isLoading: false,
  data: undefined,
  error: undefined
})

const state = {
  username: null,
  loading: {
    projects: createLoadObject(),
    project: createLoadObject(),
    gateways: createLoadObject()
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

  [types.SET_USERNAME] (state, username) {
    state.username = username
  }
}

export default {
  state,
  mutations
}
