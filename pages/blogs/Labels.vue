<template>
    <section id="tags-render-wrapper">
        <v-skeleton-loader
            v-if="tagsCountRenderList == null"
            type="article,image,list-item-two-line"
        ></v-skeleton-loader>
        <div
            v-else
            class="d-flex justify-center align-center position-relative"
        >
            <div
                v-for="(tagData, index) in tagsCountRenderList"
                :key="index"
                class="position-absolute pa-1 pa-sm-3"
                :style="{
                    top: tagData.y + 'px',
                    left: tagData.x + 'px',
                    width: tagData.w + 'px',
                    height: tagData.h + 'px',
                }"
            >
                <v-fade-transition>
                    <v-chip
                        v-if="show[index]"
                        :color="labelColor[tagData.label]"
                        label
                        tag="div"
                        :to="'/labels/' + tagData.label"
                        class="w-100 h-100 text-center justify-center"
                        :style="'font-size:' + tagData.fontSize + 'px'"
                        text-color="white"
                    >
                        {{ tagData.label }}
                    </v-chip>
                </v-fade-transition>
            </div>
        </div>
    </section>
</template>

<script>
import { getTagsCount } from 'utils/list-json-controller'
import TagsGenerator from 'utils/TagsGenerator'
import labelColor from 'utils/label-color'

export default {
    name: 'Labels',
    data() {
        return {
            tagsCountList: getTagsCount(),
            tagGenerator: null,
            tagsCountRenderList: null,
            show: [],
            timer: null,
        }
    },
    computed: {
        labelColor: () => labelColor,
    },
    mounted() {
        // $(window).on('resize',this.onResize)
        this.onResize()
        setTimeout(() => {
            this.loopShow(0)
        }, 100)
    },
    destroyed() {
        // $(window).off('resize',this.onResize)
    },
    methods: {
        loopShow(idx) {
            if (idx === this.tagsCountRenderList.length) return
            this.timer = setTimeout(() => {
                this.show[idx] = true
                this.show = this.show.slice()
                this.loopShow(idx + 1)
            }, 30)
        },
        onResize() {
            this.tagsCountRenderList = null
            const gap = this.$vuetify.breakpoint.xsOnly ? 4 : 14
            // console.log($('#tags-render-wrapper'))
            const containerW = Math.min(
                window.innerWidth,
                $('#tags-render-wrapper').width()
            )
            const containerH = window.innerHeight * 0.8
            const limit = this.$vuetify.breakpoint.xsOnly ? 5 : 2
            const shrink = this.$vuetify.breakpoint.xsOnly
            if (this.tagGenerator) {
                this.tagGenerator.update({
                    containerW,
                    containerH,
                    gap,
                    shrink,
                    limit,
                })
            } else {
                this.tagGenerator = new TagsGenerator(this.tagsCountList, {
                    containerW,
                    containerH,
                    gap,
                    shrink,
                    limit,
                })
            }
            this.tagsCountRenderList = this.tagGenerator
                .output()
                .sort((a, b) => b.orderIdx - a.orderIdx)
        },
    },
}
</script>

<style scoped></style>
