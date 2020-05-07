<template>
    <v-app-bar
        app
        clipped-left
        flat
        height="80"
    >
        <v-app-bar-nav-icon v-if="show_menu" @click.stop="switchDrawer" />
        <v-toolbar-title v-if="this.$route.path === '/'" class="logo text--primary">公众号管理</v-toolbar-title>
        <a v-else @click="toList"><v-toolbar-title class="logo text--primary">公众号管理</v-toolbar-title></a>

        <v-spacer></v-spacer>
        <div class="pr-1">
            <v-btn title="切换暗色/亮色主题" icon @click.stop="switchTheme">
                <v-icon class="display-1">mdi-brightness-{{icon_light}}</v-icon>
            </v-btn>

            <v-btn title="退出登录" icon @click.stop="logout">
                <v-icon class="display-1">mdi-logout</v-icon>
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
    // import { logout } from '@/api'
  export default {
    name: 'TopHeader',
    props: {
      show_menu: {
        type: Boolean,
        default() {
          return true
        }
      },
    },
    data() {
      return {
        project: null
      }
    },
    mounted() {},
    computed: {
      icon_light() {
        return this.$store.getters.dark ? 4 : 7;
      }
    },
    methods: {
      switchDrawer() {
        let value = this.$store.getters.drawer;
        this.$VM.$emit('switchDrawer', !value);
      },
      switchTheme() {
        let theme = this.$store.getters.dark;
        this.$store.dispatch('actionSetDarkTheme', !theme);
        location.reload()
      },
      logout() {
        // logout().then(response => {
        //   location.href = location.origin + '/login'
        // })
      },
      toList() {
        this.$router.push({
          path: '/'
        });
      }
    }
  }
</script>

<style scoped>
  .logo {
    display: block;
    font-size: 1.5em;
    margin: 0 .2em;
    font-weight: 400;
  }
</style>
