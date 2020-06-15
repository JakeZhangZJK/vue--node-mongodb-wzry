import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTopBarShow: true,
    isNavBarShow: true,
    isChangeTopBarBg: false
  },
  mutations: {
    hideTopBar(state) {
      state.isTopBarShow = false
    },
    showTopBar(state) {
      state.isTopBarShow = true
    },
    hideNavBbar(state) {
      state.isNavBarShow = false
    },
    showNavBbar(state) {
      state.isNavBarShow = true
    },
    changeTopBarBg(state) {
      state.isChangeTopBarBg = true
    }
  }
})
