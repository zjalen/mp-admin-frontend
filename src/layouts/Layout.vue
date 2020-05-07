<template>
    <v-app>
        <left-menu ></left-menu>
        <top-header></top-header>
        <v-content>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>
        <snack-bar-toast></snack-bar-toast>
        <my-dialog></my-dialog>
      <bottom-footer></bottom-footer>
    </v-app>
</template>

<script>
  import LeftMenu from './LeftMenu';
  import TopHeader from './TopHeader'
  import SnackBarToast from '../components/SnackBarToast'
  import MyDialog from '../components/MyDialog'
  import BottomFooter from './BottomFooter'
  export default {
    name: 'Layout',
    components: { BottomFooter, MyDialog, SnackBarToast, LeftMenu, TopHeader },
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
