<template>
  <div class="relative drop-shadow">
    <SearchIcon class="absolute top-2 text-slate-400 ml-2" />
    <input
      type="text"
      placeholder="Search..."
      class="border border-slate-300 hover:border-slate-400 py-2 pl-9 pr-3 outline-none rounded text-sm"
      v-model="value"
      @input="$emit('searchInput', value)"
    />
  </div>
</template>

<script>
import { SearchIcon } from "@vue-hero-icons/outline";
export default {
  props: ["searchValue"],
  components: {
    SearchIcon,
  },
  data() {
    return {
      value: this.searchValue || "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
