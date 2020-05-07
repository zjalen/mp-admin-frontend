<template>
    <v-col>
        <div class="page-title py-5">公众号配置</div>
        <div class="page-body">
            <v-card class="page-body-card">
                <div class="panel">
                    <div
                         class="panel__hd">
                        <div class="panel-title">{{panel.title}}</div>
                    </div>
                    <div class="panel__bd">
                        <div class="d-flex justify-center align-center py-3">
                            <v-img :src="qr_url" max-width="200px"></v-img>
                        </div>
                        <v-form
                            ref="form"
                        >
                            <v-row>
                                <v-col
                                    cols="12"
                                    v-for="(item, key) in items"
                                    :key="key"
                                    class="d-flex justify-start align-start"
                                >
                                    <div class="panel-form-label flex-shrink-0">{{item.label}}</div>
                                    <v-file-input
                                        v-if="item.sign === 'qr_code'"
                                        id="qr_input"
                                        outlined
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp"
                                        dense
                                        prepend-icon=""
                                        append-icon="mdi-camera"
                                        :hint="item.tips"
                                        v-model="item.title"
                                        filled
                                        @change="onFileChange"
                                        @click:append="onAppendClick"
                                    ></v-file-input>
                                    <v-text-field
                                        v-else
                                        outlined
                                        dense
                                        v-model="item.title"
                                        :hint="item.tips"
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
    </v-col>
</template>

<script>
  import { getMpInfo, createMpInfo, updateMpInfo } from '../api'

  export default {
    name: 'MpCreateAndEdit',
    data: () => ({
      panel: {
        title:'添加/修改'
      },
      qr_url: '',
      rules: [
        value => !value || value.size < 2000000 || '图片不能超过 2 MB!',
      ],
      mp_sign: null,
      params: new FormData(),
      items: [
        {
          sign: 'qr_code',
          label: '公众号二维码',
          title: [],
          tips: '可通过微信公众号后台设置获取。',
        },
        {
          sign: 'name',
          label: '公众号名称',
          title: '',
          tips: '此名称仅为标识，如需修改微信公众号名称，请通过公众号官方后台进行微信认证。',
        },
        {
          sign: 'sign',
          label: '公众号标识',
          title: '',
          tips: '此名称仅为自定义标识，建议简短纯英文字母。'
        },
        {
          sign: 'app_id',
          label: '开发者ID(AppID)',
          title: '',
          tips: '开发者ID是公众号开发识别码，配合开发者密码可调用公众号的接口能力。',
        },
        {
          sign: 'secret',
          label: '开发者密钥(AppSecret)',
          title: '',
          tips: '开发者密码是校验公众号开发者身份的密码，具有极高的安全性。切记勿把密码直接交给第三方开发者或直接存储在代码中。如需第三方代开发公众号，请使用授权方式接入。',
        },
        {
          sign: 'token',
          label: '令牌(Token)',
          title: '',
          tips: '需与微信公众号平台设置一致，方可成功解析微信转发的消息。',
        },
        {
          sign: 'aes_key',
          label: 'AESKey',
          title: '',
          tips: '加密消息密钥，如您采用明文传输，可不必填写。',
        },
        {
          sign: 'raw_id',
          label: '原始 id(raw_id)',
          title: '',
          tips: '原始 id 可在公众号后台，公众号设置底部找到。',
        },
      ],
    }),
    mounted () {
      if (this.$route.name === 'mp-edit') {
        this.mp_sign = this.$route.params.mp_sign
        if (this.mp_sign) {
          getMpInfo(this.mp_sign).then(response => {
            this.qr_url = response.data.qr_url
            this.items.forEach((value, index) => {
              let key = value.sign
              if (key === 'qr_code') {
                return
              }
              this.items[index].title = response.data[key]
            })
          })
        }
      }
    },
    methods: {
      onCancel () {
        history.go(-1)
      },
      onSubmit () {
        this.params = new FormData();
        this.items.forEach(value => {
          this.params.append(value.sign, value.title);
        })
        if (this.$route.name === 'mp-edit') {
          this.params.append('_method', 'PUT');
          updateMpInfo(this.mp_sign, this.params).then(() => {
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
          createMpInfo(this.params).then(() => {
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
      }
    },
  }
</script>

<style scoped>

</style>
