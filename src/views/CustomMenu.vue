<template>
    <div>
        <div class="page-title py-5">自定义菜单 <v-btn v-if="!menu_id" depressed @click="loadCurrentMpMenu">载入公众号当前菜单</v-btn></div>
        <div class="page-body">
            <v-card class="page-body-card">
                <v-row class="mx-0">
                    <v-col
                        md="6"
                        sm="12"
                        class="d-flex justify-start align-start"
                    >
                        <div style="width: auto;" class="panel-form-label flex-shrink-0">{{remark.label}}</div>
                        <v-text-field
                            outlined
                            dense
                            v-model="remark.value"
                            :hint="remark.tips"
                            :required="remark.required"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <div class="d-flex flex-md-row flex-column">
                    <div class="menu_preview_area pa-0 d-flex flex-column justify-center align-center my-3">
                        <div class="mobile_menu_preview mx-3">
                            <div class="mobile_hd">{{mp_name}}</div>
                            <div class="mobile_bd">
                                <v-row class="pre_menu_list d-flex justify-center ma-0">
                                    <draggable v-model="menu_items" group="menus" @start="onDragStart" @end="onDragEnd"
                                               class="d-flex flex-fill" draggable=".draggable">
                                        <v-col
                                            v-for="(item, key) in menu_items"
                                            :key="key"
                                            :class="order_menu ? 'draggable' : ''"
                                            class="pre_menu_item pa-0">
                                            <v-menu
                                                :value="open_menu_index[key]"
                                                :close-on-click="false"
                                                :close-on-content-click="false"
                                                top
                                                ref="menu"
                                                offset-y
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-btn
                                                        block
                                                        tile
                                                        text
                                                        light
                                                        color="mp_grey"
                                                        height="100%"
                                                        ref="menu_btn"
                                                        class="pa-0"
                                                        :class="active_menu === key && active_sub_menu === null ? 'active-btn' : ''"
                                                        v-on="on"
                                                        @click="onClick(key)"
                                                    >
                                                        <v-icon color="mp_grey" v-if="order_menu">
                                                            mdi-reorder-horizontal
                                                        </v-icon>
                                                        {{item.name}}
                                                    </v-btn>
                                                </template>
                                                <v-list flat class="submenu-list">
                                                    <v-list-item-group v-if="item.sub_button" v-model="active_sub_menu"
                                                                       color="primary">
                                                        <draggable v-model="item.sub_button" group="sub_menus"
                                                                   @start="onSubDragStart" @end="onSubDragEnd"
                                                                   draggable=".draggable">
                                                            <v-list-item
                                                                light
                                                                v-for="(sub_item, index) in item.sub_button"
                                                                :key="index"
                                                                :class="order_menu ? 'draggable' : ''"
                                                                class="pa-0"
                                                                @click="onClickSubMenu(key, index)"
                                                            >
                                                                <v-list-item-title
                                                                    class="d-flex align-center justify-center">
                                                                    <v-icon v-if="order_menu">mdi-reorder-horizontal
                                                                    </v-icon>
                                                                    {{ sub_item.name }}
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                        </draggable>
                                                    </v-list-item-group>
                                                    <v-list-item
                                                        light
                                                        v-if="item.sub_button.length < 5"
                                                        @click="onClickSubMenu(key, 'add')"
                                                    >
                                                        <v-list-item-title>
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                        <v-col v-if="menu_items.length < 3" class="pre_menu_item grid_item pa-0">
                                            <v-btn
                                                block
                                                tile
                                                text
                                                light
                                                height="100%"
                                                class="pre_menu_link"
                                                @click="onClick('add')"
                                            >
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </draggable>
                                </v-row>
                            </div>
                        </div>

                        <v-btn depressed class="mt-3" @click="order_menu = !order_menu">菜单排序</v-btn>
                    </div>

                    <div class="d-flex flex-column justify-center align-center px-3" style="width: 100%">
                        <v-form v-model="valid" ref="form" class="editor-inner ma-3 fill-height" style="width: inherit">
                            <v-container v-if="current_menu">
                                <div class="d-flex align-center justify-center">
                                    <div style="font-size: 15px">{{current_menu.name}}</div>
                                    <v-spacer></v-spacer>
                                    <v-btn link text color="secondary" @click="onDeleteMenu">删除菜单</v-btn>
                                </div>
                                <v-divider class="mt-3 mb-5"/>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        class="d-flex justify-start align-start"
                                    >
                                        <div class="mr-4 mt-2">菜单名称</div>
                                        <v-text-field
                                            v-model="current_menu.name"
                                            :rules="current_menu.level === 1 ? form_rules.menuRules : form_rules.submenuRules"
                                            outlined
                                            dense
                                            label="菜单名称"
                                            hint="仅支持中英文和数字，字数不超过4个汉字或8个字母"
                                            @input="onInput"
                                        >

                                        </v-text-field>
                                    </v-col>
                                    <v-col
                                        v-if="current_menu.level === 1 && current_menu.sub_button.length < 1 || current_menu.level === 2 "
                                        cols="12"
                                        class="d-flex justify-start align-start"
                                    >
                                        <div class="mr-4 mt-2">菜单类型</div>
                                        <v-select
                                            :items="menu_types"
                                            v-model="current_menu.type"
                                            label="菜单类型"
                                            :rules="form_rules.requireRules"
                                            dense
                                            outlined
                                            @change="onMenuTypeChange"
                                        ></v-select>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        v-if="((current_menu.level === 1 && current_menu.sub_button.length < 1) || current_menu.level === 2) && current_menu.type"
                                    >
                                        <div v-if="current_menu.type === 'view' || current_menu.type === 'miniprogram'"
                                             class="d-flex justify-start align-start">
                                            <div class="mr-4 mt-2">URL 链接</div>
                                            <v-text-field
                                                v-model="current_menu.url"
                                                outlined
                                                dense
                                                label="URL"
                                                :rules="form_rules.requireRules"
                                            ></v-text-field>
                                        </div>
                                        <div v-if="current_menu.type === 'miniprogram'"
                                             class="d-flex justify-start align-start">
                                            <div class="mr-4 mt-2">小程序ID</div>
                                            <v-text-field
                                                v-model="current_menu.appid"
                                                :counter="50"
                                                outlined
                                                dense
                                                label="AppID"
                                                :rules="form_rules.requireRules"
                                            ></v-text-field>
                                        </div>
                                        <div v-if="current_menu.type === 'miniprogram'"
                                             class="d-flex justify-start align-start">
                                            <div class="mr-4 mt-2">页面路径</div>
                                            <v-text-field
                                                v-model="current_menu.pagepath"
                                                outlined
                                                dense
                                                label="PagePath"
                                                :rules="form_rules.requireRules"
                                            ></v-text-field>
                                        </div>
                                        <div
                                            v-if="current_menu.type === 'click' || current_menu.type === 'scancode_waitmsg' || current_menu.type === 'scancode_push'"
                                            class="d-flex justify-start align-start">
                                            <div class="mr-4 mt-2">Key 标识</div>
                                            <v-text-field
                                                v-model="current_menu.key"
                                                :counter="50"
                                                outlined
                                                dense
                                                label="key"
                                                :rules="form_rules.requireRules"
                                            ></v-text-field>
                                        </div>
                                        <div
                                            v-if="current_menu.type === 'media_id' || current_menu.type === 'view_limited'"
                                            class="d-flex justify-start align-start">
                                            <div class="mr-4 mt-2">永久素材</div>
                                            <v-text-field
                                                v-model="current_menu.media_id"
                                                :counter="50"
                                                outlined
                                                dense
                                                label="media_id"
                                                :rules="form_rules.requireRules"
                                            ></v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <div class="d-flex justify-center mt-3">
                            <v-btn depressed class="default" @click="saveMenu">保存到数据库</v-btn>
                            <v-btn depressed class="primary ml-3" @click="submitToMP">启用到公众号</v-btn>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
  import { getLengthOfStr } from '../utils'
  import draggable from 'vuedraggable'
  import { getMenu, createMenu, updateMenu, getCurrentMpMenu, updateMenuToMp } from '../api'
  export default {
    name: 'CustomMenu',
    components: {
      draggable,
    },
    data: () => ({
      mp_name: '欣美水务科技',
      menu_id: 0,
      open_menu_index: [
        false, false, false,
      ],
      active_menu: null,
      active_sub_menu: null,
      order_menu: false,
      menu_items: [],
      menu_types: [
        {
          text: '链接',
          value: 'view',
        },
        {
          text: '点击事件',
          value: 'click',
        },
        {
          text: '微信扫码',
          value: 'scancode_push',
        },
        {
          text: '自定义扫码',
          value: 'scancode_waitmsg',
        },
        {
          text: '小程序',
          value: 'miniprogram',
        },
        {
          text: '素材',
          value: 'media_id',
        },
        {
          text: '图文素材',
          value: 'view_limited',
        },
      ],
      valid: false,
      form_data: null,
      form_rules: {
        menuRules: [
          v => !!v || '菜单名必填',
          v => (getLengthOfStr(v) <= 8) || '字符不能多于8个中文或16个英文字母',
        ],
        submenuRules: [
          v => !!v || '菜单名必填',
          v => (getLengthOfStr(v) <= 16) || '字符不能多于8个中文或16个英文字母',
        ],
        requireRules: [
          v => !!v || '该信息必填'
        ]
      },
      drag: false,
      current_menu: null,
      dialog: {
        show: true,
        title: '删除菜单',
        text: '一旦删除菜单，菜单和对应子菜单将删除，无法撤销和找回，确定删除吗？',
        sign: 'deleteMenu',
      },
      remark: {
        sign: 'remark',
        label: '备注',
        value: null,
        tips: '',
      }
    }),
    mounted () {
      this.$VM.$on('onDialogConfirm', this.onDialogConfirm)
      this.menu_id = this.$route.params.menu_id ? this.$route.params.menu_id : 0
      this.loadingMenu()
    },
    methods: {
      loadingMenu() {
        if (this.menu_id !== 0) {
          getMenu(this.menu_id).then(response => {
            this.remark.value = response.data.remark
            this.menu_items = JSON.parse(response.data.content)
          })
        }
      },
      loadCurrentMpMenu() {
        getCurrentMpMenu().then(response => {
          this.menu_items = response.data.menu.button
        })
      },
      onClick (key) {
        this.active_sub_menu = null
        this.open_menu_index = this.open_menu_index.map(() => {
          return false
        })
        if (key === 'add') {
          this.menu_items.push({
            name: '新菜单',
            type: '',
            sub_button: [],
          })
          this.current_menu = this.menu_items[this.menu_items.length - 1]
          this.current_menu.level = 1
          this.$nextTick(() => {
            this.$refs.menu_btn.forEach(value => {
              return value.$el.classList.remove('active-btn')
            })
            this.active_menu = this.menu_items.length - 1
            this.$refs.menu_btn[this.menu_items.length - 1].$el.classList.add('active-btn')
          })
        }
        else {
          this.active_menu = key
          this.open_menu_index[key] = true
          this.current_menu = this.menu_items[key]
          this.current_menu.level = 1
        }
      },
      onClickSubMenu (key, index) {
        // this.active_menu = null;
        for (let k in this.menu_items[key]) {
          if (k !== 'name' && k !== 'sub_button') {
            delete this.menu_items[key][k]
          }
        }
        let menus = this.menu_items[key].sub_button
        if (index === 'add') {
          menus.push({
            name: '增加的',
            type: '',
          })
          this.menu_items[key].sub_button = menus
          if (menus.length < 5) {
            // 修复增加子菜单后，Menu 组件偏移问题
            let val = parseInt(document.getElementsByClassName('menuable__content__active')[0].style.top)
            document.getElementsByClassName('menuable__content__active')[0].style.top = (val - 49) + 'px'
          }
          this.current_menu = menus[menus.length - 1]
          this.current_menu.level = 2
          this.$nextTick(() => {
            this.active_sub_menu = menus.length - 1
          })
        }
        else {
          if (this.active_sub_menu !== index) {
            this.active_sub_menu = index
            this.current_menu = menus[index]
            this.current_menu.level = 2
          }else {
            this.active_sub_menu = null
            this.current_menu = null
          }
        }
      },
      onInput () {
        this.$refs.form.validate()
      },
      onSubDragStart () {
        this.drag = true
        // this.open_menu_index = this.open_menu_index.map(() => {
        //   return false
        // })
      },
      onSubDragEnd(evt) {
        this.active_sub_menu = evt.newIndex  // 可以知道拖动后的位置
        let menus = this.menu_items[this.active_menu].sub_button
        this.current_menu = menus[evt.newIndex]
        this.current_menu.level = 2
      },
      onDragStart () {
        this.drag = true
        this.open_menu_index = this.open_menu_index.map(() => {
          return false
        })
      },

      onDragEnd(evt) {
        this.active_menu = evt.newIndex  // 可以知道拖动后的位置
        let menus = this.menu_items
        this.current_menu = menus[evt.newIndex]
        this.current_menu.level = 1
      },
      onMenuTypeChange () {
      },

      saveMenu () {
        let params = this.validateFormParams();
        if (!params) {
          return;
        }
        if (this.menu_id === 0) {
            createMenu(params).then((response) => {
              this.$store.commit('setSnackbar', {
                message: '创建成功',
                color: 'success',
                timeout: 1500,
                show: true
              })
              this.menu_id = response.data.id
              this.$router.push({
                name: 'custom-menu',
                params: {
                  menu_id: response.data.id
                }
              })
            })
        }else {
          updateMenu(this.menu_id, params).then(() => {
            this.$store.commit('setSnackbar', {
              message: '更新成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
          })
        }
      },
      submitToMP() {
        let params = this.validateFormParams();
        if (!params) {
          return;
        }
        updateMenuToMp(params).then((response) => {
          let res = response.data;
          let errcode = res.errcode;
          if (errcode === 0) {
            this.$store.commit('setSnackbar', {
              message: '更新成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
          }else {
            this.$store.commit('setSnackbar', {
              message: res.errmsg,
              color: 'error',
              timeout: 3000,
              show: true
            })
          }
        })
      },
      onDeleteMenu () {
        if (this.active_menu !== null || this.active_sub_menu !== null) {
          this.dialog = {
            show: true,
            title: '删除菜单',
            text: '一旦删除菜单，菜单和对应子菜单将删除，无法撤销和找回，确定删除吗？',
            sign: 'deleteMenu',
          }
          this.$store.commit('setDialog', this.dialog)
          if (this.menu_items[this.active_menu]['sub_button'].length === 0) {
            this.menu_items[this.active_menu]['type'] = ''
          }
        }
      },
      onDialogConfirm (sign) {
        this.dialog.show = false
        this.$store.commit('setDialog', this.dialog)
        if (sign === 'deleteMenu') {
          this.current_menu = null
          if (this.active_sub_menu !== null) {
            this.menu_items[this.active_menu].sub_button.splice(this.active_sub_menu, 1);
            // 修复增加子菜单后，Menu 组件偏移问题
            let val = parseInt(document.getElementsByClassName('menuable__content__active')[0].style.top)
            document.getElementsByClassName('menuable__content__active')[0].style.top = (val + 49) + 'px'
            this.active_sub_menu = null
            this.active_menu = null
          } else {
            delete this.menu_items.splice(this.active_menu, 1);
          }
        }
      },
      validateFormParams() {
        if (this.$refs.form.validate()) {
          if (this.validateArray(this.menu_items) !== true) {
            if (this.active_sub_menu === null) {
              this.current_menu = this.menu_items[this.active_menu]
              this.current_menu.level = 1
            }
            else {
              this.current_menu = this.menu_items[this.active_menu]['sub_button'][this.active_sub_menu]
              this.current_menu.level = 2
            }
            this.dialog = {
              show: true,
              title: '菜单格式有误',
              text: '菜单选项不能为空，请检查菜单格式',
              sign: 'validateForm',
            }
            this.$store.commit('setDialog', this.dialog)
            return null
          }
          this.form_data = this.formatArray(this.menu_items)
          let params = {
            content: JSON.stringify(this.form_data)
          }
          if (this.remark.value) {
            params.remark = this.remark.value
          }
          return params
        }
        return null
      },
      formatArray (arr) {
        arr = arr.map(obj => {
          if (obj.level) {
            delete obj.level
          }
          if (obj.sub_button) {
            obj.sub_button = this.formatArray(obj.sub_button)
          }
          return obj
        })
        return arr
      },
      validateArray (arr) {
        for (let index in arr) {
          let obj = arr[index]
          for(let key in obj){
            if (obj[key] === undefined || obj[key] === null || (key !== 'sub_button' && obj[key].length === 0) || obj[key] === '') {
              this.active_menu = Number(index)
              this.active_sub_menu = null
              return index
            }
          }
          if (obj.sub_button) {
            let res = this.validateArray(obj.sub_button)
            if (res !== true) {
              this.active_menu = Number(index)
              this.active_sub_menu = Number(res)
              return res
            }
          }
        }
        return true
      }
    },
  }
</script>

<style lang="scss" scoped>
    .active-btn {
        background: #fff;
        color: var(--v-primary-base);
        border: 1px solid var(--v-primary-base);
    }
</style>
