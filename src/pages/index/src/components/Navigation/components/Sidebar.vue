<template>
   <div>
       <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
       <v-navigation-drawer
               v-model="drawer"
               app
               temporary
       >
           <v-list-item>
               <v-list-item-content>
                   <v-list-item-title>Hank</v-list-item-title>
               </v-list-item-content>
           </v-list-item>
           <v-divider></v-divider>
           <v-list dense>
               <v-list-item
                       v-for="item in items"
                       :key="item.title"
                       :to="item.to"
               >
                   <v-list-item-icon>
                       <v-icon small>{{ item.icon }}</v-icon>
                   </v-list-item-icon>
                   <v-list-item-content>
                       <v-list-item-title>{{ item.title }}</v-list-item-title>
                   </v-list-item-content>
               </v-list-item>
           </v-list>
       </v-navigation-drawer>
   </div>
</template>

<script>
    export default {
        name: "Sidebar",
        props:{
            items:Array,
        },
        data(){
            return {
                drawer:false,
            }
        }
    }
</script>

<style scoped>

</style>
