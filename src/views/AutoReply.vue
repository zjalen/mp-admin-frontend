<template>
    <div>
        <div class="page-title py-5">自动回复</div>
        <common-table
          :headers="table_headers"
          :api="table_api"
          :filters="table_filters"
          :actions="table_actions"
          :header_actions="header_actions"
          :json_columns="table_json_columns"
          @headerAction="onHeaderAction"
          @action="onClickAction"
        ></common-table>
    </div>
</template>

<script>
  import CommonTable from '../components/table/CommonTable'
  import { getAutoReplyConfigs } from '../api'
  export default {
    name: 'AutoReply',
    components: { CommonTable },
    data: () => ({
      table_headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: '匹配消息', value: 'text', sortable: true},
        { text: '消息类型', value: 'type_name', sortable: false},
        { text: '匹配程度', value: 'match_type_name', sortable: false},
        { text: '自动回复消息', value: 'message.content', sortable: false},
        { text: '回复消息类型', value: 'message.type_name', sortable: false},
        { text: '备注', value: 'remark', sortable: true },
        { text: '创建时间', value: 'created_at', sortable: true },
        { text: '操作', value: 'action', sortable: false, align: 'center' },
      ],
        table_api: getAutoReplyConfigs,
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
          name: 'update_at',
          title: '起始修改日期',
          value: '',
          type: 'date',
          options: [],
          compare: '>=',
          sign: 'where',
        },
        {
          name: 'update_at',
          title: '结束修改日期',
          value: '',
          type: 'date',
          options: [],
          compare: '<=',
          sign: 'where',
        },
      ],
      header_actions: [
        {
          sign: 'create',
          text: '添加',
          tip: '添加消息',
          color: 'warning',
          icon: 'plus'
        },
      ],
      table_json_columns: [],
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
    methods: {
      onClickAction(params) {
        if (params.sign === 'edit') {
          this.$router.push({
            name: 'auto-reply-edit',
            params: {
              auto_reply_id: params.item.id
            }
          })
        }
      },
      onHeaderAction(params) {
        if (params.sign === 'create') {
          this.$router.push({
            name: 'auto-reply-create',
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
