<template>
    <v-container fluid class="search-by">
      <loadingDialog :visible="loadingDialog" />
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
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">اغلاق</v-btn>
        </template>
      </v-snackbar>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="success darken-2 " class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="بحث"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="الترتيب حسب"
                class="blue--text"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="success darken-1" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="success darken-1" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.الاسم" cols="12" sm="6" md="4" lg="3">
              <v-card>
                <v-card class="d-flex">
                  <v-card-title class="subheading font-weight-bold">{{ item.الاسم }}</v-card-title>
                </v-card>
  
                <v-divider></v-divider>
  
                <v-list dense>
                  <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                    <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
  
                    <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">
                      {{ item[key.toLowerCase()] }}
                      <v-btn
                      @click="copy(item.الرقم_الثاني)"
                      v-if=" (key == 'الرقم_الثاني') && (item.الرقم_الثاني != '') && (item.الرقم_الثاني != ' ')"
                      style="flex: 0; margin-right: 5px; color: red; top: 6px;"
                    >نسخ</v-btn>
                      <v-btn
                        @click="copy(item.الرقم)"
                        v-if="(key == 'الرقم') && (item.الرقم != '') && (item.الرقم != ' ')"
                        style="flex: 0; margin-right: 5px; color: red; top: 6px;"
                      >نسخ</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
  
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span style="color:#1B5E20;">الاطباء لكل صفحة</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
  
            <v-spacer></v-spacer>
  
            <span class="mr-4" style="color: #1B5E20;">صفحة {{ page }} من {{ numberOfPages }}</span>
            <v-btn fab dark color="success darken-2" class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab dark color="success darken-2" class="ml-1" @click="nextPage">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </template>
  
    <script>
  import LoadingDialog from "./LoadingDialog.vue";
  export default {
    data() {
      return {
        copyText: "",
        snackbar: false,
        snackBarText: "",
        snackBarColor: "",
        loadingDialog: false,
        overlay: false,
        itemsPerPageArray: [4, 8, 12],
        search: "",
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: "Name",
        keys: ["الاسم", "التخصص", "الرقم", "الرقم_الثاني", "الموقع", "اوقات_الدوام"],
        items: [
          {
            الاسم: "ضماد الرحمة",
            التخصص: "ممرض/ ضماد ",
            الموقع: "مجمع الرحمة الطبي تقاطع حي الشرطة الجيش الشعبي ",
            الرقم: "٠٧٨٣١٩٢٠٣٤٩",
            الرقم_الثاني: "",
            اوقات_الدوام: " صباحا ومساءً"
          },
          {
            الاسم: "ربيع فرحان ابو احمد",
            التخصص: "ممرض/ طهور اطفال, ضماد ",
            الموقع: "طهور اطفال ضماد تداوي ",
            الرقم: "٠٧٨٣٠٠١٥٤٥٢",
            الرقم_الثاني: "٠٧٨٢٩٢٩٦٩٠٩",
            اوقات_الدوام: " "
          },
          {
            الاسم: " الجميلي للضماد",
            التخصص: "ممرض/ طهور, ضماد ",
            الموقع: "شارع الاسعاف الفوري ",
            الرقم: "٠٧٥٠٥١٧٦٦١٧",
            الرقم_الثاني: "",
            اوقات_الدوام: "  "
          },
          {
            الاسم: "بدري جاسم الخالدي",
            التخصص: "ممرض/طهور اطفال, ضماد   ",
            الموقع: "شارع الاسعاف الفوري ",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: " "
          },
          {
            الاسم: " عادل زين علي",
            التخصص: "ممرض/طهور اطفال تداوي قياس ضغط  ",
            الموقع: " شارع الاسعاف الفوري ",
            الرقم: "٠٧٨٠١٥١٧٢٧٧",
            الرقم_الثاني: "",
            اوقات_الدوام: "  "
          },
          {
            الاسم: " عثمان جاسم حسين ",
            التخصص: "ممرض/طهور ضماد   ",
            الموقع: "شارع الاسعاف الفوري قيصرية صيدلية الحسنى ",
            الرقم: "٠٧٨٣٠٨١١٩٨١ ",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: " محمد حامد عبود",
            التخصص: "ممرض/ ضماد ",
            الموقع: " ",
            الرقم: "٠٧٩٠٣٥٥٧٨٢٢ ",
            الرقم_الثاني: "",
            اوقات_الدوام: " "
          },
          {
            الاسم: " ابو عزوز الراوي",
            التخصص: "ممرض/ ضماد ",
            الموقع: " مجمع الحارثية الطبي شارع الاستخبارات مقابل الاطراف الصناعية ",
            الرقم: "٠٧٨٣١٨٦٤٨٤٠",
            الرقم_الثاني: "",
            اوقات_الدوام: " "
          },
          {
            الاسم: "ضماد مجمع الكندي ",
            التخصص: "ممرض/ضماد نسائي رجالي  ",
            الموقع: " مجمع الكندي مجاور المستشفى العام ",
            الرقم: "٠٧٨١٦٦٤٥٦٢٣",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٣ الى ١٠ مساء الجمعة عطلة "
          },
          {
            الاسم: " ضماد مجمع الوليد ",
            التخصص: "ممرض/ ضماد  ",
            الموقع: " مجمع الوليد الطبي مقابل باب الطوارئ للمستشفى ",
            الرقم: "٠٧٧١٤٢٩١١٠٨",
            الرقم_الثاني: "",
            اوقات_الدوام: " ٣ مساء الى ٩ مساء  "
          },
          {
            الاسم: "ضماد عين الحياة",
            التخصص: "ممرض/ ضماد  ",
            الموقع: "مجمع عين الحياة مقابل باب الطوارئ للمستشفى العام ",
            الرقم: "٠٧٨١١٧٠٢٠٦٠",
            الرقم_الثاني: "",
            اوقات_الدوام: "  من ٣ الى ٩ مساء"
          },
          {
            الاسم: " مصطفى مفيد العاني",
            التخصص: "ممرض/ضماد, عمليات صغرى  ",
            الموقع: " ",
            الرقم: "٠٧٩٠١٢٢٣٥٨٦",
            الرقم_الثاني: "",
            اوقات_الدوام: "٣ الى ٩ مساء "
          },
          {
            الاسم: " ضماد نسائي",
            التخصص: "ممرض/ ضماد  ",
            الموقع: "مجمع الفارابي الطبي مقابل كلية طب الفلوجة  ",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٢ الى ٨ مساء  "
          },
          {
            الاسم: " ضماد الرازي ",
            التخصص: "ممرض/ ضماد  ",
            الموقع: "مجمع الرازي الطبي مقابل كلية طب الفلوجة  ",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: " مساءً"
          },
          {
            الاسم: " ضماد الفاو",
            التخصص: "ممرض/ ضماد, تخطيط قلب ",
            الموقع: " مجمع الفاو الطبي خلف المستشفى العام ",
            الرقم: "٠٧٨٢١٠٤٤٤١٠",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٣ الى ١٠ ليلا "
          },
          {
            الاسم: "ضماد الابرار",
            التخصص: "ممرض/ ضماد  ",
            الموقع: "مجمع الابرار الطبي خلف المستشفى العام  ",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: " "
          },
          {
            الاسم: " مجمع رفقة ",
            التخصص: "ممرض/ ضماد ",
            الموقع: " مجمع صيدلية رفقة مجاور المستشفى العام",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: " ثلاثاء اربعاء خميس"
          },
          {
            الاسم: "مجمع البلسم  ",
            التخصص: "ممرض/ ضماد ",
            الموقع: " مجمع البلسم مقابل باب الطوارئ بوابة رقم ٣",
            الرقم: "٠٧٨٢٩٠٧٩٣٤٣",
            الرقم_الثاني: "",
            اوقات_الدوام: " كل ايام الاسبوع عدا الجمعة عطلة "
          },
          {
            الاسم: "ضماد نسائي ",
            التخصص: "ممرض/ ضماد  ",
            الموقع: " مجمع زيونة مقابل باب الطوارئ ",
            الرقم: "٠٧٨١٦٨١٣٦٣٣",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٣ الى ٩ مساء الجمعة عطلة "
          },
          {
            الاسم: " ضماد الهلال",
            التخصص: "ممرض/ ضماد ,فحص ",
            الموقع: "مجمع الهلال الطبي مقابل باب الطوارئ بوابة رقم ٣ ",
            الرقم: "٠٧٨١٧٨٤٤٢٤٩",
            الرقم_الثاني: "",
            اوقات_الدوام: " من ٣ الى ٩ مساء الجمعة عطلة"
          },
          {
            الاسم: "ضماد دار الشفاء  ",
            التخصص: "ممرض/ ضماد, تخطيط قلب",
            الموقع: "مجمع دار الشفاء مجاور الاطراف الصناعية  ",
            الرقم: "٠٧٨٢٤٤٤١٠١٠",
            الرقم_الثاني: "",
            اوقات_الدوام: "صباحا ومساء ,الجمعة عطلة"
          },
          
        ]
      };
    },
    components: { LoadingDialog },
    computed: {
      numberOfPages() {
        return Math.ceil(this.items.length / this.itemsPerPage);
      },
      filteredKeys() {
        return this.keys.filter(key => key !== "name");
      }
    },
    methods: {
      nextPage() {
        if (this.page + 1 <= this.numberOfPages) this.page += 1;
      },
      formerPage() {
        if (this.page - 1 >= 1) this.page -= 1;
      },
      updateItemsPerPage(number) {
        this.itemsPerPage = number;
      },
      copy(copyItem) {
        try {
          this.copyText = copyItem;
          if (this.copyText == "..") {
            this.snackbar = true;
            this.snackBarText = "لا يوجد رقم";
            this.snackBarColor = "error";
          } else {
            navigator.clipboard.writeText(this.copyText);
            this.snackbar = true;
            this.snackBarText = "تم نسخ الرقم";
            this.snackBarColor = "success";
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  </script>
  
  <style lang="scss">
  </style>