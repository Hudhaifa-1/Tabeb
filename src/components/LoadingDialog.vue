<template>
    <v-dialog v-model="show" persistent width="350" content-class="elevation-0">
      <div class="d-flex justify-center align-center">
        <v-img  src="@/assets/TabebDialog.gif" height="250" width="250" contain>
        </v-img>
      </div>
    </v-dialog>
  </template>
  <script >
  export default {
    props: ["visible"],
    computed: {
      show: {
        get() {
          return this.visible;
        },
        set(value) {
          if (!value) {
            this.$emit("close");
          }
        },
      },
    },
  };
  </script>