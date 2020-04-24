<template>
  <div
    id="app"
    class="font-sans antialiased min-h-screen flex flex-col bg-gradient"
  >
    <div class="container mx-auto">
      <div class="lg:max-w-5xl lg:mx-auto">
        <div class="flex flex-row justify-between items-center mt-6">
          <!-- The logo of the application (component) -->
          <Logo />

          <!-- The Menu of the application (component) Switching the language  -->
          <Menu @switchLanguage="setLocale($event)" />
        </div>

        <div class="lg:grid lg:grid-cols-2 lg:gap-6">
          <div>
            <!-- The Base Select shows the city options (component) -->
            <base-select
              v-model="city"
              class="mt-12"
              :options="location"
            ></base-select>
            <!-- The Base Date shows the current date (component) -->
            <base-date
              :year="this.$dayjs().format('YYYY')"
              :date="this.$dayjs().format('DD MMMM')"
              class="mt-8"
            ></base-date>
            <!-- This Base Cards show the next sifir and iftar (component) The information comes from the data. The data is calculated from getToday() -->
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
            <!-- This Base Card shows the remaining time for iftar or sifir (component) -->
            <div class="mt-8">
              <base-card :name="$t('timeleft')" icon="timer">
                <timer :start="current.period"></timer>
              </base-card>
            </div>
          </div>
          <!-- The Base Table shows fasting schedule for the entire month of Ramadan (component) -->
          <div class="-mx-6 lg:mx-0 mt-10">
            <base-table :items="this.modified"></base-table>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-6 mt-8">
          <base-card :name="$t('nijeti')">
            <p class="text-sm text-primary">{{ $t("nijetiArabisht") }}</p>
          </base-card>
          <base-card :name="$t('duaja')">
            <p class="text-sm text-primary">{{ $t("duajaArabisht") }}</p>
          </base-card>
        </div>

        <!-- This Base Card shows other important event dates within Ramadan (component) -->
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
        <!-- The Base Footer shows the Lucky Media footer (component) -->
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
import PullToRefresh from "pulltorefreshjs";

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

  /* The language and the city are saved in the data, retreived from the local storage or default value is given
   * The current is used for calculating the next sifir and iftar, and sends data to the timer for the timeleft
   * The current section has the current datetime, selected city, the schedule for today, the period is for the timer as a start time (iftar or sifir)
   * The modified sends the monthly schedule to the base-table component. This one is changed +- minutes depending on the city.
   * The schedule is the base date, calculated for Skopje only and it doesn't change. The modified array changes by getting this data as the base
   * The location has all the cities, their shortcode and the value (+- minutes) to be used for calculating the modified array
   * */

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
    /* We get the shortcode from city and give it to current city and we calculate the
     * schedule for today for that city
     */
    getCurrentData() {
      this.current.city = this.location.find(item => {
        return item.shortcode === this.city;
      });
    },

    getSchedule(day = 0) {
      this.current.schedule = this.getToday(day);
    },

    /* The value that is sent here, gets the data for Skopje and it gives +- minutes depending on the value of the chosen city
     * This value is used for the timer component
     */
    getFullDate(item) {
      return this.$dayjs(item)
        .add(this.current.city.value, "minute")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    /* We calculate the scheduled times for a certain city for the entire month and we calculate the minutes +- depending on the value
     * This is used for the base table component
     */
    formatDate(item) {
      return this.$dayjs(item)
        .add(this.current.city.value, "minute")
        .format("HH:mm");
    },
    /* We get the schedule for today. But, if iftar has passed, we add +1 day and get the schedule for tomorrow.
     * This value is used for the timer component
     */
    getToday(day = 0) {
      let date = this.$dayjs(this.current.date)
        .add(day, "day")
        .format("YYYY-MM-DD");

      return this.schedule.find(item => {
        return item.data === date.toString();
      });
    },
    /* The schedule is received as an object and we want
     * to transform it into an array.
     */
    parseDate(name) {
      return this.schedule.map(item => {
        return this.formatDate(item[name]);
      });
    },
    /* After we get the data as an array from parseDate, we can make a new array for the base table component
     * The output is saved in the modified data
     */
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

    /* This method checks if the current time has passed sifir or iftar
     *  and it sends to the timer the correct value for starting.
     *
     *  1. We check the difference of the current moment and the current iftar on the schedule
     *  2. We check the difference of the current moment and the current sifir on the schedule
     *  3. If the difference is greater, the sifir hasn't passed yet. We sent the sifir as the start time
     *  4. If the difference is smaller for sifir, but greater for iftar, the sifir
     *     has passed but the iftar hasn't passed yet. We sent the iftar as the start time.
     *  5. If both the sifir and iftar are smaller, than both have passed.
     *     We need to calculate the sifir for the next day  We sent the sifir of the next day as the start time
     *
     *
     */

    checkTimePeriod() {
      const iftarTime = this.getFullDate(this.current.schedule.iftar);
      const sifirTime = this.getFullDate(this.current.schedule.sifir);

      const diffIftar = this.$dayjs(iftarTime).diff(
        this.current.date,
        "millisecond",
        true
      );

      const diffSifir = this.$dayjs(sifirTime).diff(
        this.current.date,
        "millisecond",
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

        // Change the schedule for next day
        this.getSchedule(1);
      }
    },

    // Here we set the value for the language of the app and dayjs
    setLocale(string) {
      this.$i18n.locale = string;
      this.language = string;
      this.$dayjs.locale(string);
      localStorage.setItem("language", string);
    }
  },
  watch: {
    // We wait for a change on the chosen city and then recalculate the data
    city(value) {
      this.getCurrentData();
      this.checkTimePeriod();
      this.getSchedule();
      this.getData();

      localStorage.setItem("city", value);
    }
  },
  mounted() {
    PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        window.location.reload();
      }
    });
  },
  created() {
    this.getCurrentData();
    this.getSchedule();
    this.getData();
    this.checkTimePeriod();

    this.$dayjs.extend(customParseFormat);
    this.$dayjs.locale(this.language);
    this.$i18n.locale = this.language;
  }
};
</script>
