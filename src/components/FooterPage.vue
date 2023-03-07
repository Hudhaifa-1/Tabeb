<template>
    
    <v-footer
      padless
      dark
  
    >
      <v-card
        flat
        tile
        width="100%"
        class=" lighten-1 text-center"
      > 
      <v-img
          class="mt-1"
          contain
          height="50"
          src="@/assets/logo.webp"
        ></v-img>
     <v-col class="contact-me" >تواصل معي</v-col>
        <v-card-text >
          <v-btn
            class="mx-4"
            icon
            href="https://www.instagram.com/front.end.hudhaifa/"
            target="_blank"
          >
            <v-icon size="24px" color="teal">
              mdi-instagram
            </v-icon>
          </v-btn>

          <v-btn
            class="mx-4"
            icon
            href="https://www.linkedin.com/in/hudhaifa-muhammad/"
            target="_blank"
          >
            <v-icon size="24px" color="teal">
              mdi-linkedin
            </v-icon>
          </v-btn>

          <v-btn
            class="mx-4"
            icon
            href="https://www.facebook.com/profile.php?id=100088282575804"
            target="_blank"
          >
            <v-icon size="24px" color="teal">
              mdi-facebook
            </v-icon>
          </v-btn>

          <v-btn
            class="mx-4"
            icon
            href="mailto:aa0411724@gmail.com?subject = Feedback&body = Message"
            target="_blank"
          >
            <v-icon size="24px" color="teal">
              mdi-email
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text copy">
          <span >حذيفة</span>   —  {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>


</template>

<script>
  export default {
    name:"FooterPage",
    data: () => ({
      
    }),
    
  }
</script>

// <style scoped lang="scss">
// .contact-me,
// .copy,
// .copy span
// {
//   font-size: medium;
// }

// .larg{
//     font-size: large;
// }

// .small{
    
        
//         font-size: small;

//         .v-application {
//           font-size: small;
//   [class*="display-"],
//   [class*="text-"] {
//     font-size: small;
//   }
 
// }
  

    
// }

// </style>