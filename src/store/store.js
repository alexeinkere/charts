import Vuex from 'vuex'

const state = {
  user: window.localStorage.getItem('userData'),
}

const getters = {
  user: (state) => {
    return state.user;
  }
}

const mutations = {
  logged: (state, userData) => {
    state.user = window.localStorage.setItem('userData', userData)
  },
  logout: () => {
    window.localStorage.removeItem('userData');
  }
}

let store =  new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})

global.store = store

export default store