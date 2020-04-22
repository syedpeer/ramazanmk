<template>
  <div id="app"></div>
</template>

<script>
import sheetReader from "./modules/sheetReader";
export default {
  name: "app",
  components: {},
  data() {
    return {
      schedule: [],
      location: []
    };
  },
  mounted() {
    const schedule = {
      docId: 1,
      sheetId: "1dz8EUh67OOunhEcVqLjTg3nvjCYLmf6_JBFXvs4vCbs",
      returnAllResults: true
    };

    const location = {
      docId: 2,
      sheetId: "1dz8EUh67OOunhEcVqLjTg3nvjCYLmf6_JBFXvs4vCbs",
      returnAllResults: true
    };

    sheetReader(schedule, results => {
      this.schedule.push(results);
    });

    sheetReader(location, results => {
      this.location.push(results);
    });
  }
};
</script>
