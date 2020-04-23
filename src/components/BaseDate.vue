<template>
  <div class="rounded-xl shadow-input" style="background-color: rgba(255, 255, 255, 0.5);">
    <div class="px-6 h-20 flex flex-row items-center">
      <icon name="cloud" class="w-12 h-12 mr-4"></icon>
      <p class="text-2xl font-medium text-primary">
        {{ getDate }} <span class="font-semibold">{{ getYear }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    data() {
      return {
        date: new Date(),
      }
    },
  },
  computed: {
    getDate() {
      return this.$dayjs(this.date).format("DD MMMM");
    },
    getYear() {
      return this.$dayjs(this.date).format("YYYY");
    }
  }
};
</script>

<style scoped></style>
