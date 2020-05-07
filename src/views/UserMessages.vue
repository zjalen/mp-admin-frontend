<template>
    <div>
        <div class="page-title py-5">用户消息</div>
        <common-table
          :headers="table_headers"
          :api="table_api"
          :filters="table_filters"
          :actions="table_actions"
          @action="onClickAction"
        ></common-table>
    </div>
</template>

<script>
  import CommonTable from '../components/table/CommonTable'
  import { getUserMessages } from '../api'
  export default {
    name: 'UserMessages',
    components: { CommonTable },
    data: () => ({
      table_headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'openid', value: 'openid', sortable: true},
        { text: '消息内容', value: 'content', sortable: true },
        { text: '消息类型', value: 'type_name', sortable: true },
        { text: '备注', value: 'remark', sortable: true},
        { text: '收取时间', value: 'created_at', sortable: true},
      ],
        table_api: getUserMessages,
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
      table_actions: [
        {
          sign: 'reply',
          text: '回复',
          tip: '回复消息',
          icon: 'edit'
        },
      ]
    }),
    methods: {
      onClickAction(params) {
        if (params.sign === 'edit') {
          this.$router.push({
            name: 'custom-menu',
            params: {
              menu_id: params.id
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
