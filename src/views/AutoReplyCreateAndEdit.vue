<template>
    <div>
        <div class="page-title py-5">自动回复配置</div>
        <div class="page-body">
            <v-card class="page-body-card">
                <div class="panel">
                    <div
                         class="panel__hd">
                        <div class="panel-title">{{panel.title}}</div>
                    </div>
                    <div class="panel__bd">
                        <v-form
                            ref="form"
                        >
                            <v-row>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="panel-form-label flex-shrink-0">消息类型</div>
                                    <v-select
                                        outlined
                                        dense
                                        :items="types"
                                        v-model="form.type"
                                        hint="选择消息类型"
                                        reqired
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="panel-form-label flex-shrink-0">匹配类型</div>
                                    <v-select
                                        outlined
                                        dense
                                        :items="match_types"
                                        v-model="form.match_type"
                                        hint="选择匹配类型"
                                        reqired
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="panel-form-label flex-shrink-0">消息内容</div>
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="form.text"
                                        hint="输入匹配内容"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="panel-form-label flex-shrink-0">回复消息</div>
                                    <v-text-field
                                        outlined
                                        readonly
                                        @click="show_dialog = true"
                                        dense
                                        v-model="form.message_id"
                                        hint="选择回复消息"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="panel-form-label flex-shrink-0">备注</div>
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="form.remark"
                                        hint="备注"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-end">
                                    <v-btn class="mr-4 warning" @click="onCancel">取消</v-btn>
                                    <v-btn class="primary" @click="onSubmit">提交</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                </div>
            </v-card>
        </div>

        <v-dialog v-model="show_dialog" max-width="1000px">
            <v-card class="pa-3">
                <messages :is-dialog="true" @choose="onChoose" @close="show_dialog = false"></messages>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import { getAutoReplyConfig, createAutoReplyConfig, updateAutoReplyConfig } from '../api'
  import Messages from './Messages'

  export default {
    name: 'AutoReplyCreateAndEdit',
    components: { Messages },
    data: () => ({
      show_dialog: false,
      panel: {
        title:'添加/修改'
      },
      qr_url: '',
      rules: [
        value => !value || value.size < 2000000 || '图片不能超过 2 MB!',
      ],
      auto_reply_id: null,
      types: [
        { text: '文本', value: 0 },
        { text: '菜单事件', value: 4 },
      ],
      match_types: [
        { text: '全匹配', value: 0},
        { text: '半匹配', value: 1},
      ],
      form: {
        type: '',
        match_type: '',
        text: '',
        message_id: '',
        remark: ''
      }
    }),
    mounted () {
      if (this.$route.name === 'auto-reply-edit') {
        this.auto_reply_id = this.$route.params.auto_reply_id
        if (this.auto_reply_id) {
          getAutoReplyConfig(this.auto_reply_id).then(response => {
            this.form = response.data
          })
        }
      }
    },
    methods: {
      onCancel () {
        history.go(-1)
      },
      onSubmit () {
        if (this.$route.name === 'auto-reply-edit') {
          updateAutoReplyConfig(this.auto_reply_id, this.form).then(() => {
            this.$store.commit('setSnackbar', {
              message: '修改成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
            setTimeout(() => {
              this.onCancel()
            }, 1500)
          })
        } else {
          createAutoReplyConfig(this.form).then(() => {
            this.$store.commit('setSnackbar', {
              message: '创建成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
            setTimeout(() => {
              this.onCancel()
            }, 1500)
          })
        }
      },
      onFileChange(file) {
        if (!file) {
          return this.qr_url = ''
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.qr_url = reader.result
        }
      },
      onAppendClick() {
        document.getElementById('qr_input').click()
      },
      onChoose(item) {
        console.log(item)
        this.form.message_id = item.id
        this.show_dialog = false
      }
    },
  }
</script>

<style scoped>

</style>
