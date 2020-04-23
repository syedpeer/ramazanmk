<template>
  <div class="relative">
    <icon name="location" class="w-4 h-auto absolute top-0 left-0 mt-5 ml-6 pointer-events-none"></icon>
    <select :value="value" @input="$emit('input', $event.target.value)" class="bg-white shadow-input rounded-xl w-full text-lg h-16 pl-16 pr-4 appearance-none focus:none outline-none">
      <option v-for="(item, index) in this.options" :value="item.shortcode" :key="index">{{ item.name }}</option>
    </select>
    <icon name="down" class="fill-current w-6 h-6 absolute top-0 right-0 mt-5 mr-6 pointer-events-none"></icon>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    value: String,
  },
};
</script>
