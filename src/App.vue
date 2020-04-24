<template>
  <div id="app" class="font-sans antialiased min-h-screen flex flex-col bg-gradient">
    <div class="container mx-auto">
      <div class="lg:max-w-5xl lg:mx-auto">
        <div class="flex flex-row justify-between items-center mt-6">
            <Logo/>

          <div @click="menu = !menu" class="w-10 h-10 z-20 rounded-full bg-white shadow-input flex items-center justify-center cursor-pointer relative">
            <icon name="menu" class="w-6 h-6 text-primary"></icon>
            <transition
                    enter-active-class="transition-all ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to="transform opacity-0 scale-95"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                    leave-active-class="transition-all ease-in duration-75">
              <div v-show="menu" class="md:w-64 origin-top-right bg-white z-20 shadow-input absolute top-0 right-0 rounded-xl overflow-hidden mt-12">
                  <div @click="setLocale('sq')" class="flex flex-row items-center px-8 py-5 text-primary text-xl border-b border-gray-300 hover:bg-gray-300">
                      <icon name="albania" class="w-8 h-8 mr-6"></icon>
                      Shqip
                  </div>
                  <div @click="setLocale('tr')" class="flex flex-row items-center px-8 py-5 text-primary text-xl border-b border-gray-300 hover:bg-gray-300">
                    <icon name="turkey" class="w-8 h-8 mr-6"></icon>
                    Türkçe
                  </div>
                  <div @click="setLocale('mk')" class="flex flex-row items-center px-8 py-5 text-primary text-xl hover:bg-gray-300">
                    <icon name="macedonia" class="w-8 h-8 mr-6"></icon>
                      Македонски
                  </div>
              </div>
            </transition>
          </div>
         <div @click="menu = false" v-show="menu" style="background-color: rgba(0, 0, 0, 0.69)" class="absolute inset-0 w-full h-full z-10"></div>
        </div>

        <div class="lg:grid lg:grid-cols-2 lg:gap-6">
          <div>
            <base-select v-model="city" class="mt-12" :options="location"></base-select>
            <base-date class="mt-8"></base-date>
            <div class="grid grid-cols-2 gap-6 mt-8">
              <base-card icon="sun" :time="formatDate(this.current.schedule.sifir)" :name="$t('syfyr')"></base-card>
              <base-card icon="moon" :time="formatDate(this.current.schedule.iftar)" :name="$t('iftar')"></base-card>
            </div>

            <div class="mt-8">
              <base-card :name="$t('timeleft')" icon="timer">
                <timer :start="current.period"></timer>
              </base-card>
            </div>
          </div>

          <div class="-mx-6 lg:mx-0 mt-10">
            <base-table :items="this.modified"></base-table>
          </div>
        </div>


         <div class="grid lg:grid-cols-3 gap-6 mt-8">
          <base-card :time="this.$dayjs('2020-05-24 05:46').format('DD MMMM - HH:mm')" :name="$t('bajram')"></base-card>
          <base-card :time="this.$dayjs('2020-05-10').format('DD MMMM')" :name="$t('bedri')"></base-card>
          <base-card :time="this.$dayjs('2020-05-19').format('DD MMMM')" :name="$t('kadri')"></base-card>
        </div>

        <base-footer></base-footer>
      </div>
    </div>
  </div>
</template>

<script>
import json from "./data/schedule.json";
import Timer from "./components/Timer";
import Logo from "./components/Logo";
import BaseFooter from "./components/BaseFooter";
import BaseSelect from "./components/BaseSelect";
import BaseDate from "./components/BaseDate";
import BaseCard from "./components/BaseCard";
import BaseTable from "./components/BaseTable";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default {
  name: "app",
  components: {
    Timer,
    Logo,
    BaseFooter,
    BaseSelect,
    BaseDate,
    BaseCard,
    BaseTable
  },
  data() {
    return {
      language: localStorage.getItem("language") || "sq",
      city: localStorage.getItem("city") || "GV",
      current: {
        date: this.$dayjs(),
        city: null,
        schedule: null,
        period: null,
      },
      menu: false,
      modified: null,
      schedule: json.schedule,
      location: json.city
    };
  },
  methods: {
    getCurrentData() {
      this.current.city = this.location.find(item => {
        return item.shortcode === this.city;
      });

      this.current.schedule = this.getToday();
    },
    getFullDate(item) {
      return this.$dayjs(item)
        .add(this.current.city.value, "minute")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    formatDate(item) {
      return this.$dayjs(item)
        .add(this.current.city.value, "minute")
        .format("HH:mm");
    },
    getToday(day = 0) {
      let date = this.$dayjs(this.current.date)
        .add(day, "day")
        .format("YYYY-MM-DD");

      return this.schedule.find(item => {
        return item.data === date.toString();
      });
    },
    parseDate(name) {
      return this.schedule.map(item => {
        return this.formatDate(item[name]);
      });
    },
    getData() {
      let sifir = Object.values(this.parseDate("sifir"));
      let iftar = Object.values(this.parseDate("iftar"));
      let date = Object.values(this.schedule.map(item => item.data));

      let output = [];

      for (let i = 0; i < sifir.length; i++) {
        output.push({
          data: date[i],
          sifir: sifir[i],
          iftar: iftar[i]
        });
      }

      this.modified = output;
    },

    checkTimePeriod() {
      const diffIftar = this.$dayjs(this.current.schedule.iftar).diff(this.current.date, "hour", true);
      const diffSifir = this.$dayjs(this.current.schedule.sifir).diff(this.current.date, "hour", true);


      if (diffSifir > 0) {
        this.current.period = this.getFullDate(this.current.schedule.sifir);
      }

      if (diffSifir < 0 && diffIftar > 0) {
        this.current.period = this.getFullDate(this.current.schedule.iftar);
      }

      if (diffSifir < 0 && diffIftar < 0) {
        let date = this.getToday(1);
        this.current.period = this.getFullDate(date.sifir);
      }
    },
    setLocale(string) {
      this.$i18n.locale = string;
      this.language = string;
      this.$dayjs.locale(string);
      localStorage.setItem("language", string);
    }
  },
  watch: {
    city(value) {
      this.getCurrentData();
      this.checkTimePeriod();
      this.getData();

      localStorage.setItem("city", value);
    },
    menu(value){
      const bodyTag = document.querySelector('body');

      if (value) {
        bodyTag.classList.add('overflow-hidden');
      } else {
        bodyTag.classList.remove('overflow-hidden');
      }
    }
  },
  created() {
    this.getCurrentData();
    this.getData();
    this.checkTimePeriod();

    this.$dayjs.extend(customParseFormat);
    this.$dayjs.locale(this.language);
    this.$i18n.locale = this.language;
  }
};
</script>
