// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'

import store from '../store'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#07C160',
            secondary: '#576b95',
            tertiary: colors.shades.white,
            accent: colors.shades,
            error: colors.red,
            grey: colors.grey,
            chart: colors.teal.base,
            mp_grey: '#616161'
          },
          dark: {
            primary: colors.blueGrey,
            secondary: colors.teal,
            tertiary: colors.shades,
            accent: colors.shades,
            error: colors.red,
            grey: colors.grey,
            chart: colors.blueGrey.lighten3
          },
        },
        dark: store.getters.dark,
        options: {
          customProperties: true,
        },
    },
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    lang: {
        locales: { zhHans },
        current: 'zhHans',
  },
})
