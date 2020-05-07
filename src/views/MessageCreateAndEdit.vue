<template>
    <div>
        <!--        <div class="page-title py-5">添加/修改 消息</div>-->
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
                                    <div class="mx-3 my-2 flex-shrink-0">{{current_type.label}}</div>
                                    <v-select
                                        outlined
                                        dense
                                        v-model="current_type.value"
                                        :items="types"
                                        :hint="current_type.tips"
                                        :required="current_type.required"
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="mx-3 my-2 flex-shrink-0">{{remark.label}}</div>
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="remark.value"
                                        :hint="remark.tips"
                                        :required="remark.required"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-for="(item) in append_items"
                                    :key="item.sign"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="mx-3 my-2 flex-shrink-0">{{item.label}}</div>
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="item.value"
                                        :hint="item.tips"
                                        :required="item.required"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex justify-end">
                                    <v-btn class="mr-4 warning" @click="onCancel">关闭</v-btn>
                                    <v-btn class="primary" @click="onSubmit">提交</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
  import { getMessage, createMessage, updateMessage } from '../api'

  export default {
    name: 'MessageCreateAndEdit',
    props: {
      message_id: {
        type: Number,
        default () {
          return null
        },
      },
    },
    data: () => ({
      panel: {
        title: '添加/修改',
      },
      qr_url: '',
      rules: [
        value => !value || value.size < 2000000 || '图片不能超过 2 MB!',
      ],
      show_content: true,
      params: new FormData(),
      remark: {
        sign: 'remark',
        label: '备注',
        value: null,
        tips: '',
        required: true,
      },
      content_json: {},
      current_type: {
        sign: 'type',
        label: '类型',
        value: null,
        tips: '',
        required: true,
      },
      append_items: [],
      types: [
        { text: '文本', value: 0, format: ['content'] },
        { text: '图片', value: 1, format: ['media_id'] },
        { text: '视频', value: 2, format: ['title', 'description', 'media_id', 'thumb_media_id'] },
        { text: '音频', value: 3, format: ['media_id'] },
        { text: '图文', value: 4, format: ['title', 'description', 'images', 'url'] },
        {
          text: '文章',
          value: 5,
          format: ['title', 'author', 'content', 'thumb_media_id', 'digest', 'source_url', 'show_cover'],
        },
        { text: '素材', value: 6, format: ['media_id', 'media_type'] },
        { text: '原始', value: 7, format: ['raw'] },
      ],
    }),
    watch: {
      'current_type.value': function (val) {
        this.onLoadTypeFormat(val)
      },
    },
    mounted () {
      if (this.message_id) {
        getMessage(this.message_id).then(response => {
          this.content_json = JSON.parse(response.data['content'])
          this.current_type.value = response.data['type']
        })
      }
      else {
        this.current_type.value = 0
      }
    },
    methods: {
      onCancel () {
        // history.go(-1)
        this.$emit('close')
      },
      onSubmit () {
        this.params = {}
        this.params[this.current_type.sign] = this.current_type.value
        this.params[this.remark.sign] = this.remark.value
        let append_form = {}
        this.append_items.forEach(val => {
          append_form[val.sign] = val.value
        })
        this.params['content'] = JSON.stringify(append_form)
        if (this.message_id) {
          updateMessage(this.message_id, this.params).then(() => {
            this.$store.commit('setSnackbar', {
              message: '修改成功',
              color: 'success',
              timeout: 1500,
              show: true,
            })
            setTimeout(() => {
              this.onCancel()
            }, 1500)
          })
        }
        else {
          createMessage(this.params).then(() => {
            this.$store.commit('setSnackbar', {
              message: '创建成功',
              color: 'success',
              timeout: 1500,
              show: true,
            })
            setTimeout(() => {
              this.onCancel()
            }, 1500)
          })
        }
      },
      onFileChange (file) {
        if (!file) {
          return this.qr_url = ''
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.qr_url = reader.result
        }
      },
      onAppendClick () {
        document.getElementById('qr_input').click()
      },
      onLoadTypeFormat (val) {
        this.show_content = false
        this.types.forEach(v => {
          if (val === v.value) {
            this.append_items = []
            v.format.forEach(vv => {
              this.append_items.push({
                sign: vv,
                label: vv,
                value: this.content_json[vv],
                tips: '',
              })
            })
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
