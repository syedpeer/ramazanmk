<template>
  <div class="bg-white shadow-input rounded-xl flex flex-row items-center p-4">
    <icon
      v-if="this.icon"
      :name="this.icon"
      class="block w-8 h-8 mr-3 text-secondary"
    ></icon>
    <div class="flex flex-col text-primary">
      <p class="text-xs font-medium uppercase">{{ this.name }}</p>
      <p class="text-2xl font-semibold">
        {{ this.time }}
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String
    },
    name: {
      type: String
    },
    icon: {
      type: String
    }
  }
};
</script>

<style scoped></style>
