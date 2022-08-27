import Vuex from 'vuex'

const state = {
  user: JSON.parse(window.localStorage.getItem('user')),
  charts: JSON.parse(window.localStorage.getItem('charts')),
  jwt: window.localStorage.getItem('jwt'),
  tableSelected: []
}

const mutations = {
  saveDataUser: (state, user) => {
    state.user = user
    window.localStorage.setItem('user', JSON.stringify(user))
  },
  saveJWT: (state, jwt) => {
    state.jwt = jwt
    window.localStorage.setItem('jwt', jwt)
  },
  logout: () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('jwt')
    state.user = null
    state.jwt = null
  },
  updateChart: (state, charts) => {
    state.charts = charts
    window.localStorage.setItem('charts', JSON.stringify(charts))
  },
}

let store =  new Vuex.Store({
  state: state,
  mutations: mutations,
})

global.store = store

export default store