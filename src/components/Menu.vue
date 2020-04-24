<template>
  <div>
    <div
      @click="menu = !menu"
      class="w-10 h-10 z-20 rounded-full bg-white shadow-input flex items-center justify-center cursor-pointer relative"
    >
      <icon name="menu" class="w-6 h-6 text-primary"></icon>
      <transition
        enter-active-class="transition-all ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to="transform opacity-0 scale-95"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
        leave-active-class="transition-all ease-in duration-75"
      >
        <div
          v-show="menu"
          class="md:w-64 origin-top-right bg-white z-20 shadow-input absolute top-0 right-0 rounded-xl overflow-hidden mt-12"
        >
          <div
            @click="switchLanguage('sq')"
            class="flex flex-row items-center px-8 py-5 text-primary text-xl border-b border-gray-300 hover:bg-gray-300"
          >
            <icon name="albania" class="w-8 h-8 mr-6"></icon>
            Shqip
          </div>
          <div
            @click="switchLanguage('tr')"
            class="flex flex-row items-center px-8 py-5 text-primary text-xl border-b border-gray-300 hover:bg-gray-300"
          >
            <icon name="turkey" class="w-8 h-8 mr-6"></icon>
            Türkçe
          </div>
          <div
            @click="switchLanguage('mk')"
            class="flex flex-row items-center px-8 py-5 text-primary text-xl hover:bg-gray-300"
          >
            <icon name="macedonia" class="w-8 h-8 mr-6"></icon>
            Македонски
          </div>
        </div>
      </transition>
    </div>
    <div
      @click="menu = false"
      v-show="menu"
      style="background-color: rgba(0, 0, 0, 0.69)"
      class="absolute inset-0 w-full h-full z-10"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    };
  },
  watch: {
    menu(value) {
      const bodyTag = document.querySelector("body");

      if (value) {
        bodyTag.classList.add("overflow-hidden");
      } else {
        bodyTag.classList.remove("overflow-hidden");
      }
    }
  },
  methods: {
    switchLanguage(string) {
      this.$emit("switchLanguage", string);
    }
  }
};
</script>
