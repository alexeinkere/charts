import Vuex from 'vuex'

const state = {
  user: window.localStorage.getItem('user'),
  charts: window.localStorage.getItem('charts'),
  jwt: window.localStorage.getItem('jwt')
}

const getters = {
  user: (state) => {
    return state.user
  },
  charts: (state) => {
    return state.charts
  },
  jwt: (state) => {
    return state.jwt
  }
}

const mutations = {
  saveDataUser: (state, user) => {
    state.user = user
    window.localStorage.setItem('user', user)
  },
  saveJWT: (state, jwt) => {
    state.jwt = jwt
    window.localStorage.setItem('jwt', jwt)
  },
  logout: () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('jwt')
  },
  updateChart: (charts) => {
    window.localStorage.setItem('charts', charts)
  },
}

let store =  new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
})

global.store = store

export default store