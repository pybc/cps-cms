<template>
  <div class="h-auto bg-slate-50 flex flex-col lg:grid grid-cols-4">
    <section :class="[`  px-5`, claimSelected ? `col-span-3` : `col-span-4`]">
      <!-- MENU -->
      <section class="flex flex-col lg:flex-row md:justify-between">
        <div class="text-3xl font-bold py-8">Claim</div>

        <div class="flex flex-col items-start md:flex-row md:items-center">
          <div v-if="statusFilter || searchValue">
            <button
              class="flex bg-white border border-slate-200 md:mx-1 p-2 drop-shadow rounded"
              @click="clear()"
            >
              Clear <XIcon class="text-red-400" />
            </button>
          </div>
          <SearchBar
            @searchInput="receiveInputValue"
            :value="searchValue"
            class="my-2 md:mx-1"
            :key="searchKey"
          />

          <DropDown
            class="my-2 md:mx-1"
            value="Select Status"
            :option="[`waiting`, `confirm`, `cancel`]"
            @dropDownValue="receiveDropdownValue"
            :key="dropdownKey"
          />
        </div>
      </section>
      <!-- CONTENT -->
      <section class="h-4/5">
        <header
          class="w-full h-14 border border-slate-200 bg-white flex items-center px-3"
        >
          <span class="font-bold">All Claim</span>
          <span class="text-slate-400 ml-1">{{ claimList.length }}</span>
        </header>
        <table class="table-auto w-full">
          <thead
            class="h-10 bg-slate-50 border border-slate-200 px-3 font-semibold text-slate-500 uppercase text-xs"
          >
            <tr>
              <th>No.</th>
              <th>Item name</th>
              <th>Claim By</th>
              <th>StudentID</th>
              <th>Claim Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-14 border bg-white border-slate-200 hover:bg-slate-100 px-3 text-sm cursor-pointer text-center text-slate-500"
              v-for="(claim, index) in renderList"
              :key="claim._id"
              @click="selectClaim(claim)"
            >
              <td>
                <span>{{ maxRow * currentPage - maxRow + (index + 1) }}</span>
              </td>
              <td class="font-medium">
                {{ claim.itemName || "-" }}
              </td>
              <td class="font-medium">
                {{ claim.firstName + " " + claim.lastName || "-" }}
              </td>
              <td class="font-medium">
                {{ claim.studentId || "-" }}
              </td>
              <td class="font-medium">
                {{
                  claimSelected.claimDate === null
                    ? "-"
                    : dateFormat(claimSelected.claimDate)
                }}
              </td>
              <td>
                <span
                  :class="[
                    `rounded-full py-2 px-4 capitalize font-semibold`,
                    claim.status === 'confirm'
                      ? `bg-green-200 text-green-600`
                      : claim.status === 'cancel'
                      ? `bg-red-200 text-red-600 `
                      : claim.status === 'waiting'
                      ? `bg-yellow-200 text-yellow-600`
                      : `bg-slate-200 text-slate-600`,
                  ]"
                >
                  {{ claim.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- PAGINATION -->
      <section class="my-5 flex justify-between">
        <p class="text-slate-500">
          Showing claim {{ maxRow * currentPage - maxRow + 1 }} to
          {{
            maxRow * currentPage < claimFilter.length
              ? maxRow * currentPage
              : claimFilter.length
          }}
          of
          {{ claimFilter.length }}
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

    <ClaimDetail
      v-if="claimSelected"
      :claimSelected="claimSelected"
      class="w-full md:w-4/6 lg:w-full mx-auto lg:mx-0 border border-slate-200 px-4 col-auto"
    />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import moment from "moment";
import SearchBar from "../../components/SearchBar.vue";
import DropDown from "../../components/DropDown.vue";
import ClaimDetail from "../Claim/ClaimDetail.vue";

import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@vue-hero-icons/outline";
export default {
  name: "ClaimView",
  components: {
    SearchBar,
    DropDown,
    ArrowLeftIcon,
    ArrowRightIcon,
    XIcon,
    ClaimDetail,
  },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      maxRow: 10,
      statusFilter: "",
      countKey: 0,
      searchKey: "s" + 0,
      dropdownKey: "d" + 0,
      claimSelected: "",
    };
  },
  computed: {
    ...mapGetters({
      claimList: "claim/getClaimList",
    }),
    renderList() {
      const startIndex =
        this.currentPage === 1
          ? 0
          : this.maxRow * this.currentPage - this.maxRow;
      const lastIndex = this.maxRow + startIndex;
      const renderClaimList = this.claimFilter.slice(startIndex, lastIndex);
      return renderClaimList;
    },
    claimFilter() {
      return this.claimList.filter((claim) => {
        return (
          claim.status
            .toLowerCase()
            .includes(this.statusFilter.toLowerCase()) &&
          (claim.firstName
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
            claim.lastName
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()) ||
            claim.studentId
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()))
        );
      });
    },
    maxPage() {
      return Math.ceil(this.claimFilter.length / this.maxRow);
    },
  },
  async mounted() {
    await this.fetchClaimList();
  },
  methods: {
    async fetchClaimList() {
      await this.$store.dispatch("claim/fetchClaimList");
    },
    receiveInputValue(searchValue) {
      this.searchValue = searchValue;
    },
    nextList() {
      this.currentPage < this.maxPage ? this.currentPage++ : "";
    },
    previousList() {
      this.currentPage > 1 ? this.currentPage-- : "";
    },
    receiveDropdownValue(value) {
      this.statusFilter = value;
      this.currentPage = 1;
    },

    clear() {
      this.statusFilter = "";
      this.searchValue = "";
      this.forceRerenderSearch();
    },
    forceRerenderSearch() {
      this.countKey++;
      this.dropdownKey = this.dropdownKey + this.countKey;
      this.searchKey = this.searchKey + this.countKey;
    },
    selectClaim(claim) {
      this.claimSelected = claim;
    },
    dateFormat(date) {
      return moment(date).format("DD MMM YYYY");
    },
  },
};
</script>
