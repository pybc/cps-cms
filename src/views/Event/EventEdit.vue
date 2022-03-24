<template>
  <div>
    <section>
      <section class="w-4/6 mx-auto">
        <button
          @click="back()"
          class="flex text-center text-slate-600 font-semibold border border-slate-200 px-2 py-1 my-5 bg-white hover:bg-slate-300 rounded"
        >
          <ChevronLeftIcon class="p-1" />
          Back to Event
        </button>
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Edit Event
        </div>
        <img
          :src="editBase64String || eventItem.img"
          class="rounded-lg mx-auto"
          alt=""
        />
        <div class="flex">
          <div class="mb-3 w-96">
            <div
              for="editImgEvent"
              class="text-sm text-slate-500 font-semibold my-2"
            >
              Select poster event
            </div>
            <input
              class="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-slate-200 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              id="editImgEvent"
              type="file"
              accept="image/png, image/jpeg"
              @change="imgToBase64(`editImgEvent`)"
              :key="keyImgInput"
            />
          </div>
        </div>

        <div>
          <div class="text-sm text-slate-500 font-semibold">Event Name</div>
          <div class="text-sm text-slate-600 break-words my-2">
            <input
              type="text"
              v-model="eventItem.name"
              class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Description</div>
          <div class="text-sm text-slate-600 break-words my-2">
            <textarea
              type="text"
              v-model="eventItem.description"
              class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Tags</div>
          <div class="flex">
            <div
              v-for="(tag, index) in editTagsList"
              :key="index"
              class="text-sm text-slate-600 capitalize mr-2 my-2"
            >
              <button
                :class="[
                  `flex p-2  text-white  rounded items-center capitalize`,
                  tag.status ? `bg-slate-800` : `bg-slate-400`,
                ]"
                @click="tag.status = !tag.status"
              >
                {{ tag.name }}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold mb-2">Location</div>
          <textarea
            type="text"
            v-model="eventItem.location"
            class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
          />
        </div>

        <div class="flex justify-between items-center mb-2">
          <div class="text-sm text-slate-500 font-semibold">Status</div>

          <DropDown
            class="my-2 md:mx-1"
            :value="eventItem.status"
            :option="[`opened`, `started`, `ended`]"
            @dropDownValue="receiveDropdownEditValue"
            :key="keyDropdown"
          />
        </div>

        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <span class="text-sm text-slate-500 font-semibold">Point</span>
            <input
              type="text"
              v-model="eventItem.point"
              class="text-sm text-slate-500 border border-slate-200 p-2 mx-2 w-full focus:outline-emerald-500"
            />
          </div>
          <div class="flex items-center">
            <span class="text-sm text-slate-500 font-semibold">Member</span>
            <div
              :class="[
                `text-sm  font-medium flex items-center`,
                eventItem.members.length === eventItem.maxMember
                  ? `text-red-600`
                  : `text-emerald-600`,
              ]"
            >
              <div class="flex mx-1">
                <span class="mx-1">{{ eventItem.members.length }}</span> /
              </div>

              <input
                type="text"
                v-model="eventItem.maxMember"
                class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-sm text-slate-500 font-semibold mx-1">Section</div>
            <input
              type="text"
              v-model="eventItem.section"
              class="text-sm text-slate-500 border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
        </div>

        <div class="text-sm text-slate-500 font-semibold">
          <span>Event date</span>

          <DateRange
            :startDate="eventItem.eventStart"
            :endDate="eventItem.eventEnd"
            class="mt-2"
          />
        </div>
        <div class="text-sm text-slate-500 font-semibold">
          <span>Register date</span>
          <DateRange
            :startDate="eventItem.registerStart"
            :endDate="eventItem.registerEnd"
            class="mt-2"
          />
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
            @click="resetEvent()"
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
import DateRange from "../../components/DateRange.vue";
import DropDown from "../../components/DropDown.vue";
import {
  TrashIcon,
  ChevronLeftIcon,
  CheckIcon,
  RefreshIcon,
} from "@vue-hero-icons/outline";
import moment from "moment";
export default {
  components: {
    TrashIcon,
    ChevronLeftIcon,
    CheckIcon,
    RefreshIcon,
    DateRange,
    DropDown,
  },
  data() {
    return {
      eventItem: "",
      countEditKey: 0,
      keyDropdown: "DDE" + 0,
      keyImgInput: "I" + 0,
      editBase64String: "",
      editTagsList: [
        {
          name: "skill",
          status: false,
        },
        {
          name: "contest",
          status: false,
        },
        {
          name: "guide",
          status: false,
        },
        {
          name: "cram",
          status: false,
        },
        {
          name: "language",
          status: false,
        },
        {
          name: "other",
          status: false,
        },
      ],
    };
  },

  computed: {
    eventEdited() {
      return this.$store.state.event.eventEdited;
    },
  },
  mounted() {
    this.eventItem = { ...this.eventEdited };
    this.eventItem.tags.forEach((tag) => {
      this.editTagsList.forEach((editTag) => {
        if (tag.toLowerCase() === editTag.name.toLowerCase()) {
          editTag.status = true;
        } else {
          editTag.status = false;
        }
      });
    });
  },
  methods: {
    resetEvent() {
      this.eventItem = { ...this.eventEdited };
      this.eventItem.tags.forEach((tag) => {
        this.editTagsList.forEach((editTag) => {
          if (tag.toLowerCase() === editTag.name.toLowerCase()) {
            editTag.status = true;
          } else {
            editTag.status = false;
          }
        });
      });
      this.editBase64String = "";
      this.countEditKey++;
      this.keyImgInput = this.keyImgInput + this.countEditKey;
      this.keyDropdown = this.keyDropdown + this.countEditKey;
    },
    receiveDropdownEditValue(value) {
      this.eventItem.status = value;
    },
    back() {
      this.$store.dispatch("event/closeEditMode");
    },
    dateFormat(unixDate) {
      return moment.unix(unixDate).format("DD MMM YYYY");
    },
    imgToBase64() {
      const file = document.getElementById(`editImgEvent`)["files"][0];

      const reader = new FileReader();

      reader.onload = () => {
        this.editBase64String = reader.result;

        console.log("this.editBase64String", this.editBase64String);
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped></style>
