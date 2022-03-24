<template>
  <form class="rounded" @submit.prevent>
    <div class="mb-4">
      <v-date-picker v-model="range" mode="dateTime" :masks="masks" is-range>
        <template v-slot="{ inputValue, inputEvents, isDragging }">
          <div class="flex flex-col sm:flex-row justify-start items-center">
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
                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border border-slate-300 rounded w-full active:outline-emerald-500 focus:outline-emerald-500"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                :value="inputValue.start"
                v-on="inputEvents.start"
              />
            </div>
            <span class="flex-shrink-0 m-2">
              <svg
                class="w-4 h-4 stroke-current text-gray-600"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>

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
                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border border-slate-300 rounded w-full active:outline-emerald-500 focus:outline-emerald-500"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                :value="inputValue.end"
                v-on="inputEvents.end"
              />
            </div>
          </div>
        </template>
      </v-date-picker>
    </div>
  </form>
</template>

<script>
import moment from "moment";
export default {
  props: ["startDate", "endDate"],
  data() {
    return {
      date: "",
      range: {
        start: new Date(this.startDate * 1000) || new Date(),
        end: new Date(this.endDate * 1000) || new Date(),
      },
      masks: {
        input: "DD-MM-YYYY",
      },
    };
  },

  methods: {
    pickDate() {
      var dateControl = document.querySelector('input[type="date"]');

      console.log(dateControl.value); // prints "2017-06-01"
      console.log(dateControl.valueAsNumber); // prints
      this.date = moment(dateControl.value, "YYYY-MM-DD").format("DD MMM YYYY");

      console.log("this.date", this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
#date-picker::-webkit-calendar-picker-indicator {
  padding-left: 10vw;

  background: transparent;
  cursor: pointer;
}
.date-value {
  position: absolute;
  left: 45%;
}
</style>
