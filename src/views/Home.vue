<template>
    <div>
        <div class="page-title py-5">基本信息管理</div>
        <div class="page-body">
            <v-card class="page-body-card">
                <div class="panel" v-for="(panel,key) in panels" :key="key">
                    <div v-if="panel.header"
                         class="panel__hd">
                        <div class="panel-title">{{panel.header.title}}</div>
                        <v-spacer></v-spacer>
                        <template v-if="panel.header.actions">
                            <v-btn
                                v-for="(action, key) in panel.header.actions"
                                :key="key"
                                :class="`${action.color} ml-2`"
                                elevation="0"
                                @click="onClick(action.sign)">
                                {{action.title}}
                            </v-btn>
                        </template>
                    </div>
                    <div class="panel__bd">
                        <div class="d-flex justify-center align-end py-3">
                            <v-img :src="qr_url" max-width="200px"></v-img>
                            <v-btn @click="downloadCodeImg" icon class="mb-1">
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <div v-if="panel.list" class="panel-form px-0">
                            <div
                                v-for="(item, index) in panel.list"
                                :key="index"
                                class="panel-form__control-group"
                            >
                                <div class="panel-form-label">
                                    <span>{{item.label}}</span>
                                </div>

                                <div class="panel-form-content">
                                    <div class="panel-form-content-title">{{item.title ? item.title : '空'}}</div>
                                    <div class="panel-form-content-tips">{{item.tips}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-divider
                        v-if="key < (panels.length - 1) && key > 0"
                        :inset="panel.inset"
                    ></v-divider>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>
    import { getMpInfo } from '../api'
    import { saveAs } from '../utils'
  export default {
    data () {
      return {
        qr_url: '',
        mp_sign: null,
        panels: [
          {
            header: {
              title:'基本配置',
              actions: [{
                title: '修改配置',
                color: 'primary',
                sign: 'edit_base_info'
              }]
            },
            list: [
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
          },
        ],
      }
    },
    mounted() {
      this.mp_sign = this.$route.params.mp_sign;
      getMpInfo(this.mp_sign).then(response => {
        this.qr_url = response.data.qr_url
        this.panels[0].list.forEach((value,index) => {
          let key = value.sign
          this.panels[0].list[index].title = response.data[key]
        })
      })
    },
    methods: {
      onClick(sign) {
        if (sign === 'edit_base_info') {
          this.$router.push({
            name: 'mp-edit',
          })
        }
      },
      downloadCodeImg(){
        let title = this.panels[0].list[0].title;
        saveAs(this.qr_url, title)
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
