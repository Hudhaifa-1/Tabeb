<template>
  <v-container fluid class="search-by">

    <LoadingDialog :visible="loadingDialog" />
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
        <v-toolbar dark color="teal  " class="mb-1">
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
              <v-btn large depressed color="teal " :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="teal " :value="true">
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
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >{{ item[key.toLowerCase()] }}
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
          <span style="color:teal;">الاطباء لكل صفحة</span>
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

          <span class="mr-4" style="color: teal;">صفحة {{ page }} من {{ numberOfPages }}</span>
          <v-btn fab dark color="teal " class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="teal " class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

  <script>

  
  import LoadingDialog from './LoadingDialog.vue';

export default {
  components:{LoadingDialog},
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
          الاسم: "سهى العبدلي",
          التخصص: "اسنان/",
          الموقع: "مجمع الرحمن قرب المحكمه القديمه",
          الرقم: "07810356407",
          الرقم_الثاني: "",
          اوقات_الدوام: "الحجز للنساء و الاطفال فقط"
        },
        {
          الاسم: "ثامر احمد سعد الكبيسي",
          التخصص: "اسنان/",
          الموقع: "مجمع الشفاء الطبي",
          الرقم: "07737137529",
          الرقم_الثاني: "07817604273",
          اوقات_الدوام: ""
        },
        {
          الاسم: "رؤى صالح فرحان",
          التخصص: "اسنان/",
          الموقع: "مجمع دار الشفاء ، الطابق الثاني ،خلف مستشفى الفلوجه",
          الرقم: "07810356407",
          الرقم_الثاني: "",
          اوقات_الدوام: "الحجز للنساء و الاطفال فقط"
        },
        {
          الاسم: "محمد جزاع ",
          التخصص: "اسنان/",
          الموقع: "مجمع الفاو خلف المستشفى العام ",
          الرقم: "07818696371",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: " زيد توفيق لطيف الزيدي",
          التخصص: "اسنان/",
          الموقع: "مجمع ملائكة الرحمة - شارع العيادة الشعبية - تقاطع الجمهورية  ",
          الرقم: "07811112040",
          الرقم_الثاني: "",
          اوقات_الدوام: " جميع الايام عدا يوم الجمعة "
        },
        {
          الاسم: "عبير احمد فرحان ",
          التخصص: "اسنان/",
          الموقع: "حي المعلمين _شارع الكبيسات _مجمع الاقصى ",
          الرقم: "07822667518",
          الرقم_الثاني: "",
          اوقات_الدوام: "كل الايام عدا الجمعة عطلة ."
        },
        {
          الاسم: " مروه حازم ابراهيم السامرائي",
          التخصص: "اسنان/",
          الموقع: "شارع 40 نزله جسر الحضره المحمديه بجانب معرض زينه وخزينه للاثاث مجمع السلامه الطبي",
          الرقم: "٠٧٨٢٦٨٤٦٥٩٥",
          الرقم_الثاني: "٠٧٨٠٩٨٩٤٤٧٤",
          اوقات_الدوام: ""
        },
        {
          الاسم: "زهير الفياض",
          التخصص: "اسنان/",
          الموقع: "مجمع عين الحياة الطبي مقابل باب طوارئ المستشفى",
          الرقم: "07800345556",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "سعد عبد اللطيف عويد العاني",
          التخصص: "اسنان/",
          الموقع: "مجمع الجشعي صيدلية رفقة مجاور المستشفى العام من جهة الشارع العام",
          الرقم: "07835551236",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "عمر جهاد",
          التخصص: "اسنان/",
          الموقع: "مجمع الانوار المحمدية خلف المستشفى",
          الرقم: "07805935148",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "كوثر فاروق الراوي",
          التخصص: "اسنان/",
          الموقع: "مجمع الروعة الطبي شارع الاستخبارات خلف المستشفى العام",
          الرقم: "07807463170",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "اوس عبد العزيز",
          التخصص: "اسنان/",
          الموقع: "مجمع الفارابي الطبي مقابل باب الطوارئ القديم لمستشفى الفلوجه التعليمي",
          الرقم: "07813989848",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "علاء ناظم البكري",
          التخصص: "اسنان/",
          الموقع: "مجمع الهلال الطبي مقابل باب طوارئ الجديد للمستشفى العام",
          الرقم: "07822305049",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "نهاد ناظم البكري ",
          التخصص: "اسنان/",
          الموقع: "مجمع الهلال الطبي مقابل باب طوارئ المستشفى الجديد",
          الرقم: "07822305049",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "لقاء حمد على الله الجنابي",
          التخصص: "اسنان/",
          الموقع: "مجمع عين الحياة مقابل باب طوارئ القديم للمستشفى",
          الرقم: "07831005060",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "مهند احمد كامل",
          التخصص: "اسنان/",
          الموقع: "مجمع الامانة الطبي شارع الاستخبارات خلف المستشفى التعليمي",
          الرقم: "07824240200",
          اوقات_الدوام: "يبدأ الحجز الساعة 2 ظهرا"
        },
        {
          الاسم: "لطيفة فاضل المحمدي",
          التخصص: "اسنان/",
          الموقع: "مجمع بلقيس الطبي مقابل العيادة الشعبية ",
          الرقم: "٠٧٨٢١٣٩٩٣٣٥",
          الرقم_الثاني: "",
          اوقات_الدوام: "يبدأ الحجز ١ ظهرا"
        },
        {
          الاسم: "احمد عطا محيميد ",
          التخصص: "اسنان/طب وجراحة الاسنان ",
          الموقع: "الحي العسكري شارع الجيش الشعبي قرب صيدلية قطر الندى ",
          الرقم: "07800681368",
          الرقم_الثاني: "",
          اوقات_الدوام: "دوام الدكتور يوميا من الساعه 1:00 ضهرا"
        },
        {
          الاسم: "مروى عبد برهان",
          التخصص: "اسنان/",
          الموقع: "مجمع الحارث مقابل مكوى الرداء الابيض شارع الاستخبارات ",
          الرقم: "07804260072",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "جيهان احمد كامل",
          التخصص: "اسنان/",
          الموقع: "مجمع الامانة الطبي شارع الاستخبارات خلف المستشفى العام",
          الرقم: "07824240200",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "احمد كاظم هدلان",
          التخصص: "اسنان/",
          الموقع: "خلف جامع الراوي مجاور د. ابراهيم حامد فتحي",
          الرقم: "07802376964",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "مصطفى خالد خلف",
          التخصص: "اسنان/",
          الموقع: "مجمع الرحمن الطبي مقابل العيادة الشعبية",
          الرقم: "07814031454",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "لمياء خيري",
          التخصص: "اسنان/",
          الموقع: "مجمع الشفاء الطبي",
          الرقم: "07811042697",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "حسام رمزي النعيمي",
          التخصص: "اسنان/",
          الموقع: "مجمع الخضراء مقابل المحكمة القديمة",
          الرقم: "07805036284",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "ذكاء محمد سليمان",
          التخصص: "اسنان/",
          الموقع: "مجمع الخضراء مقابل المحكمة القديمة",
          الرقم: "07832808141",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: " ثامر يوسف حمادي العيساوي",
          التخصص: "اسنان/",
          الموقع: "مجمع الخضراء مقابل المحكمة القديمة",
          الرقم: "07808759229",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "نبهان سعدون صالح",
          التخصص: "اسنان/",
          الموقع: "مجمع عين الحياة خلف المستشفى العام",
          الرقم: "07818442270",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "نجاد كامل حمد ",
          التخصص: "اسنان/",
          الموقع: "مجمع البلسم الطبي شارع الاستخبارات قرب مستشفى الفلوجة العام",
          الرقم: "07818485672",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "رحاب فيصل احمد ",
          التخصص: "اسنان/",
          الموقع: "مجمع عافية الطبي مقابل الأطراف الصناعية خلف المستشفى العام ",
          الرقم: "07824914765",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "امنة اياد رحيم",
          التخصص: "اسنان/",
          الموقع: "مجمع الرازي خلف المستشفى العام",
          الرقم: "07831820618",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: " هالة جاسم حسن",
          التخصص: "اسنان/",
          الموقع: "مجمع الفاو خلف المستشفى العام",
          الرقم: "07829410760",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "مروة محمود خليفة",
          التخصص: "اسنان/",
          الموقع: "شارع العيادة الشعبية مقابل الاسعاف الفوري",
          الرقم: "07828366837",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: " عبد الله حمدي فهد الكبيسي",
          التخصص: "اسنان/",
          الموقع: "شارع العيادة الشعبية مقابل الاسعاف الفوري",
          الرقم: "07826999074",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "طارق محمد المحمدي",
          التخصص: "اسنان/",
          الموقع: "مجمع الشفاء الطبي",
          الرقم: "07814361141",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "عبد الناصر حاتم الراوي",
          التخصص: "اسنان/",
          الموقع: "مجمع الشفاء الطبي",
          الرقم: "0781234197",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "ضحى جاسم العلواني",
          التخصص: "اسنان/",
          الموقع: "مجمع المدينة المنورة خلف المستشفى العام ",
          الرقم: "07814344322",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "عمر محمود عواد المحمدي ",
          التخصص: "اسنان/",
          الموقع: "مقابل الصيدليه المركزيه ع شارع  الثرثار",
          الرقم: "07814317219",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "وهب عبد الغني العاني",
          التخصص: "اسنان/",
          الموقع: "مجمع دار الشفاء الطبي مجاور الاطراف الصناعية",
          الرقم: "07810166077",
          الرقم_الثاني: "",
          اوقات_الدوام: "كل الايام عدا يوم الاثنين عطلة"
        },
        {
          الاسم: "نضال نواف القيسي ",
          التخصص: "اسنان/",
          الموقع: "مجمع الحياة الطبي شارع 40 مجاور طيبه مول",
          الرقم: "07822703393",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "اسامة علي عبد",
          التخصص: "اسنان/",
          الموقع: "مجمع حجي عريبي حي نزال مقابل جامع الفردوس",
          الرقم: "07801767766",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "براء طارق",
          التخصص: "اسنان/",
          الموقع: "مجمع العادل الطبي شارع صناعة الجولان قرب مدرسة جنين",
          الرقم: "07832568869",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "جاسم علي جاسم ",
          التخصص: "اسنان/",
          الموقع: "مجمع سوبر فارما الطبي مقابل كلية طب الفلوجة ",
          الرقم: "07824914765",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "صهيب محمد عواد الجنابي ",
          التخصص: "اسنان/اخصائي تقويم اسنان",
          الموقع: "مجمع الفاو الطبي خلف مستشفى الفلوجة العام في عيادة د. هالة جاسم حسن",
          الرقم: "07829410760",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "منتهى علي القيسي",
          التخصص: "اسنان/",
          الموقع: "شارع الاسعاف الفوري مجاور الصيدلية الذهبية",
          الرقم: "07828188545",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "ازهر سعدون خلف",
          التخصص: "اسنان/طب وجراحة الاسنان",
          الموقع: "مجمع الفاو الطبي خلف المستشفى العام",
          الرقم: "07819337333",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: " اسماء علي حسين",
          التخصص: "اسنان/",
          الموقع: "مجمع صيدلية التهاني شارع اربعين قرب صيدلية العرين",
          الرقم: "07901779295",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "ايمن عبد المجيد احمد",
          التخصص: "اسنان/",
          الموقع: "مجمع الخضراء الطبي مقابل المحكمة القديمة",
          الرقم: "07822832955",
          الرقم_الثاني: "07834910405",
          اوقات_الدوام: ""
        },
        {
          الاسم: "محمد سعود ندا",
          التخصص: "اسنان/",
          الموقع: "مجمع زيونه مقابل باب الطوارئ الجديد للمستشفى العام",
          الرقم: "07830637463",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "التخصصية",
          التخصص: "اسنان/طب وتجميل الاسنان",
          الموقع: "مجمع الروعة الطبي شارع الاسخبارات قرب المستشفى ",
          الرقم: "07822276376",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "علاء سعدي العاني ",
          التخصص: "اسنان/",
          الموقع: "مجمع الحارثية الطبي خلف مستشفى الفلوجة التعليمي ",
          الرقم: "07815730719",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "ليث حمود",
          التخصص: "اسنان/ تقويم الأسنان",
          الموقع: "مجمع الشفاء الطبي",
          الرقم: "٠٧٨٠٠٢٩٣٨٣٢",
          الرقم_الثاني: "",
          اوقات_الدوام: "الدوام يوم الاثنين فقط"
        },
        {
          الاسم: " امجد حميد تركي",
          التخصص: "اسنان/",
          الموقع: "مجمع الحياة الطبي مقابل كافيتريا الأكارم",
          الرقم: "٠٧٨٢٦٢٧٧٢٢٠",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "عمر محمد لايف",
          التخصص: "اسنان/",
          الموقع: "مجمع البلسم الطبي مقابل باب الطوارئ القديم للمستشفى",
          الرقم: "٠٧٨٠٣٤٧٥٣٨٢",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "محمد تيسير العاني",
          التخصص: "اسنان/",
          الموقع: "مجمع الأندلس مقابل الإسعاف الفوري ",
          الرقم: "٠٧٨٠٤٥٣٦٥٣٠",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "مصطفى نوري الراوي",
          التخصص: "اسنان/",
          الموقع: "مجمع عيادات الفلوجة الطبي خلف المستشفى العام خلف متوسطة ابن خلدون ",
          الرقم: "٠٨٧٠٣٨٢٣٢١٥",
          الرقم_الثاني: "٠٧٨١٨٠٩٨٣٨٨",
          اوقات_الدوام: ""
        },
        {
          الاسم: "احمد شهاب احمد",
          التخصص: "اسنان/",
          الموقع: "شارع الثرثار عمارة الصيدلية المركزية",
          الرقم: "٠٧٨٠٢٢٢١٧١٢",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "محمد إسماعيل المحمدي",
          التخصص: "اسنان/",
          الموقع: "مجمع الحياة مقابل الأكارم",
          الرقم: "٠٧٩٠٥٦٣٥٢٥٠",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: " حلا رجب الحمداني",
          التخصص: "اسنان/طب وجراحة الأسنان",
          الموقع: "شارع الاسعاف الفوري مجاور الصيدلية الذهبي",
          الرقم: "٠٧٨١٢٤٥٨٥٨٤",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "نور عايد وسمي",
          التخصص: "اسنان/طب وجراحة الفم والاسنان",
          الموقع: "مجمع اسبرين شارع الاستخبارات مقابل باب الطوارئ بوابة رقم ٣",
          الرقم: "07707683874",
          الرقم_الثاني: "",
          اوقات_الدوام: ""
        },
        {
          الاسم: "عبدالقادر قاسم محمد",
          التخصص: "اسنان/",
          الموقع: "حي الشهداء _ مجمع حي الشهداء الطبي _ مقابل جامع الشمري",
          الرقم: "07505238147",
          الرقم_الثاني: "",
          اوقات_الدوام: "من السبت إلى الخميس 3:00 - 7:00 مساءا"
        },
        
      ]
    };
  },
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
        if (this.copyText == ".." || this.copyText == ""  ) {
          this.snackbar = true;
          this.snackBarText = "لا يوجد رقم";
          this.snackBarColor = "error";
        } else {
          navigator.clipboard.writeText(this.copyText);
          this.snackbar = true;
          this.snackBarText = "تم نسخ الرقم";
          this.snackBarColor = "teal";
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