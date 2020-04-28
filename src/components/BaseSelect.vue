<template>
  <div class="relative">
    <icon
      name="location"
      class="w-8 h-8 absolute top-0 left-0 mt-4 ml-5 text-primary pointer-events-none"
    ></icon>
    <select
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="bg-white text-primary shadow-input rounded-xl w-full text-lg h-16 pl-16 pr-4 appearance-none focus:none outline-none"
    >
      <option
        v-for="(item, index) in this.options"
        :value="item.shortcode"
        :key="index"
        >{{ $t(item.shortcode) }}</option
      >
    </select>
    <icon
      name="down"
      class="fill-current text-gray-500 w-6 h-6 absolute top-0 right-0 mt-5 mr-6 pointer-events-none"
    ></icon>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    value: String
  }
};
</script>
