<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        icon
                        @click="showBookmark"
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon>far fa-bookmark</v-icon>
                    <v-icon x-small class="bookmark-config-icon">fas fa-cog</v-icon>
                </v-btn>
            </template>
            <span>书签管理器</span>
        </v-tooltip>
        <CommonModal
                name="bookmark"
                class="transparent"
                v-model="bookmarkShow"
        >
            <div class="transparent py-2">
                <div class="modal-header justify-center">
                    <h3>书签管理器</h3>
                    <img :src="require('imagesDir/bookmark.svg')" class="bookmark-popup" />
                </div>
                <div class="modal-body">
                    <div v-if="bookmark==null" class="w-100 d-flex justify-center align-center">
                        <v-btn large
                               color="success"
                        >
                            <v-icon small class="mr-1">fas fa-plus</v-icon>
                            添加书签
                        </v-btn>
                    </div>
                </div>
                <div class="modal-footer">
                    <v-btn
                            @click="hideBookmark"
                    >
                        返回
                    </v-btn>
                </div>
            </div>
        </CommonModal>
    </div>
</template>

<script>
    import CommonModal from "pagesDir/index/src/commons/CommonModal";
    export default {
        name: "BookMark",
        components: {CommonModal},
        data(){
            return {
                bookmarkShow:false,
                bookmark:null
            }
        },
        created(){

        },
        methods:{
            showBookmark(){
                this.bookmarkShow=true
            },
            hideBookmark(){
                this.bookmarkShow=false
            }
        }
    }
</script>

<style scoped>
    .bookmark-popup{
        width: 52px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .bookmark-config-icon{
        font-size: 12px !important;
        position: absolute !important;
        left: 12px !important;
        bottom: 50% !important;
        background: var(--foreground-color) !important;
        padding: 0 !important;
        width: 12px !important;
        height: 12px !important;
    }
</style>
