<template>
  <div
    class="rounded-xl shadow-input"
    style="background-color: rgba(255, 255, 255, 0.5);"
  >
    <div class="px-6 py-4 flex flex-row">
      <icon name="cloud" class="w-12 h-auto mr-4"></icon>
      <p class="text-2xl font-medium">
        25 Prill <span class="font-semibold">2020</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String
    },
    year: {
      type: String
    }
  }
};
</script>

<style scoped></style>
