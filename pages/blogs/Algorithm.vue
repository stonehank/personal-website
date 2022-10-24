<template>
    <v-skeleton-loader
        v-if="algorithmList == null"
        type="table"
    ></v-skeleton-loader>
    <section v-else>
        <AlgorithmTable :items="algorithmList" />
    </section>
</template>

<script>
import algorithmJson from 'doc/leetcode/.leetcode-list.json'
export default {
    name: 'Algorithm',
    data() {
        return {
            timer: null,
            algorithmList: null,
        }
    },
    mounted() {
        const arr = []
        for (const k in algorithmJson) {
            if (algorithmJson[k].hasThinking) arr.push(algorithmJson[k])
        }
        this.timer = setTimeout(() => (this.algorithmList = arr), 200)
    },
    destroyed() {
        clearTimeout(this.timer)
    },
}
</script>

<style scoped></style>
