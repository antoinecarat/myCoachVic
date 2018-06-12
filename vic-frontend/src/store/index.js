import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    entries: [],
    sports: []
  },
  mutations: {
    connect (state, user) {
      state.user = user
    },
    disconnect (state) {
      state.user = null
    }
  }
})
