<template>
  <div
    class="lg:h-full lg:overflow-auto bg-slate-50 flex flex-col lg:grid grid-cols-4"
  >
    <!-- CONTENT -->
    <section
      v-if="editMode === false"
      :class="[
        `h-full overflow-hidden px-5`,
        activeEvent ? `col-span-3` : `col-span-4`,
      ]"
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
              <td class="font-medium">
                {{ moment(event.eventStart).format("DD MMM YYYY") }}
              </td>
              <td class="font-medium">
                {{ moment(event.eventEnd).format("DD MMM YYYY") }}
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

    <section
      v-if="activeEvent && editMode === false"
      class="w-full md:w-4/6 lg:w-full mx-auto lg:mx-0 border border-slate-200 px-4 col-auto"
    >
      <!-- EVENT SUMMARY -->
      <section class="overflow-y-auto">
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
          <div class="text-sm text-slate-500 font-semibold">Tags</div>
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
            {{ moment(activeEvent.registerEnd).format("DD MMM YYYY") }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Start date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ moment(activeEvent.eventStart).format("DD MMM YYYY") }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">End date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ moment(activeEvent.eventEnd).format("DD MMM YYYY") }}
          </div>
        </div>
      </section>

      <div class="flex justify-center my-2">
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-white p-2 hover:bg-slate-200 mx-1"
          @click="openEditEvent()"
        >
          <PencilIcon class="p-1" />
          Edit Event
        </button>
      </div>
    </section>

    <section
      v-if="activeEvent && editMode"
      class="w-full h-full border border-slate-200 px-4 col-span-4 bg-slate-50"
    >
      <!-- EDIT EVENT -->
      <section class="w-4/6 mx-auto">
        <button
          @click="editMode = false"
          class="flex text-center text-slate-600 font-semibold border border-slate-200 px-2 py-1 my-5 bg-white hover:bg-slate-300 rounded"
        >
          <ChevronLeftIcon class="p-1" />
          Back to Event
        </button>
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Edit Event
        </div>
        <img
          :src="editEvent.img"
          class="rounded-lg max-w-xl max-h-72 mx-auto"
          alt=""
        />
        <div class="flex">
          <div class="mb-3 w-96">
            <div
              for="formImgEvent"
              class="text-sm text-slate-500 font-semibold my-2"
            >
              Select poster event
            </div>
            <input
              class="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="formImgEvent"
              type="file"
            />
          </div>
        </div>
        <div class="text-slate-600 font-semibold my-3">
          <span> Details </span>
        </div>

        <div>
          <div class="text-sm text-slate-500 font-semibold">Event Name</div>
          <div class="text-sm text-slate-600 break-words my-2">
            <input
              type="text"
              v-model="editEvent.name"
              class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Description</div>
          <div class="text-sm text-slate-600 break-words my-2">
            <textarea
              type="text"
              v-model="editEvent.description"
              class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Tags</div>
          <div class="flex">
            <div
              v-for="(tag, index) in editEvent.tags"
              :key="index"
              class="text-sm text-slate-600 capitalize mr-2 my-2"
            >
              {{ tag }}
            </div>
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold mb-2">Location</div>
          <textarea
            type="text"
            v-model="editEvent.location"
            class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
          />
        </div>

        <div class="flex justify-between">
          <div class="text-sm text-slate-500 font-semibold">Status</div>
          <div
            :class="[
              `text-sm text-slate-600 font-medium capitalize  `,
              editEvent.status === 'opened'
                ? ` text-green-600`
                : editEvent.status === 'ended'
                ? ` text-red-600 `
                : editEvent.status === 'started'
                ? ` text-yellow-600`
                : ` text-slate-600`,
            ]"
          >
            {{ editEvent.status }}
          </div>
        </div>

        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Point</div>
          <input
            type="text"
            v-model="editEvent.point"
            class="text-sm text-slate-500 border border-slate-200 p-2 w-16 focus:outline-emerald-500"
          />
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Member</div>
          <div
            :class="[
              `text-sm  font-medium`,
              editEvent.members.length === editEvent.maxMember
                ? `text-red-600`
                : `text-emerald-600`,
            ]"
          >
            <span> {{ editEvent.members.length }} / </span>

            <input
              type="text"
              v-model="editEvent.maxMember"
              class="border border-slate-200 p-2 w-16 focus:outline-emerald-500"
            />
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Section</div>
          <input
            type="text"
            v-model="editEvent.section"
            class="text-sm text-slate-500 border border-slate-200 p-2 w-16 focus:outline-emerald-500"
          />
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Register date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ moment(editEvent.registerEnd).format("DD MMM YYYY") }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Start date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ moment(editEvent.eventStart).format("DD MMM YYYY") }}
          </div>
        </div>
        <div class="flex justify-between my-2 mb-10">
          <div class="text-sm text-slate-500 font-semibold">End date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ moment(editEvent.eventEnd).format("DD MMM YYYY") }}
          </div>
        </div>

        <div class="flex justify-center my-5">
          <button
            class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-red-200 p-2 hover:text-red-500 hover:border-red-500 mx-1"
          >
            <TrashIcon class="p-1" />
            Delete Event
          </button>
          <button
            class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-white p-2 hover:bg-slate-300 mx-1"
            @click="openEditEvent()"
          >
            <RefreshIcon class="p-1" />
            Reset Value
          </button>
          <button
            class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-green-200 p-2 hover:text-emerald-500 hover:border-emerald-500 mx-1"
          >
            <CheckIcon class="p-1" />
            Save Event
          </button>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import DropDown from "../components/DropDown.vue";
import moment from "moment";
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  CheckIcon,
  RefreshIcon,
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
    ChevronLeftIcon,
    CheckIcon,
    RefreshIcon,
  },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      maxRow: 11,
      statusFilter: "",
      countKey: 0,
      searchKey: "s" + 0,
      dropdownKey: "d" + 0,
      activeEvent: "",
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
      this.activeEvent = event;
    },
    openEditEvent() {
      this.editEvent = { ...this.activeEvent };
      this.editMode = true;
    },
    moment() {
      return moment();
    },
  },
};
</script>

<style lang="scss" scoped></style>
