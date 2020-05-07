import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        drawer: sessionStorage.getItem('drawer') === '1' ? true : false,
        dark: sessionStorage.getItem('current_theme') === 'dark' ? true : false,
        current_community: sessionStorage.getItem('current_community') ? JSON.parse(sessionStorage.getItem('current_community')) : null,
        snackbar: {
            show: false,
            message: '',
            color: 'primary',
            timeout: 5000
        },
        dialog: {
            show: false,
            title: '',
            text: '',
            sign: ''
        },
        mp_sign: null,
    },

    getters: {
        // 这里是get方法
        user: state => state.user,
        drawer: state => state.drawer,
        dark: state => state.dark,
        current_community: state => state.current_community,
        snackbar: state => state.snackbar,
        dialog: state => state.dialog,
        mp_sign: state => state.mp_sign,
    },

    mutations: {
        // 这里是同步 set 方法，通过 commit 方式触发 this.$store.commit('setToken', token)
        setUser(state, data) {
            state.user = data
        },
        setDrawer(state, data) {
            state.drawer = data
        },
        setDarkTheme(state, data) {
            state.dark = data
        },
        setCurrentCommunity(state, data) {
            state.current_community = data
        },
        setSnackbar(state, data) {
            state.snackbar = data
        },
        switchSnackbar(state, bool) {
            state.snackbar.show = bool
        },
        setDialog(state, data) {
            state.dialog = data
        },
        setMpSign(state, data) {
            state.mp_sign = data
        }
    },

    actions: {
        // 这里是异步方法，可以在组件中使用 this.$store.dispatch('actionSetUserInfo', user_info) 分发调用 mutation 方法进行 set
        actionSetUser({commit}, data) {
            commit('setUser', data)
        },
        actionSetDrawer({commit}, data) {
            commit('setDrawer', data)
            let sign = '1';
            if (!data) {
                sign = '0';
            }
            sessionStorage.setItem('drawer', sign)
        },
        actionSetDarkTheme({ commit }, data) {
            commit('setDarkTheme', data)
            let theme = data ? 'dark' : 'light';
            sessionStorage.setItem('current_theme', theme)
        },
        actionSetCurrentCommunity({ commit }, data) {
            commit('setCurrentCommunity', data)
            sessionStorage.setItem('current_community', JSON.stringify(data))
        },
        actionSetMpSign({ commit }, data) {
          return new Promise(resolve => {
            commit('setMpSign', data)
            resolve()
          })
        }
    },

    modules: {
        // 分组模块，当 state 参数过多可以单独分组建立文件，从这里引入
    }
})
