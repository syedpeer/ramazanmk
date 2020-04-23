<template>
  <div id="app" class="font-sans antialiased min-h-screen flex flex-col bg-gradient">
    <div class="container">
      <h1 class="text-3xl font-semibold">Ramazan</h1>
      <div class="bg-white rounded mt-2 h-2 w-20"></div>
    </div>
    <div class="container mt-16">
      <div class="flex flex-row justify-between">
        <div class="w-1/3">
          <div class="bg-white shadow-input overflow-hidden" style="border-radius:16px;">
            <div style="border-radius: 16px;" class="px-6 py-4 flex">
              <icon name="location" class="fill-current w-3 h-auto"></icon>
              <select class="w-full py-4" name id="qyeti">
                <option value="gostivar">Gostivar</option>
                <option value="tetove">Tetovë</option>
              </select>
            </div>
          </div>
          <div
            class="mt-12 shadow-input"
            style="border-radius: 16px; background-color: rgba(255, 255, 255, 0.5);"
          >
            <div class="px-6 py-4 flex flex-row">
              <icon name="cloud" class="fill-current w-12 h-auto"></icon>
              <p class="text-2xl font-semibold">25 Prill 2020</p>
            </div>
          </div>
          <div class="w-1/2 mt-4">
            <div
              style="border-radius:16px;"
              class="bg-white shadow-input flex flex-row items-center p-4"
            >
              <icon name="sun" class="block w-8 h-8"></icon>
              <div class="flex flex-col">
                <p class="text-xs">SYFYR</p>
                <p class="mt-2 text-2xl font-semibold">03:00</p>
              </div>
            </div>
          </div>
          <div class="w-1/2 mt-4">
            <div
              style="border-radius:16px;"
              class="bg-white shadow-input flex flex-row items-center p-4"
            >
              <icon name="moon" class="block w-8 h-8"></icon>
              <div class="flex flex-col">
                <p class="text-xs">IFTAR</p>
                <p class="mt-2 text-2xl font-semibold">03:00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="w-1/2 mx-auto">
            <div class="w-full">
              <div style="border-radius: 48px;" class="bg-white shadow-input p-6">
                <div class="my-4">
                  <div class="flex flex-row justify-between border-b border-gray-500">
                    <div class="flex flex-col">
                      <p class="text-2xl font-semibold">26 Prill</p>
                      <p class="mt-2">E Hene</p>
                    </div>
                    <div class="flex flex-col">
                      <p class>SYFYR</p>
                      <p class="mt-2 text-2xl font-semibold">03:00</p>
                    </div>
                    <div class="flex flex-col">
                      <p>IFTARI</p>
                      <p class="mt-2 text-2xl font-semibold">13:00</p>
                    </div>
                  </div>
                </div>
                <div class="my-4">
                  <div class="flex flex-row justify-between border-b border-gray-500">
                    <div class="flex flex-col">
                      <p class="text-2xl font-semibold">26 Prill</p>
                      <p class="mt-2">E Hene</p>
                    </div>
                    <div class="flex flex-col">
                      <p class>SYFYR</p>
                      <p class="mt-2 text-2xl font-semibold">03:00</p>
                    </div>
                    <div class="flex flex-col">
                      <p>IFTARI</p>
                      <p class="mt-2 text-2xl font-semibold">13:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sheetReader from "./modules/sheetReader";
import Icon from "./components/Icon";
export default {
  name: "app",
  components: {
    Icon
  },
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
