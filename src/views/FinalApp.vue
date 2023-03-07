

<template>
  
  <v-app style="padding: 0;">
    <v-content style="padding: 0;" >
      <v-card>
         <v-tabs v-model="tab" background-color="teal" dark icons-and-text >
          <v-tabs-slider></v-tabs-slider>
          
          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            class="t"
            href="#tab-1"
          >
            اطباء
            <v-icon>mdi-doctor</v-icon>
          </v-tab>

          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            href="#tab-2"
          >
            اطباء اسنان
            <v-icon>mdi-tooth</v-icon>
          </v-tab>

          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            href="#tab-3"
          >
            صيدليات
            <v-icon>mdi-medication</v-icon>
          </v-tab>

          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            href="#tab-4"
          >
            مختبرات
            <v-icon>mdi-home</v-icon>
          </v-tab>

          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            href="#tab-5"
          >
            مراكز اشعة/سونار
            <v-icon>mdi-head</v-icon>
          </v-tab>

          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            href="#tab-6"
          >
            عيادات الضماد
            <v-icon>mdi-hospital</v-icon>
          </v-tab>

          <v-tab
            :class="$vuetify.breakpoint.mdAndUp ? 'larg-margin' : 'small-margin' "
            href="#tab-7"
          >
            مستشفيات
            <v-icon>mdi-domain</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-card flat>
              <DoctorsView />
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat>
              <DentistView />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-card flat>
              <PharmisyView />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-4">
            <v-card flat>
              <LabortaryView />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-5">
            <v-card flat>
              <RadiologyView />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-6">
            <v-card flat>
              <BandagView />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-7">
            <v-card flat>
              <HospitalView />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-content>
  </v-app>
</template>

<script >





import RadiologyView from "./RadiologyView.vue";
// import HomeView from "./HomeView.vue";
import DoctorsView from "./DoctorsView.vue";
import DentistView from "./DentistView";
import PharmisyView from "./PharmisyView.vue";
import HospitalView from "./HospitalView";
import BandagView from "./BandagView.vue";
import LabortaryView from "./LabortaryView.vue";

export default {
  name: "FinalApp",
  components: {

    DoctorsView,
    DentistView,
    PharmisyView,
    HospitalView,
    RadiologyView,
    BandagView,
    LabortaryView
  },

  data() {
    return {
      tab: null,
      vie:1,
    };
  
  },


   
};
</script>

<style>
.v-main {
  padding: 0;
}

.v-tabs--icons-and-text > .v-tabs-bar .v-tab.larg-margin {
  margin-right: 30px;
}
.v-tabs--icons-and-text > .v-tabs-bar .v-tab.larg-margin {
  margin-left: 70px;
}



.small-margin {
  margin-right: 0;
}
.v-list-item__content.align-end {
  flex: 2;
}
.v-list-item__content {
  flex: 1;
}

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