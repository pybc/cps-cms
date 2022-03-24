<template>
  <div>
    <v-date-picker v-model="defaultDate" mode="dateTime" :minute-increment="5">
      <template v-slot="{ inputValue, inputEvents }">
        <div class="relative flex-grow">
          <svg
            class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <input
            class="text-sm flex-grow pl-8 pr-2 py-1 bg-gray-100 border border-slate-300 active:outline-emerald-500 focus:outline-emerald-500 rounded w-full"
            :value="inputValue"
            v-on="inputEvents"
          />
        </div>
      </template>
    </v-date-picker>
  </div>
</template>

<script>
export default {
  props: ["date"],
  data() {
    return {
      defaultDate: new Date(this.date * 1000) || new Date(),
    };
  },
};
</script>

<style lang="scss" scoped></style>
