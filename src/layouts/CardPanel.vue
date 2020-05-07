<template>
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
                            <div class="panel-form-content-title">{{item.title}}</div>
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
</template>

<script>
  export default {
    props: {
      panels: {
        type: Array,
        default () {
          return []
        },
      },
    },
    data:()=>({

    }),
    methods: {
      onClick(sign) {
        console.log(sign)
      }
    }
  }
</script>
