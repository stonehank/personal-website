<template>
    <div>
        <v-btn
                icon
                @click="showSearch"
        >
            <v-icon>fas fa-search</v-icon>
        </v-btn>
        <CommonModal
                name="nav-search"
                v-model="showSearchModal"
        >
            <div class="modal-header">
                <h3 class="modal-title">Search</h3>
            </div>
            <div class="modal-body">
                <v-text-field
                        rounded
                        dense
                        outlined
                        hide-details
                >
                    <template v-slot:append>
                        <v-icon>fas fa-search</v-icon>
                    </template>
                </v-text-field>
            </div>
        </CommonModal>
    </div>

</template>

<script>
    import CommonModal from "pagesDir/index/src/commons/CommonModal";
    export default {
        name: "Search",
        components: {CommonModal},
        data(){
            return {
                showSearchModal:false,
                searchShrink:true,
            }
        },
        methods:{
            showSearch(){
                this.showSearchModal=true
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
