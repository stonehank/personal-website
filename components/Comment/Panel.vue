<template>
    <vue-bbs :uniq-str="uniqStr" />
</template>

<script>
export default {
    props: {
        uniqStr: {
            type: String,
            default: process.client
                ? decodeURI(window.location.origin + window.location.pathname)
                : '',
        },
    },
}
</script>

<style scoped></style>
