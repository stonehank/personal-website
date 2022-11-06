<template>
    <section class="w-100">
        <div class="d-flex mb-2 align-center">
            <v-switch
                v-model="globalSwitchStatus"
                :loading="loadingGlobal"
                class="my-0 py-0 mr-1"
                hide-details
                @change="confirm"
            >
            </v-switch>
            <span>全局搜索</span>
            <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                    <v-icon v-bind="attrs" small v-on="on">
                        far fa-question-circle
                    </v-icon>
                </template>
                <span>加载全部内容搜索</span>
            </v-tooltip>
        </div>
        <v-text-field
            :loading="loadingGlobal"
            :disabled="loadingGlobal"
            dense
            outlined
            autofocus
            hide-details
            @input="debounceSearch"
        >
            <template #append>
                <v-icon>fas fa-search</v-icon>
            </template>
        </v-text-field>
        <v-divider class="my-2"></v-divider>
        <ResultsAnalysis
            :hide-search="hideSearch"
            :query="query"
            :after-global-done="afterGlobalDone"
            :global="global"
        />
        <CommonModal
            v-model="showConfirm"
            name="confirm-search"
            :click-to-close="false"
        >
            <v-card>
                <v-card-title>确定吗</v-card-title>
                <v-card-text>
                    使用全局搜索会一次性加载大约 <b>{{ globalSize }}kb</b>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="cancelGlobal"> 取消 </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="startGlobal"> 确认 </v-btn>
                </v-card-actions>
            </v-card>
        </CommonModal>
    </section>
</template>

<script>
import ResultsAnalysis from './ResultsAnalysis'
const debounce = require('./debounce')
export default {
    name: 'SearchSystem',
    components: { ResultsAnalysis },
    props: {
        hideSearch: Function,
    },
    data() {
        return {
            query: null,
            global: false,
            globalSwitchStatus: false,
            showConfirm: false,
            loadingGlobal: false,
        }
    },
    computed: {
        globalSize: function () {
            return (process.env.globalSize / 1024).toFixed(0)
        },
    },
    methods: {
        debounceSearch: debounce(function (val) {
            this.query = val
        }, 500),
        afterGlobalDone() {
            this.loadingGlobal = false
        },
        confirm(globalStatus) {
            if (!globalStatus) {
                this.global = false
                return
            }
            if (this.$state.existGlobal) {
                this.global = true
            } else {
                this.showConfirm = true
            }
        },
        cancelGlobal() {
            this.showConfirm = false
            this.globalSwitchStatus = false
        },
        startGlobal() {
            this.$state.add('existGlobal', true)
            this.loadingGlobal = true
            this.global = true
            this.showConfirm = false
        },
    },
}
</script>

<style scoped></style>
