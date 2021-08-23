<template>
    <v-container fluid>
        <v-row>
            <div class="accord-wrapper" :style="`height:${wrapperHeight}px`">
                <div
                        v-for="(info,index) in infoList"
                        :key="index"
                        :style="isMobile ? null : `transform:skew(-20deg,0)`"
                        class="skew-box"
                        :class="{
                          'widthlow':curSelected!=null && curSelected!==index,
                          'widthmax':curSelected!=null && curSelected===index,
                          [`color-${index+1}`]:true
                        }"
                >
                    <div class="accord-content">
                        <h4>{{info.title}}</h4>
                        <div class="smoky mt-2">
                            <p>{{info.message}}</p>
                            <v-btn
                                    v-if="curSelected===index"
                                    class="mt-2"
                                    color="success"
                                    depressed
                                    :to="info.path"
                            >
                                更多
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    // import anime from 'animejs'

    export default {
        name: "HomeOverview",
        props: {
            run: Boolean,
        },
        watch: {
            run: {
                immediate: true,
                handler(newV) {
                    if (this.runAnimation) return
                    if (!newV) return
                    this.startAnimation()
                }
            }
        },
        data() {
            return {
                wrapperHeight:window.innerHeight,
                runAnimation: false,
                curSelected: null,
                infoList: [
                    {
                        title: '源码阅读笔记',
                        message: '对一些中小型热门项目进行源码阅读和分析，对其整体做出导图，以便快速了解内部执行顺序',
                        path:'/blogs/sourceCode'
                    },
                    {
                        title: '力扣算法思路分享',
                        message: 'Leetcode题解(Javascript)，一些题目思路分享',
                        path:'/blogs/algorithm'
                    },
                    {
                        title: '个人项目',
                        message: '个人部分开源项目',
                        path:'/projects'
                    },
                ]
            }
        },
        mounted() {
            let self = this
            $('.skew-box').on('click', function () {
                let index = $(this).index()
                if (self.curSelected === index) {
                    self.curSelected = null
                    return
                }
                self.curSelected = index
            })
        },
        methods: {
            updateSize(){
                this.wrapperHeight=window.innerHeight
            },
            startAnimation() {
                if (this.isMobile) {
                    return
                }
                // anime({
                //     targets: '.skew-box',
                //     translateY: ['-100%','0%'],
                //     delay: (el, i) => i * 100,
                //     duration: 300,
                //     easing: 'easeInCirc'
                // })
            }
        }
    }
</script>

<style scoped lang="scss">


</style>
