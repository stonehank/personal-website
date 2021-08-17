<template>
    <div>
        <section>
            <HomeOverview :run="run" />
        </section>
        <section :style="{
            minHeight:`calc(100vh - ${$custom_data.getNavH()}px)`
        }" >
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h2>评论区</h2>
                    </v-col>
                    <v-col cols="12">
                        <ValineInVue uniq-str="home-page" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
    import HomeOverview from "pagesDir/index/src/components/HomeOverview";
    import ValineInVue from "pagesDir/index/src/components/ValineInVue";
    export default {
        name: "Home",
        components:{
            ValineInVue,
            HomeOverview,
        },
        data(){
            return {
                run:false,
                options: {
                    paddingTop:this.$custom_data.getNavH() + 'px',
                },
                startList: [false, false, false],
                latestBlogList:null,
                latestAlgorithmList:null,
                timer:null,
            }
        },
        mounted() {
            this.timer=setTimeout(()=>{
                this.run=true
            },200)

        },
        destroyed() {
            clearTimeout(this.timer)
        },
    }
</script>

<style scoped>

</style>
