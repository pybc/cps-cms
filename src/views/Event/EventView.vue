<template>
  <div class="h-auto bg-slate-50 flex flex-col lg:grid grid-cols-4">
    <section
      v-if="editMode === false"
      :class="[`  px-5`, eventSelected ? `col-span-3` : `col-span-4`]"
    >
      <!-- MENU -->
      <section class="flex flex-col lg:flex-row md:justify-between">
        <div class="text-3xl font-bold py-8">Event</div>

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
            :option="[`opened`, `started`, `ended`]"
            @dropDownValue="receiveDropdownValue"
            :key="dropdownKey"
          />

          <button
            @click="$router.push(`/event/create`)"
            class="flex pr-4 pl-1 my-2 rounded items-center bg-primary cursor-pointer text-white text-sm p-2 drop-shadow-sm"
          >
            <PlusIcon class="text-slate-100 opacity-70 mx-1" />
            Create Event
          </button>
        </div>
      </section>
      <!-- CONTENT -->
      <section class="h-4/5">
        <header
          class="w-full h-14 border border-slate-200 bg-white flex items-center px-3"
        >
          <span class="font-bold">All Event</span>
          <span class="text-slate-400 ml-1">{{ eventList.length }}</span>
        </header>
        <table class="table-auto w-full">
          <thead
            class="h-10 bg-slate-50 border border-slate-200 px-3 font-semibold text-slate-500 uppercase text-xs"
          >
            <tr>
              <th>NO.</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Member</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-14 border bg-white border-slate-200 hover:bg-slate-100 px-3 text-sm cursor-pointer text-center text-slate-500"
              v-for="(event, index) in renderList"
              :key="event._id"
              @click="selectEvent(event)"
            >
              <td>
                {{ maxRow * currentPage - maxRow + (index + 1) }}
              </td>
              <td>
                <span class="text-black">{{ event.name }}</span>
              </td>
              <td class="font-medium">
                {{ dateFormat(event.eventStart) || "-" }}
              </td>
              <td class="font-medium">
                {{ dateFormat(event.eventEnd) || "-" }}
              </td>
              <td
                :class="[
                  `font-medium`,
                  event.members.length === event.maxMember &&
                  event.status === 'opened'
                    ? `text-red-500`
                    : ``,
                ]"
              >
                {{ event.members.length }}/{{ event.maxMember }}
              </td>
              <td>
                <span
                  :class="[
                    `rounded-full py-2 px-4 capitalize font-semibold`,
                    event.status === 'opened'
                      ? `bg-green-200 text-green-600`
                      : event.status === 'ended'
                      ? `bg-red-200 text-red-600 `
                      : event.status === 'started'
                      ? `bg-yellow-200 text-yellow-600`
                      : `bg-slate-200 text-slate-600`,
                  ]"
                >
                  {{ event.status }}
                </span>
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
            maxRow * currentPage < eventFilter.length
              ? maxRow * currentPage
              : eventFilter.length
          }}
          of
          {{ eventFilter.length }}
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

    <EventDetail
      v-if="eventSelected && editMode === false"
      :eventSelected="eventSelected"
      class="w-full md:w-4/6 lg:w-full mx-auto lg:mx-0 border border-slate-200 px-4 col-auto"
    />

    <EventEdit
      v-if="editMode && eventSelected"
      class="w-full h-full border border-slate-200 px-4 col-span-4 bg-slate-50"
    />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import moment from "moment";
import SearchBar from "../../components/SearchBar.vue";
import DropDown from "../../components/DropDown.vue";
import EventEdit from "../Event/EventEdit.vue";
import EventDetail from "../Event/EventDetail.vue";

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
    EventDetail,
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
      eventSelected: "",
    };
  },
  computed: {
    ...mapGetters({
      eventList: "event/getEventList",
      editMode: "event/getEditMode",
    }),
    renderList() {
      const startIndex =
        this.currentPage === 1
          ? 0
          : this.maxRow * this.currentPage - this.maxRow;
      const lastIndex = this.maxRow + startIndex;
      const renderEventList = this.eventFilter.slice(startIndex, lastIndex);
      return renderEventList;
    },
    eventFilter() {
      return this.eventList.filter((event) => {
        return (
          event.name.toLowerCase().includes(this.searchValue.toLowerCase()) &&
          event.status.toLowerCase().includes(this.statusFilter.toLowerCase())
        );
      });
    },
    maxPage() {
      return Math.ceil(this.eventFilter.length / this.maxRow);
    },
  },
  async mounted() {
    await this.fetchEventList();
  },
  methods: {
    async fetchEventList() {
      await this.$store.dispatch("event/fetchEventList");
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
    selectEvent(event) {
      this.eventSelected = event;
    },
    dateFormat(date) {
      return moment(date).format("DD MMM YYYY");
    },
  },
};
</script>

<style lang="scss" scoped></style>
