<template>
    <v-app
    style="padding: 0;"
    :class="$vuetify.breakpoint.mdAndUp ? 'larg' : 'small' "
    >
    <v-container class="background" fluid >
  
      <loadingDialog  :visible="loadingDialog" />
      <v-snackbar
        app
        left
        transition="scroll-y-reverse-transition"
        v-model="snackbar"
        timeout="5000"
        :color="snackBarColor"
      >
        <p class="white--text ma-0">{{ snackBarText }}</p>
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            اغلاق
          </v-btn>
        </template>
      </v-snackbar>
      <SearchByPharmisyVue/>
    </v-container>
    
    </v-app>
  </template>
  
  <script>
   
  
import SearchByPharmisyVue from '@/components/SearchByPharmisy.vue';
  import LoadingDialog from '@/components/LoadingDialog.vue';
    export default {
      name: 'DentistView',
  
      components: {
        
        LoadingDialog,
        SearchByPharmisyVue
      },
  
      data(){
        return{
          snackbar: false,
              snackBarText: "",
              snackBarColor: "",
              loadingDialog: false,
        }
      }
    }
  </script>
  
  <style>
  .background {
    background: url("@/assets/doc-wal.jpeg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: bottom;
    background-size: cover;
    height: 100%;
    overflow: hidden;
  }
  
  
  </style>
  