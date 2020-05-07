<template>
  <v-footer
    style="background: rgba(0,0,0,0)"
  >
    <div
      style="width: 100%"
      class="text-center pa-0"
    >
      <v-card-text>
        &copy;{{ new Date().getFullYear() }} — <strong>MP-Admin</strong>
        <a class="ml-3" href="https://github.com/zjalen/mp-admin" target="_blank">Github</a>
      </v-card-text>
    </div>
  </v-footer>
</template>

<script>
  export default {
    name: 'BottomFooter',
  }
</script>

<style scoped>

</style>
