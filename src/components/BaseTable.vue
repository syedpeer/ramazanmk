<template>
  <div class="w-full bg-white shadow-input p-6 rounded-tl-2xl lg:rounded-tl-none lg:rounded-2xl">
    <div v-for="n in 10" class="flex flex-row justify-between pt-4 pb-2 border-b border-gray-300">
      <div class="flex flex-col">
        <p class="text-xl font-semibold">26 Prill</p>
        <p class="text-sm uppercase">E Hene</p>
      </div>
      <div class="flex flex-col text-right">
        <p class="text-sm">SYFYR</p>
        <p class="text-xl font-semibold">03:00</p>
      </div>
      <div class="flex flex-col text-right">
        <p class="text-sm">IFTAR</p>
        <p class="text-xl font-semibold">03:00</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  }
};
</script>

<style scoped></style>
