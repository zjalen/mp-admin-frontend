<template>
    <v-navigation-drawer
        v-model="show"
        app
        :disable-resize-watcher="true"
        floating
        clipped
    >
        <v-list dense flat class="pt-9">
            <div v-for="(item, index) in menu_list"
                 :key="index">
                <v-divider v-if="index > 0" inset style="margin-left: 85px;margin-right: 40px;" class="my-4"></v-divider>
                <v-subheader v-if="item.children.length > 1" style="font-size: 19px;" class="my-1">
                    <v-icon class="ml-9 mr-4 menu-group-icon">mdi-{{ item.group_icon }}</v-icon> {{item.group}}
                </v-subheader>
                <v-list-item-group v-model="item.current" color="primary" class="menu-group">
                    <v-list-item v-for="(menu, i) in item.children" :key="i" @click="onClick(index, i, menu.sign)" link>
                        <v-list-item-content v-if="item.children.length === 1" style="font-size: 19px;" class="my-1 ml-6 mr-3">
                            <div class="d-flex justify-start align-center">
                                <v-icon class="mr-4 menu-group-icon" style="margin-left: 2px">mdi-{{ menu.icon }}</v-icon> {{menu.title}}
                            </div>
                        </v-list-item-content>
                        <v-list-item-content v-else class="ml-9 pl-8">
                            <v-list-item-title class="menu-title">{{menu.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </div>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LeftMenu',
    props: {},
    data () {
      return {
        show: false,
        menu_list: [
          {
            group: '基本',
            group_icon: 'home',
            current: null,
            children: [
              {
                title: '首页',
                icon: 'home',
                sign: 'home',
              },
            ]
          },
          {
            group: '菜单管理',
            group_icon: 'menu-open',
            current: null,
            children: [
              {
                title: '历史菜单',
                icon: '',
                sign: 'menus',
              },
              {
                title: '自定义菜单',
                icon: '',
                sign: 'custom-menu',
              }
            ]
          },
          {
            group: '消息管理',
            group_icon: 'message',
            current: null,
            children: [
              {
                title: '用户消息',
                icon: '',
                sign: 'user-messages',
              },
              {
                title: '自定义消息',
                icon: '',
                sign: 'messages',
              },
              {
                title: '自动回复',
                icon: '',
                sign: 'auto-reply',
              }
            ]
          },
        ],
      }
    },
    mounted () {
      this.show = this.$store.getters.drawer
      this.$VM.$on('switchDrawer', this.onSwitchDrawer)
      this.updateMenuSign()
    },
    computed: {},
    watch: {
      show () {
        this.$store.dispatch('actionSetDrawer', this.show)
      },
      '$route': function () {
        this.updateMenuSign()
      },
    },
    methods: {
      onClick (index, i, sign) {
        this.menu_list.forEach((value,key) => {
          if (key === index) {
            this.menu_list[index].current = i;
          }else {
            this.menu_list[key].current = null;
          }
        })
        if (sign !== this.$route.name) {
          this.$router.push({
            name: sign,
          })
        }
      },
      onSwitchDrawer (val) {
        this.show = val
      },
      updateMenuSign() {
        this.menu_list.forEach((value, key)=> {
          value.children.forEach((v, k)=> {
            if (v.sign === this.$route.name) {
              this.menu_list[key].current = k;
            }
          })
        })
      }
    },
  }
</script>

<style scoped>
  .menu-title {
    font-size: 14px !important;
    font-weight: 400 !important;
  }
</style>
