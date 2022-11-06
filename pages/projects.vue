<template>
    <v-container>
        <v-row>
            <v-col
                v-for="(projectInfo, index) in projectList"
                :key="index"
                cols="12"
                sm="6"
                lg="4"
            >
                <ProjectCard :project-info="projectInfo" />
            </v-col>
        </v-row>
        <v-row id="project-comments">
            <h3 class="mb-4 mt-12">评论区</h3>
            <v-col cols="12">
                <client-only>
                    <CommentPanel uniq-str="project-page" />
                </client-only>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Projects',
    data() {
        return {
            projectList: [
                {
                    title: 'Vue BBS',
                    img: require('~/assets/images/react-valine.png'),
                    description:
                        'Serverless评论插件，后端数据保存使用Leancloud和Firebase，支持编辑评论功能',
                    path: 'https://github.com/stonehank/vue-bbs',
                    preview_path: 'https://stonehank.github.io/vue-bbs/',
                },
                {
                    title: 'Diy Resume',
                    img: require('~/assets/images/diy-resume.png'),
                    description: `<ul>
                            <li class="mb-0">纯前端在线创建简历，免费下载或者导出</li>
                            <li class="mb-0">在<b>桌面端</b>可以通过拖拽，定义标签属性等创建或者修改模板</li>
                            </ul>
                        `,
                    path: 'https://github.com/stonehank/diy-resume-live',
                    preview_path:
                        'https://stonehank.github.io/diy-resume-live/',
                },
                {
                    title: 'Html To Markdown',
                    img: require('~/assets/images/html-to-md.png'),
                    description: `一个用于转换HTML为Markdown的工具， 无任何依赖，支持nodeJS`,
                    path: 'https://github.com/stonehank/html-to-md',
                    preview_path: 'https://stonehank.github.io/html-to-md/',
                },
                {
                    title: 'Image Compress Plugin',
                    img: require('~/assets/images/image-compress-plugin.png'),
                    description: `一个用于在Webpack打包时进行图片压缩的插件`,
                    path: 'https://github.com/stonehank/image-compress-plugin',
                    preview_path: null,
                },
            ],
        }
    },
    mounted() {
        setTimeout(() => {
            this.detectHash()
        }, 500)
    },
    methods: {
        detectHash() {
            const hash = this.$route.hash
            const hashEle = document.getElementById(hash.slice(1))
            if (hashEle) {
                try {
                    window.scrollTo({
                        top: hashEle.offsetTop,
                    })
                } catch (_) {
                    const doc = document.documentElement || document.body
                    doc.scrollTop = hashEle.offsetTop
                }
            }
        },
    },
}
</script>

<style scoped></style>
