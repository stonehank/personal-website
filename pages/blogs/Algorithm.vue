<template>
    <v-skeleton-loader
        v-if="loading"
        type="table"
    ></v-skeleton-loader>
    <section v-else>
        <AlgorithmTable :items="algorithmList" />
    </section>
</template>

<script>

export default {
    name: 'Algorithm',
    async asyncData(){
        const algorithmJson = await import('doc/leetcode/.leetcode-list.json')
        const arr = []
        for (const k in algorithmJson) {
            if (algorithmJson[k].hasThinking) arr.push(algorithmJson[k])
        }
        return {
            algorithmList: arr,
            loading: true,
        }
    },
    mounted(){
        this.$nextTick(function(){
             this.loading=false
        })
    },
}
</script>

<style scoped></style>
