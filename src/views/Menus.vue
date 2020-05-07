<template>
    <div>
        <div class="page-title py-5">历史菜单</div>
        <common-table
            ref="custom_table"
          :headers="table_headers"
          :api="table_api"
          :filters="table_filters"
          :actions="table_actions"
            :json_columns="table_json_columns"
          @action="onClickAction"
        ></common-table>
    </div>
</template>

<script>
  import CommonTable from '../components/table/CommonTable'
  import { getMenus, deleteMenu } from '../api'
  export default {
    name: 'Menus',
    components: { CommonTable },
    data: () => ({
      current_menu_id: null,
      table_headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: '菜单内容', value: 'content', sortable: false},
        { text: '备注', value: 'remark', sortable: true },
        { text: '创建时间', value: 'created_at', sortable: true },
        { text: '更新时间', value: 'updated_at', sortable: true },
        { text: '操作', value: 'action', sortable: false, align: 'center' },
      ],
        table_api: getMenus,
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
        {
          name: 'updated_at',
          title: '起始修改日期',
          value: '',
          type: 'date',
          options: [],
          compare: '>=',
          sign: 'where',
        },
        {
          name: 'updated_at',
          title: '结束修改日期',
          value: '',
          type: 'date',
          options: [],
          compare: '<=',
          sign: 'where',
        },
      ],
      table_json_columns: ['item.content'],
      table_actions: [
        {
          sign: 'edit',
          text: '编辑',
          tip: '编辑详细信息',
          icon: 'pencil'
        },
        {
          sign: 'delete',
          text: '删除',
          tip: '删除该信息',
          icon: 'delete'
        },
      ]
    }),
    mounted() {
      this.$VM.$on('onDialogConfirm', this.onDialogConfirm);
    },
    beforeDestroy() {
      this.$VM.$off('onDialogConfirm', this.onDialogConfirm);
    },
    methods: {
      onClickAction(params) {
        if (params.sign === 'edit') {
          this.$router.push({
            name: 'custom-menu',
            params: {
              menu_id: params.item.id
            }
          })
        } else if (params.sign === 'delete') {
          this.current_menu_id = params.item.id
          this.dialog = {
            show: true,
            title: '是否删除菜单',
            text: '删除菜单后不可恢复，确定吗？',
            sign: 'deleteMenu'
          }
          this.$store.commit('setDialog', this.dialog);
        }
      },
      onDialogConfirm(sign) {
        this.dialog.show = false
        this.$store.commit('setDialog', this.dialog);
        if (sign === 'deleteMenu') {
          deleteMenu(this.current_menu_id).then(() => {
            this.$store.commit('setSnackbar', {
              message: '删除成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
            this.$refs.custom_table.init()
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
