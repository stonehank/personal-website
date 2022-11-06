<template>
    <v-switch
        v-if="$vuetify.breakpoint.smAndDown"
        v-model="isDarkActive"
        inset
        hide-details
        color="#000"
    >
    </v-switch>
    <v-tooltip v-else bottom>
        <template #activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
                <v-switch
                    v-model="isDarkActive"
                    inset
                    hide-details
                    color="#000"
                >
                </v-switch>
            </div>
        </template>
        <span>{{ isDarkActive ? '暗色模式' : '亮色模式' }}</span>
    </v-tooltip>
</template>

<script>
import { getTheme, renderThemeOnHTML, setTheme } from 'utils/themeControl'

export default {
    name: 'Theme',
    data() {
        return {
            isDarkActive: null,
        }
    },

    watch: {
        isDarkActive(newV) {
            const bg = newV ? 'dark' : 'light'
            setTheme(bg)
            this.renderTheme(bg)
        },
    },

    mounted() {
        const backgroundColor = getTheme()
        this.isDarkActive = backgroundColor === 'dark'
    },

    methods: {
        renderTheme(backgroundColor) {
            this.$vuetify.theme.isDark = this.isDarkActive
            this.$vuetify.theme.applyTheme()
            renderThemeOnHTML(backgroundColor)
        },
    },
}
</script>

<style scoped></style>
