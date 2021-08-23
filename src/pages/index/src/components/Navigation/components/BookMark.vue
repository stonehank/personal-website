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
                    <p v-if="this.bmList.length===0" class="text-secondary text-lg">
                        还没有书签
                    </p>
                    <v-list v-else dense class="w-100">
                        <v-list-item v-for="(bm,index) in bmList"
                                     :to="bm.pathname + bm.hash"
                                     @click="()=>onClick(bm)"
                                     :key="index" >
                            <v-list-item-content>
                                <v-list-item-title >{{bm.title}}</v-list-item-title>
                                <v-list-item-subtitle>{{bm.pathname + bm.hash}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon @click.prevent.stop="()=>removeBookMark(index)">
                                    <v-icon small color="error">fas fa-trash-alt</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </div>
                <div class="modal-footer">
                    <v-btn
                            @click="hideBookmark"
                    >
                        返回
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="addBookMark"
                           v-if="!pageHasMarked"
                           color="success"
                    >
                        <v-icon small class="mr-1">fas fa-plus</v-icon>
                        添加书签
                    </v-btn>
                </div>
            </div>
        </CommonModal>
    </div>
</template>

<script>
    import CommonModal from "pagesDir/index/src/commons/CommonModal";
    import {getFromCache,setCache} from "pagesDir/index/src/utils/cacheControl";
    import {scrollTo} from "pagesDir/index/src/utils";
    export default {
        name: "BookMark",
        components: {CommonModal},
        data(){
            return {
                bookmarkShow:false,
                cacheKey:'pw-bookmarks',
                bmList:[],
                pageHasMarked:false
            }
        },
        created(){
            this.bmList=getFromCache(this.cacheKey) || []
        },
        methods:{
            onClick(bookmark){
                if(bookmark.hash && bookmark.pathname === location.pathname){
                    scrollTo(bookmark.hash)
                }
            },
            updateHasMarked(){
                this.pageHasMarked=this.bmList.find(mark=>mark.path===location.pathname + location.hash)
            },
            showBookmark(){
                this.updateHasMarked()
                this.bookmarkShow=true
            },
            hideBookmark(){
                this.bookmarkShow=false
            },
            addBookMark(){
                let newBookMark={
                    pathname:location.pathname,
                    title:document.title,
                    hash:location.hash
                }
                this.bmList.push(newBookMark)
                setCache(this.cacheKey,this.bmList)
                this.pageHasMarked=true
            },
            removeBookMark(index){
                this.bmList.splice(index,1)
                setCache(this.cacheKey,this.bmList)
                this.updateHasMarked()
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
