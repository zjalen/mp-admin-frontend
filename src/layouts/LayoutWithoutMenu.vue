<template>
    <v-app>
        <top-header :show_menu="false"></top-header>
        <v-content class="ma-3">
            <router-view></router-view>
        </v-content>
        <snack-bar-toast></snack-bar-toast>
        <my-dialog></my-dialog>
        <bottom-footer></bottom-footer>
    </v-app>
</template>

<script>
  import TopHeader from './TopHeader'
  import SnackBarToast from '../components/SnackBarToast'
  import MyDialog from '../components/MyDialog'
  import BottomFooter from './BottomFooter'
  export default {
    name: 'Layout',
    components: { BottomFooter, MyDialog, SnackBarToast, TopHeader },
    data: () => ({
        icons: [
          'mdi-home',
          'mdi-email',
          'mdi-calendar',
          'mdi-delete',
        ]
    }),
    methods: {
    }
  }
</script>

<style scoped>
</style>
