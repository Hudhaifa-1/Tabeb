<template>
  <v-app class="app">
    <v-main :class="$vuetify.breakpoint.mdAndUp ? 'larg' : 'small'">
      <div
      dark
        class="v__div"
        style="   position: fixed;
    z-index: 3000;
    left: -1px;
    height: 72px;
    text-align: center;
    width: 69px;
    background-color: #272727;
    border-radius: 0 5px 0px 
    /* font-size: 10px;
}"
      >
        <v-icon
          size="30"
          color="teal"
          style="    font-size: 24px;
    position: absolute;
    top: 15px;
    z-index: 100;
    left: 41px;"
        >mdi-eye</v-icon>
        <span
          style="position: absolute;
    z-index: 100;
    left: 7px;
    top: 15px;
    font-size: 17px;
    color: rgb(165, 225, 195);"
          id="visits"
        ></span>
        <span
          style="    position: absolute;
    z-index: 100;
    left: 4px;
    top: 40px;
    font-size: 13px;
    color: rgb(165, 225, 195);"
        >المشاهدات</span>
      </div>
      
      
      
      <v-main>
        <router-view></router-view>
        </v-main>
      
      
      <FooterPage />
    </v-main>
  </v-app>
</template>

<script>
import FooterPage from "./components/FooterPage.vue";
export default {
  name: "App",
  components: {
    FooterPage
  },

  data: () => ({
    //
  })
};
</script>

<style>
* {
  font-family: "Almarai", sans-serif;
  /* direction: rtl; */
  /* color: white; */
}

.v-application {
  direction: rtl;
}

.v-tabs {
  direction: ltr;
}
</style>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&family=Cairo:wght@300;400&family=Poppins:wght@400;500;600&display=swap");
$font-family: "Almarai";
.v-application {
  [class*="display-"],
  [class*="text-"] {
    font-family: $font-family, sans-serif !important;
  }
  font-family: $font-family, sans-serif !important;
}

// .larg{
//     font-size: large;
// }

// .small{

//         font-size: medium;
//         .v-application {
//           font-size: small;

//   [class*="display-"],
//   [class*="text-"] {
//     font-size: small;
//   }

// }

// }

.background{
  background: url("@/assets/med-wal.webp");
    background-repeat: no-repeat; 
    background-position: bottom;
    background-size: cover;
    height: 100%;
    overflow: hidden;
    width: 100%;
}
</style>

