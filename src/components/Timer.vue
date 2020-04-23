<template>
  <div id="timer">
    <span id="hours">{{ hours }}</span>
    <span id="middle">:</span>
    <span id="minutes">{{ minutes }}</span>
    <span id="middle">:</span>
    <span id="seconds">{{ seconds }}</span>
  </div>
</template>

<script>
export default {
  props: ["start"],
  data() {
    return {
      timer: null,
      totalTime: null,
      resetButton: true,
      current: this.start
    };
  },
  methods: {
    startTimer() {
      let moment = this.$dayjs(new Date());
      let remaining = Math.abs(Date.parse(this.current) - Date.parse(moment));
      this.totalTime = remaining / 1000;
      this.timer = setInterval(() => this.countdown(), 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      this.totalTime--;
    }
  },
  computed: {
    hours: function() {
      const hours = Math.floor(this.totalTime / 3600);
      return this.padTime(hours);
    },
    minutes: function() {
      const minutes = Math.floor((this.totalTime - this.hours * 3600) / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.hours * 3600 - this.minutes * 60;
      return this.padTime(seconds);
    }
  },
  created() {
    this.startTimer();
  },
  watch: {
    start() {
      this.current = this.start;
      this.resetTimer();
      this.startTimer();
    }
  },
};
</script>
