<template>
  <div class="h-auto bg-slate-50 flex flex-col lg:grid grid-cols-4">
    <section
      v-if="editMode === false"
      :class="[`  px-5`, rewardSelected ? `col-span-3` : `col-span-4`]"
    >
      <!-- MENU -->
      <section class="flex flex-col lg:flex-row md:justify-between">
        <div class="text-3xl font-bold py-8">Reward</div>

        <div class="flex flex-col items-start md:flex-row md:items-center">
          <div v-if="sortFilter || searchFilter">
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
            value="Select Sort Reward"
            :option="[`High to Low`, `Low to High`]"
            @dropDownValue="receiveDropdownValue"
            :key="dropdownPKey"
          />

          <button
            @click="$router.push(`/reward/create`)"
            class="flex pr-4 pl-1 my-2 rounded items-center bg-primary cursor-pointer text-white text-sm p-2 drop-shadow-sm"
          >
            <PlusIcon class="text-slate-100 opacity-70 mx-1" />
            Add Reward
          </button>
        </div>
      </section>
      <!-- CONTENT -->
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
              v-for="(reward, index) in renderList"
              :key="reward._id"
              @click="selectReward(reward)"
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
      <!-- PAGINATION -->
      <section class="my-5 flex justify-between">
        <p class="text-slate-500">
          Showing event {{ maxRow * currentPage - maxRow + 1 }} to
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

    <RewardDetail
      v-if="rewardSelected && editMode === false"
      :rewardSelected="rewardSelected"
      @closeWindowDetail="receiveCloseDetail"
      class="w-full md:w-4/6 lg:w-full mx-auto lg:mx-0 border border-slate-200 px-4 col-auto"
    />

    <EventEdit
      v-if="editMode && rewardSelected"
      class="w-full h-full border border-slate-200 px-4 col-span-4 bg-slate-50"
    />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import SearchBar from "../../components/SearchBar.vue";
import DropDown from "../../components/DropDown.vue";
import EventEdit from "../Event/EventEdit.vue";
import RewardDetail from "../Reward/RewardDetail.vue";

import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
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
    EventEdit,
    RewardDetail,
  },
  data() {
    return {
      searchFilter: "",
      currentPage: 1,
      maxRow: 10,
      sortFilter: "",
      countKey: 0,
      searchKey: "s" + 0,
      dropdownPKey: "d" + 0,
      rewardSelected: "",
    };
  },
  computed: {
    ...mapGetters({
      rewardList: "reward/getRewardList",
      editMode: "reward/getEditMode",
    }),
    renderList() {
      const startIndex =
        this.currentPage === 1
          ? 0
          : this.maxRow * this.currentPage - this.maxRow;
      const lastIndex = this.maxRow + startIndex;
      const renderRewardList = this.rewardFilter.slice(startIndex, lastIndex);
      return renderRewardList;
    },
    rewardFilter() {
      var rewardList = this.rewardList.filter((reward) => {
        return reward.name
          .toLowerCase()
          .includes(this.searchFilter.toLowerCase());
      });
      if (this.sortFilter) {
        console.log("sortFilter");
        rewardList =
          this.sortFilter === `High to Low`
            ? rewardList.sort(
                (a, b) => b.point - a.point && b.totalItem - a.totalItem
              ) // Greater then to Less then
            : rewardList.sort(
                (a, b) => a.point - b.point && a.totalItem - b.totalItem
              );
      }
      return rewardList;
    },
    maxPage() {
      return Math.ceil(this.rewardFilter.length / this.maxRow);
    },
  },
  async mounted() {
    await this.fetchRewardList();
  },
  methods: {
    async fetchRewardList() {
      await this.$store.dispatch("reward/fetchRewardList");
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
      this.sortFilter = value;
      this.currentPage = 1;
    },
    receiveSortItemValue(value) {
      this.itemFilter = value;
      this.currentPage = 1;
    },

    clear() {
      this.sortFilter = "";
      this.itemFilter = "";
      this.searchFilter = "";
      this.forceRerenderSearch();
    },
    forceRerenderSearch() {
      this.countKey++;
      this.dropdownPKey = this.dropdownPKey + this.countKey;
      this.searchKey = this.searchKey + this.countKey;
    },
    selectReward(event) {
      this.rewardSelected = event;
    },
    receiveCloseDetail(action) {
      if (!action) {
        this.rewardSelected = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
