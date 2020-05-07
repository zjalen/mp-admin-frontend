<template>
    <v-row class="mx-0">
        <v-col :sm="6" :md="4" :xl="3" :xs="12"
               v-for="(item, key) in projects"
               :key="key"
        >
            <card-with-image
                :item="item"
                @onCardClick="onCardClick"
            ></card-with-image>
        </v-col>
        <v-col :sm="6" :md="4" :xl="3" :xs="12">
            <v-card height="328" class="d-flex justify-center align-center" flat hover @click="toAdd">
                <v-icon class="display-3">mdi-plus</v-icon>
            </v-card>
        </v-col>
        <v-col v-if="page > 1" cols="12" class="text-center">
            <v-pagination
                v-model="page"
                :length="page_length"
            ></v-pagination>
        </v-col>
    </v-row>
</template>

<script>
  import CardWithImage from '../components/common_cards/CardWithImage'
  import { getMpList, deleteMpInfo } from '../api'
  export default {
    name: 'MpList',
    components: { CardWithImage},
    data () {
      return {
        info: {
          room: {
            color: 'info',
            subtitle: '安装住户(户)',
            title: '0',
            icon: 'home',
          },
          community: {
            color: 'primary',
            subtitle: '小区数量(个)',
            title: '0',
            icon: 'office-building',
          },
        },
        projects: [],
        page: 1,
        limit: 20,
        total_count: 0,
        current_mp: null,
        dialog: {}
      }
    },
    mounted () {
      this.initData()
      this.$VM.$on('onDialogConfirm', this.onDialogConfirm);
    },
    beforeDestroy() {
      this.$VM.$off('onDialogConfirm', this.onDialogConfirm);
    },
    computed: {
      page_length() {
        return Math.ceil(this.total_count / this.limit);
      }
    },
    methods: {
      initData () {
        let params = {
          _skip: (this.page - 1) * this.limit,
          _limit: this.limit,
        }
        getMpList(params).then(response => {
          this.total_count = response.data.total_count
          let items = response.data.items;
          this.projects = items.map(value => {
            return {
              id: value.id,
              sign: value.sign,
              color: 'info',
              subtitle: 'app_id: ' + value.app_id,
              title: value.name,
              description: '添加时间: ' + value.created_at,
              actions: [
                {
                  text: '删除',
                  sign: 'delete',
                  color: 'error'
                },
                {
                  text: '查看',
                  sign: 'show',
                },
              ]
            }
          })
        })
      },
      onCardClick(obj) {
        let sign = obj.sign
        this.current_mp = obj.item
        if (sign === 'show') {
          this.$router.push({
            path: `/mp/${this.current_mp.sign}/home`,
          })
        }else if (sign === 'delete') {
          this.dialog = {
            show: true,
            title: '删除项目',
            text: '删除公众号后，相关所有信息都将被删除且不可恢复，确定吗？',
            sign: 'deleteMp'
          }
          this.$store.commit('setDialog', this.dialog);
        }
      },
      toAdd() {
        this.$router.push({
          path: `/create`,
        })
      },
      onDialogConfirm(sign) {
        this.dialog.show = false
        this.$store.commit('setDialog', this.dialog);
        if (sign === 'deleteMp') {
          deleteMpInfo(this.current_mp.sign).then(() => {
            this.$store.commit('setSnackbar', {
              message: '删除成功',
              color: 'success',
              timeout: 1500,
              show: true
            })
            this.$nextTick(() => {
              this.initData()
            })
          })
        }
      },
    },
  }
</script>

<style scoped>

</style>
