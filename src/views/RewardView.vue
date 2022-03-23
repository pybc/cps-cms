<template>
  <div class="h-full bg-slate-50 flex flex-col lg:grid grid-cols-4">
    <!-- CONTENT -->
    <section
      v-if="editMode === false"
      :class="[
        `h-full overflow-hidden px-5`,
        activeReward ? `col-span-3` : `col-span-4`,
      ]"
    >
      <!-- MENU -->
      <section class="flex flex-col lg:flex-row md:justify-between">
        <div class="text-3xl font-bold py-8">Reward</div>

        <div class="flex flex-col items-start md:flex-row md:items-center">
          <div v-if="pointFilter || searchFilter">
            <button
              class="flex items-center bg-red-200 border border-red-200 mx-1 p-1 rounded"
              @click="clear()"
            >
              Clear <XIcon class="text-red-400" />
            </button>
          </div>
          <SearchBar
            @searchInput="receiveInputValue"
            :value="searchFilter"
            class="my-2 md:mx-1"
            :key="searchKey"
          />

          <DropDown
            class="my-2 md:mx-1"
            value="Select Status"
            :option="[`opened`, `started`, `ended`]"
            @dropDownValue="receiveDropdownValue"
            :key="dropdownKey"
          />

          <button
            @click="() => (activeAddBtn = true)"
            class="flex pr-4 pl-1 my-2 rounded items-center bg-primary cursor-pointer text-white text-sm p-2 drop-shadow-sm"
          >
            <PlusIcon class="text-slate-100 opacity-70 mx-1" />
            Add Reward
          </button>
        </div>
      </section>

      <section class="h-4/5">
        <header
          class="w-full h-14 border border-slate-200 bg-white flex items-center px-3"
        >
          <span class="font-bold">All Reward</span>
          <span class="text-slate-400 ml-1">{{ rewardList.length }}</span>
        </header>
        <table class="table-auto w-full">
          <thead
            class="h-10 bg-slate-50 border border-slate-200 px-3 font-semibold text-slate-500 uppercase text-xs"
          >
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Point</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-14 border bg-white border-slate-200 hover:bg-slate-100 px-3 text-sm cursor-pointer text-center text-slate-500"
              v-for="(reward, index) in rewardFilter"
              :key="reward._id"
              @click="selectEvent(reward)"
            >
              <td>
                {{ maxRow * currentPage - maxRow + (index + 1) }}
              </td>
              <td class="font-medium">
                <div class="flex items-center justify-center text-black">
                  <img
                    class="flex-shrink-0 w-10 h-10 rounded-full"
                    :src="reward.img"
                    alt=""
                  />
                  <div class="ml-5">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ reward.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="font-medium">{{ reward.point }}</td>
              <td class="font-medium">
                {{ reward.totalItem }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="my-5 flex justify-between">
        <p class="text-slate-500">
          Showing reward {{ maxRow * currentPage - maxRow + 1 }} to
          {{
            maxRow * currentPage < rewardFilter.length
              ? maxRow * currentPage
              : rewardFilter.length
          }}
          of
          {{ rewardFilter.length }}
          results
        </p>
        <div class="flex">
          <button
            @click="previousList"
            :class="[
              `border bg-white border-slate-200 hover:bg-slate-100 flex p-2`,
              currentPage === 1 ? `text-slate-300` : `text-green-500`,
            ]"
          >
            <ArrowLeftIcon class="p-1" />Previous
          </button>
          <button
            @click="nextList"
            :class="[
              `border bg-white border-slate-200 hover:bg-slate-100 flex p-2 ml-2`,
              currentPage === maxPage ? `text-slate-300` : `text-green-500`,
            ]"
          >
            Next <ArrowRightIcon class="p-1" />
          </button>
        </div>
      </section>
    </section>

    <section
      v-if="activeReward && editMode === false"
      class="w-full md:w-4/6 lg:w-full mx-auto lg:mx-0 border border-slate-200 px-4 col-auto"
    >
      <!-- EVENT SUMMARY -->
      <section class="overflow-y-auto">
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Reward Summary
        </div>
        <div class="flex justify-center items-center">
          <img :src="activeReward.img" class="w-40 rounded-lg" alt="imgEvent" />
        </div>
        <div class="text-slate-600 font-semibold my-3">
          <span> Details </span>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Reward Id</div>
          <div class="text-sm text-emerald-600 font-medium">
            {{ activeReward.itemId }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Reward Name</div>
          <div class="text-sm text-emerald-600 font-medium">
            {{ activeReward.name }}
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Description</div>
          <textarea
            type="text"
            v-model="activeReward.description"
            class="w-full h-28 p-2 my-2 text-sm text-slate-600 resize-none rounded border border-emerald-500 focus:outline-emerald-500"
          />
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Point</div>
          <div class="text-sm text-emerald-600 font-medium">
            {{ activeReward.point }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Total Reward</div>
          <div class="text-sm text-emerald-600 font-medium">
            {{ activeReward.totalItem }}
          </div>
        </div>
      </section>

      <div class="flex justify-center my-2">
        <button
          class="flex items-center text-sm border text-red-500 font-medium border-slate-200 rounded bg-red-200 p-2 hover:text-red-500 hover:border-red-500 mx-1"
        >
          <TrashIcon class="p-1" />
          Delete Reward
        </button>
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import DropDown from "../components/DropDown.vue";
// import moment from "moment";
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
  TrashIcon,
} from "@vue-hero-icons/outline";
export default {
  name: "EventView",
  components: {
    SearchBar,
    DropDown,
    PlusIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    XIcon,
    TrashIcon,
  },
  data() {
    return {
      searchFilter: "",
      currentPage: 1,
      maxRow: 11,
      pointFilter: "",
      countKey: 0,
      searchKey: "s" + 0,
      dropdownKey: "d" + 0,
      activeReward: "",
      activeAddBtn: false,
      editEvent: "",
      editMode: false,
    };
  },
  computed: {
    renderList() {
      const startIndex =
        this.currentPage === 1
          ? 0
          : this.maxRow * this.currentPage - this.maxRow;
      const lastIndex = this.maxRow + startIndex;
      const renderEventList = this.rewardFilter.slice(startIndex, lastIndex);
      return renderEventList;
    },
    rewardFilter() {
      return this.rewardList.filter((reward) =>
        reward.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      );
      // .filter((reward) =>
      //   this.pointFilter === "Point < 300"
      //     ? reward.point < 300
      //     : this.pointFilter === "Point > 300"
      //     ? reward.point > 300
      //     : this.pointFilter === "Point = 300"
      //     ? reward.point === 300
      //     : reward.point
      // );
    },
    maxPage() {
      return Math.ceil(this.rewardFilter.length / this.maxRow);
    },
    rewardList() {
      return this.$store.state.reward.rewardList;
    },
  },
  async created() {
    await this.fetchRewardList();
  },
  methods: {
    async fetchRewardList() {
      // await this.$store.dispatch("reward/fetchRewardList");
      await this.$store.dispatch("reward/fetchRewardList");
      console.log("rewardList computed", this.rewardList);
    },
    receiveInputValue(searchFilter) {
      this.searchFilter = searchFilter;
    },
    nextList() {
      this.currentPage < this.maxPage ? this.currentPage++ : "";
    },
    previousList() {
      this.currentPage > 1 ? this.currentPage-- : "";
    },
    receiveDropdownValue(value) {
      this.pointFilter = value;
    },
    clear() {
      this.pointFilter = "";
      this.searchFilter = "";
      this.forceRerenderSearch();
    },
    forceRerenderSearch() {
      this.countKey++;
      this.dropdownKey = this.dropdownKey + this.countKey;
      this.searchKey = this.searchKey + this.countKey;
    },
    selectEvent(event) {
      this.activeReward = event;
    },
  },
};
</script>

<style lang="scss" scoped>
// ::-webkit-scrollbar {
//   width: 8px;
// }

// /* Track */
// ::-webkit-scrollbar-track {
//   background: #f1f1f1;
//   border-radius: 10px;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: #15c5b5;
//   border-radius: 10px;
// }

// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover {
//   background: #15c5b5;
// }
</style>
