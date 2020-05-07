<template>
    <div>
        <div class="page-title py-5 d-flex align-center">自定义消息 <v-spacer></v-spacer> <v-btn icon v-if="isDialog" @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn></div>
        <common-table
          ref="custom_table"
          :headers="table_headers"
          :header_actions="header_actions"
          :api="table_api"
          :filters="table_filters"
          :json_columns="table_json_columns"
          :actions="table_actions"
          @action="onClickAction"
          @headerAction="onHeaderAction"
        ></common-table>
        <v-dialog v-model="show_dialog" max-width="600px">
            <message-create-and-edit :message_id="message_id" @close="onCloseEdit"></message-create-and-edit>
        </v-dialog>
    </div>
</template>

<script>
  import CommonTable from '../components/table/CommonTable'
  import { getMessages, deleteMessage } from '../api'
  import MessageCreateAndEdit from './MessageCreateAndEdit'
  export default {
    props: {
      isDialog: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    name: 'Messages',
    components: { MessageCreateAndEdit, CommonTable },
    data: () => ({
      show_dialog: false,
      message_id: null,
      table_headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: '内容', value: 'content', sortable: true },
        { text: '消息类型', value: 'type_name', sortable: false },
        { text: '备注', value: 'remark', sortable: true},
        { text: '创建时间', value: 'created_at', sortable: true},
        { text: '操作', value: 'action', sortable: false},
      ],
        table_api: getMessages,
        table_filters: [
        {
          name: 'remark',
          title: '备注',
          value: '',
          type: 'text',
          options: [],
          compare: 'like',
          sign: 'where',
        },
      ],
      table_json_columns: ['item.content'],
      header_actions: [
        {
          sign: 'create',
          text: '添加',
          tip: '添加消息',
          color: 'warning',
          icon: 'plus'
        },
      ],
    }),
    mounted () {
      this.$VM.$on('onDialogConfirm', this.onDialogConfirm);
    },
    beforeDestroy() {
      this.$VM.$off('onDialogConfirm', this.onDialogConfirm);
    },
    computed: {
      table_actions () {
        if (!this.isDialog) {
          return [
            {
              sign: 'edit',
              text: '编辑',
              tip: '编辑消息',
              icon: 'pencil'
            },
            {
              sign: 'delete',
              text: '删除',
              tip: '删除消息',
              icon: 'delete'
            },
          ]
        }else {
          return [
            {
              sign: 'choose',
              text: '选择',
              tip: '选择该项',
              icon: 'check'
            },
          ]
        }
      }
    },
    methods: {
      onClickAction(params) {
        if (params.sign === 'edit') {
          this.message_id = params.item.id
          this.show_dialog = true
        }else if (params.sign === 'delete') {
          this.message_id = params.item.id
          this.dialog = {
            show: true,
            title: '删除消息',
            text: '删除消息后，相关自定义回复也会删除，确定吗？',
            sign: 'deleteMessage'
          }
          this.$store.commit('setDialog', this.dialog);
        } else if (params.sign === 'choose') {
          this.$emit('choose', params.item);
        }
      },
      onHeaderAction(params) {
        if (params.sign === 'create') {
          // this.$router.push({
          //   name: 'message-create'
          // })
          this.message_id = null
          this.show_dialog = true
        }
      },
      onCloseEdit() {
        this.show_dialog = false
        this.$refs.custom_table.init()
      },
      onDialogConfirm(sign) {
        this.dialog.show = false
        this.$store.commit('setDialog', this.dialog);
        if (sign === 'deleteMessage') {
          deleteMessage(this.message_id).then(() => {
            this.$store.commit('setSnackbar', {
              message: '删除成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
            this.$nextTick(() => {
              this.$refs.custom_table.init()
            })
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
