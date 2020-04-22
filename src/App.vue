<template>
  <div id="app" class="font-sans antialiased flex flex-col">
    <div class="container mx-auto pt-32">
      <div class="max-w-md">
        <select
          class="w-64 h-12 bg-gray-300"
          v-model="city"
          name="city"
          id="city"
        >
          <option
            v-for="(item, index) in location"
            :key="index"
            :value="item.shortcode"
          >
            {{ item.name }}
          </option>
        </select>
        <div class="flex flex-row mt-12 justify-between">
          <div class="flex flex-col">
            <p v-for="item in getIftarTime" :key="item.id">{{ item }}</p>
          </div>

          <div class="flex flex-col">
            <p v-for="item in getSyfirTime" :key="item.id">{{ item }}</p>
          </div>

          <div class="mt-32 font-bold text-xl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import json from "./data/schedule.json";

export default {
  name: "app",
  components: {},
  data() {
    return {
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
      return dayjs(item)
        .add(this.current.city.value, "minute")
        .format("HH:mm");
    },
    getToday() {
      let date = dayjs(new Date())
        .add(6, "day")
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
    }
  },
  watch: {
    city() {
      this.getCurrentData();
    }
  },
  mounted() {
    this.getCurrentData();
  }
};
</script>
