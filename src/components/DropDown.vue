<template>
  <div class="relative">
    <!-- DROPDOWN BUTTON -->
    <button
      class="flex flex-row items-center w-44 py-2 px-2 outline-none border drop-shadow bg-white border-slate-300 hover:border-slate-400 focus:outline-none focus:border-emerald-500 transition-colors rounded text-sm"
      @click="isOpen = !isOpen"
      v-click-outside="() => (isOpen = false)"
    >
      <div class="text-left mx-2 w-32 truncate text-slate-600 capitalize">
        {{ defaultValue }}
      </div>
      <ChevronUpIcon v-if="isOpen" class="text-slate-400 p-1" />
      <ChevronDownIcon v-else class="text-slate-400 p-1" />
    </button>

    <!-- DISPLAY SELECT MENU -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
      v-if="isOpen && option"
    >
      <div class="absolute z-50 hover:z-100">
        <div
          class="border border-slate-300 mt-1 outline-none rounded w-44 truncate text-sm bg-white"
        >
          <div
            v-for="(item, index) in option"
            :key="index"
            class="hover:bg-slate-100 pl-7 pr-2 py-2 cursor-pointer text-slate-500 capitalize"
            @click="
              () => {
                defaultValue = item;
                $emit('dropDownValue', item);
              }
            "
          >
            {{ item }}
          </div>
        </div>
      </div>
    </transition>
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
