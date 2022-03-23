<template>
  <div class="h-full overflow-hidden bg-slate-50 grid grid-cols-4">
    <!-- CONTENT -->
    <section
      :class="[
        `h-full overflow-hidden col-span-3 px-5`,
        activeEvent ? `col-span-3` : `col-span-4`,
      ]"
    >
      <!-- MENU -->
      <section class="flex flex-col md:flex-row md:justify-between">
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
            class="flex pr-4 pl-1 my-2 rounded items-center bg-primary cursor-pointer text-white text-sm p-2 drop-shadow-sm"
          >
            <PlusIcon class="text-slate-100 opacity-70 mx-1" />
            Add Event
          </button>
        </div>
      </section>

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
              v-for="event in renderList"
              :key="event._id"
              @click="selectEvent(event)"
            >
              <td>
                <span class="text-black">{{ event.name }}</span>
              </td>
              <td class="font-medium">{{ event.eventStart }}</td>
              <td class="font-medium">{{ event.eventEnd }}</td>
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

    <section v-if="activeEvent" class="border border-slate-200 px-4">
      <div class="flex text-center text-slate-600 font-semibold my-5">
        Event Summary
      </div>
      <img :src="activeEvent.img" class="rounded-lg" alt="" />
      <div class="text-slate-600 font-semibold my-3">
        <span> Details </span>
      </div>

      <div>
        <div class="text-sm text-slate-500 font-semibold">Event Name</div>
        <div class="text-sm text-slate-600 break-words my-2">
          {{ activeEvent.name }}
        </div>
      </div>
      <div>
        <div class="text-sm text-slate-500 font-semibold">Description</div>
        <div class="text-sm text-slate-600 break-words my-2">
          {{ activeEvent.description }}
        </div>
      </div>
      <div>
        <div class="text-sm text-slate-500 font-semibold">Description</div>
        <div class="flex">
          <div
            v-for="(tag, index) in activeEvent.tags"
            :key="index"
            class="text-sm text-slate-600 capitalize mr-2 my-2"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm text-slate-500 font-semibold">Location</div>
        <div class="text-sm text-slate-600 break-words my-2">
          {{ activeEvent.location }}
        </div>
      </div>

      <div class="flex justify-between">
        <div class="text-sm text-slate-500 font-semibold">Status</div>
        <div
          :class="[
            `text-sm text-slate-600 font-medium capitalize  `,
            activeEvent.status === 'opened'
              ? ` text-green-600`
              : activeEvent.status === 'ended'
              ? ` text-red-600 `
              : activeEvent.status === 'started'
              ? ` text-yellow-600`
              : ` text-slate-600`,
          ]"
        >
          {{ activeEvent.status }}
        </div>
      </div>

      <div class="flex justify-between my-2">
        <div class="text-sm text-slate-500 font-semibold">Point</div>
        <div class="text-sm text-emerald-600 font-medium">
          {{ activeEvent.point }}
        </div>
      </div>
      <div class="flex justify-between my-2">
        <div class="text-sm text-slate-500 font-semibold">Member</div>
        <div
          :class="[
            `text-sm  font-medium`,
            activeEvent.members.length === activeEvent.maxMember
              ? `text-red-600`
              : `text-emerald-600`,
          ]"
        >
          {{ activeEvent.members.length }} / {{ activeEvent.maxMember }}
        </div>
      </div>
      <div class="flex justify-between my-2">
        <div class="text-sm text-slate-500 font-semibold">Section</div>
        <div class="text-sm font-medium text-slate-700">
          {{ activeEvent.section }}
        </div>
      </div>
      <div class="flex justify-between my-2">
        <div class="text-sm text-slate-500 font-semibold">Register date</div>
        <div class="text-sm font-medium text-slate-700">
          {{ activeEvent.registerEnd }}
        </div>
      </div>
      <div class="flex justify-between my-2">
        <div class="text-sm text-slate-500 font-semibold">Start date</div>
        <div class="text-sm font-medium text-slate-700">
          {{ activeEvent.eventStart }}
        </div>
      </div>
      <div class="flex justify-between my-2">
        <div class="text-sm text-slate-500 font-semibold">End date</div>
        <div class="text-sm font-medium text-slate-700">
          {{ activeEvent.eventEnd }}
        </div>
      </div>

      <div class="flex justify-center my-2">
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-white p-2 hover:text-emerald-500 mx-1"
        >
          <PencilIcon class="p-1" />
          Edit Event
        </button>
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-white p-2 hover:text-red-500 mx-1"
        >
          <TrashIcon class="p-1" />
          Delete Event
        </button>
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import DropDown from "../components/DropDown.vue";
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
  PencilIcon,
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
    PencilIcon,
    TrashIcon,
  },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      maxRow: 11,
      statusFilter: "",
      searchKey: 0,
      dropdownKey: 0,
      activeEvent: "",
    };
  },
  computed: {
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
      return Math.ceil(this.eventList.length / 10);
    },
    eventList() {
      return this.$store.state.event.eventList;
    },
  },
  async created() {
    await this.fetchEventList();
  },
  methods: {
    async fetchEventList() {
      await this.$store.dispatch("event/fetchEventList");
      console.log("eventList computed", this.eventList);
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
    },
    clear() {
      this.statusFilter = "";
      this.searchValue = "";
      this.forceRerenderSearch();
    },
    forceRerenderSearch() {
      this.dropdownKey += 1;
      this.searchKey += 1;
    },
    selectEvent(event) {
      this.activeEvent = event;
    },
  },
};
</script>

<style lang="scss" scoped></style>
