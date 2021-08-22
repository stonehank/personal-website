<template>
    <div>
        <v-btn
                icon
                @click="showSearch"
        >
            <v-icon>fas fa-search</v-icon>
        </v-btn>
        <CommonModal
                :shiftY="0"
                width="100%"
                name="nav-search"
                v-model="showSearchModal"
        >
            <div class="modal-header">
                <h3 class="modal-title">Search</h3>
            </div>
            <div class="modal-body">
                <SearchSystem v-if="renderSearchSystem" :hideSearch="hideSearch" />
            </div>
        </CommonModal>
    </div>

</template>

<script>
    import CommonModal from "pagesDir/index/src/commons/CommonModal";
    export default {
        name: "Search",
        components: {
            SearchSystem:()=>import("pagesDir/index/src/commons/SearchSystem"),
            CommonModal
        },
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
