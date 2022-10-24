<template>
    <Sidebar v-if="$vuetify.breakpoint.smAndDown" :items="items" />
    <div v-else>
        <v-btn
                v-for="item in items"
                :key="item.title"
                :to="item.to"
                text
                large
        >
            {{item.title}}
        </v-btn>
    </div>
</template>

<script>
    import Sidebar from "./Sidebar.vue";
    export default {
        name: "Action",
        components: {Sidebar},
        data(){
            return {
                items:[
                    {title:'首页',icon:'fas fa-home',to:"/"},
                    {
                        title:'博客',
                        icon:'fas fa-file',
                        to:"/blogs",
                        children:[
                            {title:'日常记录',icon:null,to:"/blogs/default"},
                            {title:'源码阅读',icon:null,to:"/blogs/sourcecode"},
                            {title:'算法系列',icon:null,to:"/blogs/algorithm"},
                            {title:'时间归档',icon:null,to:"/blogs/archive"},
                            {title:'标签归档',icon:null,to:"/blogs/labels"},
                        ]},
                    {title:'项目',icon:'fas fa-project-diagram',to:"/projects"},
                ]
            }
        }
    }
</script>

<style scoped>

</style>
