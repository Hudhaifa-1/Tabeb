<template>
     <v-container  class="background " fluid>
    <LoadingDialog  :visible="loadingDialog" />
    <v-snackbar
      app
      right
      transition="scroll-y-reverse-transition"
      v-model="snackbar"
      timeout="8000"
      :color="snackBarColor"
    >
      <p class="white--text ma-0">{{ snackBarText }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- we dont need it any more otpscreen -->
    <!-- <v-row
      style="height: 100%"
      
      v-if="!enterOTPScreen"
      no-gutters
      :justify="$vuetify.breakpoint.mdAndUp ? 'start' : 'center'"
    >
      <v-col
        align-self="center"
        class="d-flex flex-column justify-center align-center"
        md="6"
        xs="12"
      >
        <v-img
          class="mt-8"
          :width="$vuetify.breakpoint.xlOnly ? 250 : 125"
          contain
          src="@/assets/logo.svg"
        ></v-img>
        <v-card class="mt-8" width="450" min-width="200">
          <v-form class="py-4" ref="form" v-model="valid" lazy-validation>
            <p class="ma-0 text-h6 text-center">تسجيل الدخول</p>
            <v-card-text class="text-center">
              <v-row justify="center">
                <div style="width: 280px">
                  <v-row justify="center" class="my-2 mx-0">
                    <p
                      class="
                        text-capitalize
                        ma-0
                        secondary--text
                        text-subtitle-1
                      "
                    >
                      الدخول بواسطة رقم الهاتف
                    </p>
                  </v-row>
                  <v-row
                    style="height: 35px"
                    justify="center"
                    class="my-2 mx-0"
                  >
                    <v-col cols="8" class="textfield rounded-l pa-0">
                      <v-text-field
                        outlined
                        v-model="userData.phone_number"
                        placeholder="07xx"
                        height="35"
                        dense
                        hide-details
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="4"
                      class="
                        primary
                        rounded-r
                        pa-0
                        d-flex
                        justify-center
                        align-center
                      "
                    >
                      <p
                        @click="sendOTP"
                        class="
                          text-capitalize
                          ma-0
                          white--text
                          text-subtitle-1
                          hover
                        "
                      >
                        ارسال الرمز
                      </p>
                    </v-col>
                  </v-row>
                  <v-row
                    style="height: 35px"
                    justify="center"
                    class="my-2 mx-0"
                  >
                    <v-col cols="8" class="textfield rounded-l pa-0">
                      <v-text-field
                        outlined
                        v-model="verification_code"
                        height="35"
                        dense
                        hide-details
                        :disabled="!otpSent"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="4"
                      :class="{
                        secondary: verification_code != '',
                        opacity: verification_code == '',
                      }"
                      class="
                        primary
                        rounded-r
                        pa-0
                        d-flex
                        justify-center
                        align-center
                        hover
                      "
                    >
                      <p
                        @click="verifyOTP"
                        class="text-capitalize ma-0 white--text text-subtitle-1"
                      >
                        تأكيد الرمز
                      </p>
                    </v-col>
                  </v-row>
                  <p class="ma-0 my-1" v-if="otpSent">
                    تم ارسال الرمز الى رقم هاتفك
                  </p>
                  <p class="ma-0 mb-8" v-if="otpSent">
                    ({{ timerCount }}) اعادة ارسال؟
                  </p>
                  <v-row justify="center">
                    <p>أو</p>
                  </v-row>
                  <v-row justify="center" class="my-2 mx-0">
                    <v-btn
                      v-facebook-login-button="appId"
                      color="#4267B2"
                      width="200"
                      height="35"
                    >
                      <v-icon class="mx-2 white--text"> mdi-facebook </v-icon>
                      <p
                        class="text-capitalize ma-0 white--text text-subtitle-1"
                      >
                        Login with Facebook
                      </p>
                    </v-btn>
                  </v-row>
                  <v-row justify="center" class="my-2 mx-0">
                    <v-btn
                      @click="$router.push({ name: 'home' })"
                      color="primary"
                      width="200"
                      height="35"
                    >
                      <v-icon class="mx-2 white--text"> mdi-logout </v-icon>
                      <p
                        class="text-capitalize ma-0 white--text text-subtitle-1"
                      >
                        الدخول كضيف
                      </p>
                    </v-btn>
                  </v-row>
                  <v-divider class="grey my-3"></v-divider>
                  <v-row justify="center" class="my-1 mx-0">
                    <v-btn
                      @click="$router.push({ name: 'agentlogin' })"
                      color="secondary"
                      width="200"
                      height="35"
                    >
                      <v-img
                        height="15"
                        contain
                        src="@/assets/logo.svg"
                      ></v-img>
                      <p
                        class="text-capitalize ma-0 white--text text-subtitle-1"
                      >
                        الدخول كمندوب
                      </p>
                    </v-btn>
                  </v-row>
                  <p>
                    Registering to this website, you accept our
                    <span class="text-decoration-underline"> Terms of use</span>
                    and our
                    <span class="text-decoration-underline">
                      Privacy Policy</span
                    >
                  </p>
                </div>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row> -->
    <h1>hello login here</h1>
  </v-container>
</template>

<script>
import LoadingDialog from "@/components/LoadingDialog.vue";

export default{
    name: "LoginView",
    components:{LoadingDialog},
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