<template>
  <div>
    <!-- DROPDOWN BUTTON -->
    <button
      class="flex flex-row drop-shadow border border-slate-300 hover:border-slate-400 py-2 px-2 w-44 outline-none focus:outline-none focus:border-emerald-500 transition-colors rounded text-sm"
      @click="isOpen = !isOpen"
      v-click-outside="() => (isOpen = false)"
    >
      <div class="text-left mx-2 w-32 truncate text-slate-600">
        {{ defaultValue }}
      </div>
      <ChevronUpIcon v-if="isOpen" class="text-slate-400 p-1" />
      <ChevronDownIcon v-else class="text-slate-400 p-1" />
    </button>

    <!-- DISPLAY SELECT MENU -->
    <div v-if="isOpen && option">
      <div
        class="absolute border border-slate-300 mt-1 outline-none rounded w-44 truncate text-sm bg-white"
      >
        <div
          v-for="(item, index) in option"
          :key="index"
          class="hover:bg-slate-100 pl-7 pr-2 py-2 cursor-pointer text-slate-500"
          @click="() => (defaultValue = item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from "@vue-hero-icons/outline";
import ClickOutside from "vue-click-outside";
export default {
  props: ["value", "option"],
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
  },
  data() {
    return {
      isOpen: false,
      defaultValue: "",
      content: ["Last 12 Months", "Last 13 Months", "Last 14 Months"],
    };
  },
  mounted() {
    this.defaultValue = this.value;
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped></style>
