<template>
    <div>
        <v-btn
                icon
                @click="showSearch"
        >
            <v-icon>fas fa-search</v-icon>
        </v-btn>
        <CommonModal
                v-model="showSearchModal"
                :shift-y="0"
                width="100%"
                name="nav-search"
        >
            <div class="modal-header">
                <h3 class="modal-title">Search</h3>
            </div>
            <div class="modal-body">
                <SearchSystem v-if="renderSearchSystem" :hide-search="hideSearch" />
            </div>
        </CommonModal>
    </div>

</template>

<script>
    export default {
        name: "Search",
        data(){
            return {
                winW:window.innerWidth,
                showSearchModal:false,
                searchShrink:true,
                renderSearchSystem:false,
            }
        },
        methods:{
            showSearch(){
                this.showSearchModal=true
                this.renderSearchSystem=true
            },
            hideSearch(){
                this.showSearchModal=false
            }
        }
    }
</script>

<style scoped>
    .search-custom{
        transition:.5s;
    }
    .search-shrink{
        width:80px;
    }
    .search-expand{
        width:240px;
    }
</style>
