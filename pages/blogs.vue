<template>
    <section class="d-flex">
        <v-navigation-drawer
            v-if="!$getIsMobile()"
            permanent
            fixed
            class="pa-4"
            :style="{
                top: $getNavH() + 'px',
                left: 0,
            }"
        >
            <v-list>
                <v-list-item to="/blogs/default">
                    <v-list-item-title>日常记录</v-list-item-title>
                </v-list-item>
                <v-list-item to="/blogs/sourcecode">
                    <v-list-item-title>源码阅读</v-list-item-title>
                </v-list-item>
                <v-list-item to="/blogs/algorithm">
                    <v-list-item-title>算法系列</v-list-item-title>
                </v-list-item>
                <v-list-item to="/blogs/archive">
                    <v-list-item-title>时间归档</v-list-item-title>
                </v-list-item>
                <v-list-item to="/blogs/label">
                    <v-list-item-title>标签归档</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container class="pa-0" :style="!$getIsMobile() ? 'margin-left:256px' : ''">
            <nuxt-child />
        </v-container>
    </section>
</template>

<script>
export default {
    name: 'Blogs',
}
</script>

<style scoped>
.v-list .v-list-item--active {
    color: var(--theme-primary) !important;
}
</style>
