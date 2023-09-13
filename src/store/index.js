import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: null
  },
  getters: {
    storedForm(state) {
      return state.form
    }
  },
  mutations: {
    updateForm(state, form) {
      state.form = form
    }
  },
  actions: {
    updateForm({ commit }, form) {
      commit('updateForm', form)
    }
  }
})
