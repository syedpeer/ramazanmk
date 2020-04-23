<template>
  <div id="app" class="font-sans antialiased min-h-screen flex flex-col bg-gradient">
    <div class="container mx-auto">
      <div class="lg:max-w-5xl">
        <div class="flex flex-col mt-6">
          <h1 class="text-3xl lg:text-5xl font-semibold">Ramazan</h1>
          <div class="bg-white rounded mt-2 h-2 w-20"></div>
        </div>
        <base-select v-model="city" class="mt-12" :options="location"></base-select>
        <base-date class="mt-8" date="28 Prill" year="2020"></base-date>
        <div class="grid grid-cols-2 gap-6 mt-8">
          <base-card icon="sun" :time="formatDate(this.current.schedule.sifir)" name="Syfyr"></base-card>
          <base-card icon="moon" :time="formatDate(this.current.schedule.iftar)" name="Iftar"></base-card>
        </div>

        <div class="mt-8">
            <base-card name="Koha e mbetur" icon="timer">
                <timer :start="current.period"></timer>
            </base-card>
        </div>

        <div class="-mx-6 lg:mx-0 mt-10">
          <base-table :items="this.modified"></base-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "./data/schedule.json";
import Timer from "./components/Timer";
import BaseSelect from "./components/BaseSelect";
import BaseDate from "./components/BaseDate";
import BaseCard from "./components/BaseCard";
import BaseTable from "./components/BaseTable";

export default {
  name: "app",
  components: {
    Timer,
    BaseSelect,
    BaseDate,
    BaseCard,
    BaseTable
  },
  data() {
    return {
      city: localStorage.getItem("city") || "GV",
      current: {
        date: this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        city: null,
        schedule: null,
        period: null,
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

      // let schedule = this.getToday();

      // console.log(this.$dayjs(schedule.iftar)
      //         .add(this.current.city.value, "minute")
      //         .format("YYYY-MM-DD HH:mm:ss"));

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
    getToday(day = 1) {
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
      // TODO: switch with this.current.date
      const today = new Date("2020-04-24 16:36");
      const diffIftar = this.$dayjs(this.current.schedule.iftar).diff(today, "hour", true);
      const diffSifir = this.$dayjs(this.current.schedule.sifir).diff(today, "hour", true);

      console.log(diffSifir);
      console.log(diffIftar);

      if (diffSifir > 0) {
        this.current.period = this.getFullDate(this.current.schedule.sifir);
      }

      if (diffSifir < 0 && diffIftar > 0) {
        this.current.period = this.getFullDate(this.current.schedule.iftar);
      }

      if (diffSifir < 0 && diffIftar < 0) {
        let date = this.getToday(2);

        this.current.period = this.getFullDate(date.sifir);
      }
    }

  },
  watch: {
    city(value) {
      this.getCurrentData();
      this.getData();

      localStorage.setItem("city", value);
    }
  },
  created() {
    this.getCurrentData();
    this.getData();
    this.checkTimePeriod();

    this.$dayjs.locale("sq");
  }
};
</script>
