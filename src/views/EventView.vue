<template>
  <div class="event">
    <div class="flex justify-between px-5">
      <div class="text-3xl font-bold py-8">Event</div>

      <div class="flex items-center">
        <SearchBar @searchInput="receiveInputValue" class="mx-1" />
        <DropDown
          class="mx-1"
          value="Select your filter"
          :option="[
            `Last
        12 Months`,
            `Last 13 Months`,
            `Last 14 Months`,
          ]"
        />
        <div
          class="flex pr-4 pl-1 rounded items-center bg-primary cursor-pointer"
        >
          <PlusIcon class="text-slate-100 opacity-70 mx-1" />
          <button class="text-white text-sm py-2 drop-shadow-sm">
            Add Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import DropDown from "../components/DropDown.vue";
import { PlusIcon } from "@vue-hero-icons/outline";
export default {
  name: "EventView",
  components: { SearchBar, DropDown, PlusIcon },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    receiveInputValue(searchValue) {
      this.searchValue = searchValue;
    },
  },
};
</script>

<style lang="scss" scoped></style>
