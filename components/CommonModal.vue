<template>
    <modal
        :ref="modalName"
        :name="modalName"
        :adaptive="true"
        height="auto"
        :scrollable="true"
        :classes="classes"
        v-bind="$attrs"
        @before-open="beforeOpen"
        @before-close="beforeClose"
        @opened="opened"
        @closed="closed"
        v-on="$listeners"
    >
        <slot></slot>
    </modal>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
    name: 'CommonModal',
    model: {
        prop: 'show',
        event: 'input',
    },
    props: {
        show: Boolean,
        name: String,
        classes: {
            type: String,
            default: 'v--modal',
        },
    },
    data() {
        return {
            uuid: uuidv4(),
            newShow: this.show,
            scrollBarW: this.getScrollbarWidth(),
            prevPadRight: null,
        }
    },
    computed: {
        modalName: function () {
            return this.name + '_' + this.uuid
        },
    },
    watch: {
        newShow(newV, oldV) {
            console.log(newV, oldV)
            if (newV) {
                this.$modal.show(this.modalName)
            } else {
                this.$modal.hide(this.modalName)
            }
            this.$emit('input', newV)
        },
        show(newV) {
            if (newV === this.newShow) return
            this.newShow = newV
        },
    },
    mounted() {
        this.appendInBody()
    },
    methods: {
        hasScrollbar() {
            return (
                document.body.scrollHeight >
                (window.innerHeight || document.documentElement.clientHeight)
            )
        },
        getScrollbarWidth() {
            const scrollDiv = document.createElement('div')
            scrollDiv.style.cssText =
                'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
            document.body.appendChild(scrollDiv)
            const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
            document.body.removeChild(scrollDiv)
            return scrollbarWidth
        },
        appendInBody() {
            document
                .getElementById('taskInfoModalWrap')
                .appendChild(this.$refs[this.modalName].$el)
        },
        beforeOpen() {
            if (this.hasScrollbar()) {
                const $html = $('html')
                this.prevPadRight = $html.css('paddingRight')
                $html.css('overflow', 'hidden')
                $html.css('paddingRight', this.scrollBarW + 'px')
            }
            this.$emit('before-open')
        },
        opened() {
            this.$emit('opened')
        },
        beforeClose(event) {
            const $html = $('html')
            $html.css('overflow', 'auto')
            $html.css('paddingRight', this.prevPadRight)
            this.$emit('before-close', event)
        },
        closed() {
            this.$emit('closed')
            this.newShow = false
        },
    },
}
</script>

<style scoped></style>
