<template>
  <div class="w-full text-primary overflow-y-auto bg-white shadow-input p-6 rounded-tl-2xl lg:rounded-tl-2xl lg:rounded-bl-2xl lg:max-h-50">
    <div v-for="(item, index) in this.items" class="flex flex-row pt-4 pb-2 border-b border-gray-300">
      <div class="w-1/2 flex flex-col">
        <p class="text-xl font-semibold">{{ dayNumber(item.data) }}</p>
        <p class="text-sm uppercase">{{ dayText(item.data) }}</p>
      </div>
      <div class="w-1/4 flex flex-col items-end pr-4">
        <p class="text-sm uppercase">{{ $t('syfyr') }}</p>
        <p class="text-xl font-semibold">{{ item.sifir }}</p>
      </div>
      <div class="w-1/4 flex flex-col items-end">
        <p class="text-sm text-right uppercase">{{ $t('iftar') }}</p>
        <p class="text-xl font-semibold">{{ item.iftar }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },

  methods: {
    dayNumber(value) {
      return this.$dayjs(value).format("DD MMMM");
    },
    dayText(value) {
      return this.$dayjs(value).format("dddd");
    }
  }
};
</script>

<style scoped></style>
