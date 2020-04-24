<template>
  <div
    id="app"
    class="font-sans antialiased min-h-screen flex flex-col bg-gradient"
  >
    <div class="container mx-auto">
      <div class="lg:max-w-5xl lg:mx-auto">
        <div class="flex flex-row justify-between items-center mt-6">
          <Logo />

          <Menu @switchLanguage="setLocale($event)" />
        </div>

        <div class="lg:grid lg:grid-cols-2 lg:gap-6">
          <div>
            <base-select
              v-model="city"
              class="mt-12"
              :options="location"
            ></base-select>
            <base-date class="mt-8"></base-date>
            <div class="grid grid-cols-2 gap-6 mt-8">
              <base-card
                icon="sun"
                :time="formatDate(this.current.schedule.sifir)"
                :name="$t('syfyr')"
              ></base-card>
              <base-card
                icon="moon"
                :time="formatDate(this.current.schedule.iftar)"
                :name="$t('iftar')"
              ></base-card>
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
          <base-card
            :time="this.$dayjs('2020-05-24 05:46').format('DD MMMM - HH:mm')"
            :name="$t('bajram')"
          ></base-card>
          <base-card
            :time="this.$dayjs('2020-05-10').format('DD MMMM')"
            :name="$t('bedri')"
          ></base-card>
          <base-card
            :time="this.$dayjs('2020-05-19').format('DD MMMM')"
            :name="$t('kadri')"
          ></base-card>
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
import Menu from "./components/Menu";
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
    Menu,
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
        period: null
      },
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
      const diffIftar = this.$dayjs(this.current.schedule.iftar).diff(
        this.current.date,
        "hour",
        true
      );
      const diffSifir = this.$dayjs(this.current.schedule.sifir).diff(
        this.current.date,
        "hour",
        true
      );

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
    }
  },
  mounted() {
    this.$on("setLocale", event => {
      console.log(event);
    });
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
