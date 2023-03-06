<template>
   <v-app
   :class="$vuetify.breakpoint.mdAndUp ? 'larg' : 'small' "
   >
    
    <HeaderComponent/>
    <v-container class="background" fluid>
        
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
    


    <v-row
    no-gutters
    :justify="$vuetify.breakpoint.mdAndUp ? 'center' : 'center'"
    >
    <v-col 
    align-self="center"
    class="d-flex flex-column justify-center align-center"
    md="6"
    xs="12"
    >
    <v-carousel hide-delimiters :continuous="false" >

        <v-icon  

        :class="$vuetify.breakpoint.mdAndUp ? 'lrg-icon' : 'sm-icon' "
         style=" margin-top:30px ;  top:100px; font-size: 60px; position: absolute;" color="success">
         mdi-doctor
         </v-icon>
        <v-btn width="50" @click="loading">تخطي</v-btn>
    <v-carousel-item
    >
   <v-row
   justify="center"
   style="margin-top: 170px;"
   class="text-center"
   >
    <v-col
    md="6"
    sm="7"
    xs="12"
    class="direction__btn"
   >
   <h1 style="color: #20262E; font-size: 40px"> طبيب </h1>
           <h3 style="color: #332C39; font-size: 30px"> أفضل الخدمات الطبية </h3>
           <p style=" color: #567189; font-weight: 400; font-size: 20px; ">موقع طبيب يقدملكم جميع الخدمات الطبية وأفضلها من اطباء واطباء اسنان وصيدليات ومختبرات ومراكز اشعة ومستشفيات  </p>
           
   </v-col>
   </v-row>
    </v-carousel-item>
    <v-carousel-item
    >
   <v-row
   justify="center"
   style="margin-top: 170px;"
   class="text-center"
   >
    <v-col
    md="6"
    sm="7"
    xs="12"
    class="direction__btn"
   >
   <h1 style="color: #20262E; font-size: 40px"> طبيب </h1>
           <h3 style="color: #332C39; font-size: 30px"> طبيبك يمك</h3>
           <p style=" color: #567189; font-weight: 400; font-size: 20px; "> وية طبيب ما تحتاج تدوخ راسك وتبحث عن اي طبيب بالفيسبوك او تسأل احد لأن راح تجد الاطباء وكافة الخدمات الطبية مع موقعهم </p>
           
   </v-col>
   </v-row>
    </v-carousel-item>
   
    
    <v-carousel-item
    >
   <v-row
   justify="center"
   style="margin-top: 170px;"
   class="text-center"
   >
    <v-col
    md="6"
    sm="7"
    xs="12"
    
   >
   <v-btn
    @click="loading" 
    class="text-h5 success py-6"  
    style="margin-top: 50px;"
    
     >ابدأ الاستخدام</v-btn>
   </v-col>
   </v-row>
    </v-carousel-item>  
  </v-carousel>
       
    </v-col>

    </v-row>

    </v-container>
   </v-app>
   
</template>

<script>
import loadingDialog from '@/components/LoadingDialog.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';



export default {
    name:'WelcomeView',
    components :{
        loadingDialog,
        HeaderComponent
    },
    data(){
        return{
            snackbar: false,
            snackBarText: "",
            snackBarColor: "",
            loadingDialog: false,
           
        }
    },
    methods: {

        
         copy () {
            try {
                   navigator.clipboard.writeText(this.text);
                   this.snackbar=true
                   this.snackBarText="تم نسخ النص"
                   this.snackBarColor="success"
 } catch (e) {
     console.log(e);
 }
           
        },

        loading(){
            this.loadingDialog= true
            setTimeout(()=>{
                this.$router.push({ name: 'FinalApp' })
            } , 2000);

       
        }
       
    },
   
}


// document.addEventListener('DOMContentLoaded', () => {
  
//   }
// });
</script>

<style lang="scss" scoped >
.background {
  background: url("@/assets/medical-background7.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}


.lrg-icon{
    right:340px;
}

.sm-icon{
    right: 135px;
}


.v-window__prev .v-btn:hover, .v-window__next .v-btn:hover {
    background: none;
    background-color: #4caf50;
}

</style>