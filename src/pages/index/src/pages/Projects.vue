<template>
    <v-container >
        <v-row>
            <v-col cols="12" sm="6" lg="4"
                   v-for="(projectInfo,index) in projectList"
                   :key="index"
            >
                <ProjectCard :project-info="projectInfo" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ProjectCard from "pagesDir/index/src/components/Projects/ProjectCard";
    export default {
        name: "Projects",
        components: {ProjectCard},
        data(){
            return {
                projectList:[
                    {
                        title:'React Valine',
                        img:require('../../../../assets/images/react-valine.png'),
                        description:'轻量级评论插件，后端数据保存使用<a href="https://www.leancloud.cn/">LeanCloud</a>，支持编辑评论功能',
                        path:'https://github.com/stonehank/react-valine',
                        preview_path:'https://stonehank.github.io/react-valine/'
                    },
                    {
                        title:'Diy Resume',
                        img:require('../../../../assets/images/diy-resume.png'),
                        description:`<ul>
                            <li class="mb-0">在线创建你的简历，免费下载或者导出为<code>json</code>格式</li>
                            <li class="mb-0">无后端，无 api 请求，使用 <code>IndexedDB</code> / <code>LocalStorage</code> / <code>Cookie</code> 保存用户输入</li>
                            <li class="mb-0">在<b>桌面端</b>可以通过拖拽，定义标签属性等创建或者修改模板</li>
                            </ul>
                        `,
                        path:'https://github.com/stonehank/diy-resume-live',
                        preview_path:'https://stonehank.github.io/diy-resume-live/'
                    },
                    {
                        title:'Html To Markdown',
                        img:require('../../../../assets/images/html-to-md.png'),
                        description:`一个用于转换HTML为Markdown的工具， 无任何依赖，支持nodeJS`,
                        path:'https://github.com/stonehank/html-to-md',
                        preview_path:'https://stonehank.github.io/html-to-md/'
                    },
                    {
                        title:'Image Compress Plugin',
                        img:require('../../../../assets/images/image-compress-plugin.png'),
                        description:`一个用于在Webpack打包时进行图片压缩的插件`,
                        path:'https://github.com/stonehank/image-compress-plugin',
                        preview_path:null
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
