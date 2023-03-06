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
                        @click="copy(item.الرقم)"
                        v-if="(key == 'الرقم') && (item.الرقم != '')"
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
            الاسم: "ياسر عمار إسماعيل",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع سوبر فارما الطبي خلف المستشفى العام",
            الرقم: "07802634382",
            الرقم_الثاني: "",
            اوقات_الدوام: "كل الايام"
          },
          {
            الاسم: " احمد خالد خلف",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع الرازي خلف المستشفى العام",
            الرقم: "07827149871",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: "سؤدد جميل الخياط",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع دار الشفاء مجاور الاطراف الصناعية ",
            الرقم: "07825050886",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: "سؤدد سلمان عبد",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع البلسم الطبي مقابل باب الطوارئ الثالث شارع الاستخبارات ",
            الرقم: "07808866415",
            الرقم_الثاني: "",
            اوقات_الدوام: " ٢ ونص ظهرا الى ٥ عصرا, الخميس والجمعة عطلة"
          },
          {
            الاسم: "محمد اسماعيل الكبيسي",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع الكرادة الطبي مقابل باب طوارئ الجديد للمستشفى العام",
            الرقم: "07830933677",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: "علي قدوري جابر ",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع الفاو الطبي خلف المستشفى",
            الرقم: "07825454556",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: "منتهى العبدلي ",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع الرحمن مجاور مجمع السلام مقابل مركز الاسنان التخصصي",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: "الحجز بالعيادة ماكو تلفون حاليا الدوام الواحدة ظهرا, الثلاثاء والجمعة عطلة"
          },
          {
            الاسم: "ايمان يوسف",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع المدينة المنورة خلف المستشفى العام للنساء والاطفال",
            الرقم: "٠٧٨٣٥٥٠٨١٤٠",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: "رشا مزاحم رشيد العاني ",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع ألفا الطبي. قرب كلية طب الفلوجة",
            الرقم: "٠٧٨١٨٦٠٧٥٩٣",
            الرقم_الثاني: "",
            اوقات_الدوام: "كل الايام عدا الجمعة والسبت عطلة "
          },
          {
            الاسم: "وفاء محمود احمد",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "مجمع السلامة الطبي ش40 حي الشرطة نزلت جسر الحضرة",
            الرقم: "07819551732",
            الرقم_الثاني: "",
            اوقات_الدوام: "كل الايام  3 عصرا عدا الجمعة عطلة"
          },
          {
            الاسم: "يونس عبد الستار عكله الكبيسي ",
            التخصص: "طبيب/ سونار واشعة",
            الموقع: "شارع الاستخبارات،مجمع الفلوجة الطبي، مجاور مرطبات فستقه.",
            الرقم: "07745452009",
            الرقم_الثاني: "",
            اوقات_الدوام: "يوجد كادر نسائي مع الدكتور"
          },
          {
            الاسم: "اشعة الروعة",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع الروعة الطبي شارع الاستخبارات مقابل الأطراف الصناعية خلف المستشفى ",
            الرقم: "07811751197",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: " اشعة الفاو",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع الفاو الطبي خلف المستشفى العام ",
            الرقم: "٠٧٨٠٢٠٤١١٦٢",
            الرقم_الثاني: "٠٧٨١٥٣٣٦٤٢٠",
            اوقات_الدوام: "من ١ ظهرا الى ١٠ ليلا"
          },
          {
            الاسم: "اشعة عافية",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع عافية الطبي مقابل الاطراف الصناعية ",
            الرقم: "٠٧٨٣٠٤٢٧٧٤٢",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٢ ال ٩ مساء"
          },
          {
            الاسم: "اشعة بيروت",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع المجد الطبي مقابل الاطراف الصناعية ",
            الرقم: "٠٧٨٢٧٧٧٩٢٥٢",
            الرقم_الثاني: "",
            اوقات_الدوام: "اشعة نسائية كادر نسائي"
          },
          {
            الاسم: "اشعة رويال",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع رويال الطبي مقابل كلية طب الفلوجة ",
            الرقم: "٠٧٩٠١٨٠٥٠٩٨",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٢ الى ٩ مساء"
          },
          {
            الاسم: "اشعة الاندلس",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع الاندلس شارع الاسعاف الفوري ",
            الرقم: "07716614084",
            الرقم_الثاني: "",
            اوقات_الدوام: ""
          },
          {
            الاسم: "عيادة السلامة",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع السلامة الطبي نزلت جسر الحضرة ش اربعين",
            الرقم: "٠٧٨١٢٧٥١٤١٨",
            الرقم_الثاني: "",
            اوقات_الدوام: "من ٣ الى ٨ مساء "
          },
          {
            الاسم: " اشعة الشمس",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع السلام الطبي مقابل المحكمة القديمة ",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: "٠٧٩٠٥٢٢٨٢١٢"
          },
          {
            الاسم: "اشعة الزيدي",
            التخصص: "طبيب/اشعة",
            الموقع: "مجمع الزيدي مجاور كافتيريا قيس",
            الرقم: "",
            الرقم_الثاني: "",
            اوقات_الدوام: "صباحا ومساء"
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