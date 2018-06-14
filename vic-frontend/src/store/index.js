import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    sports: []
  },
  mutations: {
    connect (state, user) {
      state.user = user
    },
    disconnect (state) {
      state.user = null
    },
    setSports (state, sports) {
      state.sports = sports
    },
    setUserEntries (state, entries) {
      state.user.entries = entries
    },
    setUserSports (state, sports) {
      state.user.sports = sports
    }
  }
})
