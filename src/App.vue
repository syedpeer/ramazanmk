<template>
  <div id="app" class="font-sans antialiased flex flex-col">
    <div class="container mx-auto pt-32">
      <div class="max-w-md">
        <div :start="this.current" class="mb-4 font-bold text-xl"></div>
        <select
          v-if="location.length"
          class="w-64 h-12 bg-gray-300"
          v-model="city"
          name="city"
          id="city"
        >
          <option
            v-for="(item, index) in location"
            :key="index"
            :value="item.shortcode"
          >{{ item.name }}</option>
        </select>
        <div v-if="schedule.length" class="flex flex-row mt-12 justify-between">
          <div class="flex flex-col">
            <p v-for="item in getIftarTime" :key="item.id">{{ item }}</p>
          </div>

          <div class="flex flex-col">
            <p v-for="item in getSyfirTime" :key="item.id">{{ item }}</p>
          </div>
        </div>

        <div class="mt-32 font-bold text-xl">{{ getTodayIftar }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "./data/schedule.json";

export default {
  name: "app",
  components: {},
  data() {
    return {
      date: this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      city: "GV",
      current: {
        city: null,
        schedule: null
      },
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
    formatDate(item) {
      return this.$dayjs(item)
        .add(this.current.city.value, "minute")
        .format("HH:mm");
    },
    getToday(day = 1) {
      let date = this.$dayjs(this.date)
        .add(day, "day")
        .format("YYYY-MM-DD");

      return this.schedule.find(item => {
        return item.data === date.toString();
      });
    }
  },
  computed: {
    getIftarTime() {
      return this.schedule.map(item => {
        return this.formatDate(item.iftar);
      });
    },

    getSyfirTime() {
      return this.schedule.map(item => {
        return this.formatDate(item.sifir);
      });
    },

    getTodayIftar() {
      // TODO: Switch to this.date
      const today = new Date("2020-04-24 20:36");
      const difference = this.$dayjs(this.current.schedule.iftar).diff(
        today,
        "hour",
        true
      );

      if (difference > 0) {
        return this.$dayjs(this.current.schedule.iftar);
      }

      if (difference < 0) {
        const date = this.getToday(2);

        return this.formatDate(date.iftar);
      }
    }
  },
  watch: {
    city() {
      this.getCurrentData();
    }
  },
  created() {
    this.getCurrentData();

    this.$dayjs.locale("sq");
  }
};
</script>
