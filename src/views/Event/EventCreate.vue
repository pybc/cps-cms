<template>
  <div>
    <section>
      <section class="w-full md:w-4/6 mx-auto">
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
          v-if="this.eventItem.img"
          :src="this.eventItem.img"
          class="rounded-lg mx-auto"
          alt=""
        />
        <img
          v-else
          src="@/assets/event/picture.png"
          class="rounded-lg mx-auto"
          alt=""
        />
        <div class="flex">
          <div class="mb-8 w-96 relative">
            <div
              for="imgEvent"
              class="text-sm text-slate-500 font-semibold my-2"
            >
              Select poster event
            </div>
            <input
              class="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-slate-200 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              id="imgEvent"
              type="file"
              accept="image/png, image/jpeg"
              @change="imgToBase64(`imgEvent`)"
              :key="keyImgInput"
            />
            <p
              v-if="!validation.img && this.isSubmit"
              class="mt-1 text-sm text-red-500 absolute"
            >
              Please select your poster event
            </p>
          </div>
        </div>

        <div class="relative mb-8">
          <div class="text-sm text-slate-500 font-semibold">Event Name</div>
          <div class="text-sm text-slate-600 break-words my-2">
            <input
              type="text"
              v-model="eventItem.name"
              class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
          <p
            v-if="!validation.name && this.isSubmit"
            class="mb-1 text-sm text-red-500 absolute"
          >
            Please input event name
          </p>
        </div>
        <div class="mb-6 relative">
          <div class="text-sm text-slate-500 font-semibold">Description</div>
          <div class="text-sm text-slate-600 break-words mt-2">
            <textarea
              type="text"
              v-model="eventItem.description"
              class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
            />
          </div>
          <p
            v-if="!validation.description && this.isSubmit"
            class="mb-1 text-sm text-red-500 absolute"
          >
            Please input description
          </p>
        </div>
        <div class="relative mb-6">
          <div class="text-sm text-slate-500 font-semibold">Tags</div>
          <div class="flex w-full overflow-x-auto tags">
            <div
              v-for="(tag, index) in tagsList"
              :key="index"
              class="text-sm text-slate-600 capitalize mr-2 my-2"
            >
              <button
                :class="[
                  `flex p-2 md:px-6  text-white  rounded items-center capitalize `,
                  tag.status ? `bg-slate-800` : `bg-slate-400`,
                ]"
                @click="tag.status = !tag.status"
              >
                {{ tag.name }}
              </button>
            </div>
          </div>
          <p
            v-if="!validation.tags && this.isSubmit"
            class="mb-1 text-sm text-red-500 absolute"
          >
            Please input tags
          </p>
        </div>
        <div class="relative mb-6">
          <div class="text-sm text-slate-500 font-semibold mb-2">Location</div>
          <textarea
            type="text"
            v-model="eventItem.location"
            class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
          />
          <p
            v-if="!validation.location && this.isSubmit"
            class="mb-1 text-sm text-red-500 absolute"
          >
            Please input location
          </p>
        </div>

        <!-- <div class="relative mb-8">
          <div class="flex justify-between items-center">
            <div class="text-sm text-slate-500 font-semibold">Status</div>

            <DropDown
              class="my-2 md:mx-1"
              :value="eventItem.status"
              :option="[`opened`, `started`, `ended`]"
              @dropDownValue="receiveDropdownEditValue"
              :key="keyDropdown"
            />
          </div>
          <p
            v-if="!validation.status && this.isSubmit"
            class="mb-1 text-sm text-red-500 absolute"
          >
            Please input status
          </p>
        </div> -->
        <div class="flex justify-between items-center mb-8">
          <div class="relative">
            <div class="flex items-center">
              <span class="text-sm text-slate-500 font-semibold">Point</span>
              <input
                type="text"
                v-model="eventItem.point"
                class="text-sm text-slate-500 border border-slate-200 p-2 mx-2 w-full focus:outline-emerald-500"
              />
            </div>
            <p
              v-if="!validation.point && this.isSubmit"
              class="mt-1 text-sm text-red-500 absolute"
            >
              Please input point
            </p>
          </div>

          <div class="relative">
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
            <p
              v-if="!validation.maxMember && this.isSubmit"
              class="mt-1 text-sm text-red-500 absolute"
            >
              Please input max member
            </p>
          </div>

          <div class="relative">
            <div class="flex justify-between items-center">
              <div class="text-sm text-slate-500 font-semibold mx-1">
                Section
              </div>
              <input
                type="text"
                v-model="eventItem.section"
                class="text-sm text-slate-500 border border-slate-200 p-2 w-full focus:outline-emerald-500"
              />
            </div>
            <p
              v-if="!validation.section && this.isSubmit"
              class="mt-1 text-sm text-red-500 absolute"
            >
              Please input section
            </p>
          </div>
        </div>

        <div class="relative mb-8">
          <div class="text-sm text-slate-500 font-semibold">
            <span>Register date</span>
            <DateRange
              :startDate="eventItem.registerStart"
              :endDate="eventItem.registerEnd"
              class="mt-2"
              @onDateRange="onDateRangeRegister($event)"
            />
          </div>
          <p
            v-if="
              !validation.registerStart &&
              !validation.registerEnd &&
              this.isSubmit
            "
            class="text-sm text-red-500 absolute top-16"
          >
            Please select date register
          </p>
        </div>

        <div class="relative mb-8">
          <div class="text-sm text-slate-500 font-semibold">
            <span>Event date</span>

            <DateRange
              :startDate="eventItem.eventStart"
              :endDate="eventItem.eventEnd"
              class="mt-2"
              @onDateRange="onDateRangeEvent($event)"
            />
          </div>
          <p
            v-if="
              !validation.eventStart && !validation.eventEnd && this.isSubmit
            "
            class="mt-1 text-sm text-red-500 absolute top-16"
          >
            Please select date event
          </p>
        </div>

        <div class="flex justify-center mt-20 mb-20">
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
            @click="create()"
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
// import DropDown from "../../components/DropDown.vue";
import { createEvent } from "@/api/event.service.js";
import {
  TrashIcon,
  ChevronLeftIcon,
  CheckIcon,
  RefreshIcon,
} from "@vue-hero-icons/outline";

export default {
  components: {
    TrashIcon,
    ChevronLeftIcon,
    CheckIcon,
    RefreshIcon,
    DateRange,
  },
  data() {
    return {
      // REGEX_TEXT: /^[a-zA-Zก-๏\s]+$/,
      REGEX_NUMBER: /^[0-9]*$/,
      eventItem: {
        name: "",
        img: "",
        description: "",
        tags: [],
        location: "",
        status: "opened",
        point: 0,
        members: [],
        maxMember: 30,
        section: 4,
        registerStart: "",
        registerEnd: "",
        eventStart: "",
        eventEnd: "",
      },
      keyDropdown: "DDE" + 0,
      keyImgInput: "I" + 0,
      dateRangeRegister: {
        start: "",
        end: "",
      },
      dateRangeEvent: {
        start: "",
        end: "",
      },
      tagsList: [
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
      validation: {
        img: false,
        name: false,
        description: false,
        tags: false,
        location: false,
        point: false,
        maxMember: false,
        section: false,
        registerStart: false,
        registerEnd: false,
        eventStart: false,
        eventEnd: false,
      },
      isFormValidate: false,
      isSaveSuccess: false,
      isSubmit: false,
    };
  },

  methods: {
    receiveDropdownEditValue(value) {
      this.eventItem.status = value;
    },
    back() {
      this.$router.push("/event");
    },
    imgToBase64() {
      const file = document.getElementById(`imgEvent`)["files"][0];
      const reader = new FileReader();
      reader.onload = () => {
        this.eventItem.img = reader.result;
      };
      reader.readAsDataURL(file);
    },
    onDateRangeRegister(date) {
      this.dateRangeRegister.start = date.start.toISOString();
      this.dateRangeRegister.end = date.end.toISOString();
    },
    onDateRangeEvent(date) {
      this.dateRangeEvent.start = date.start.toISOString();
      this.dateRangeEvent.end = date.end.toISOString();
    },
    async create() {
      this.eventItem.tags = [];

      if (
        this.dateRangeRegister.start &&
        this.dateRangeRegister.end &&
        this.dateRangeEvent.start &&
        this.dateRangeEvent.end
      ) {
        this.eventItem.registerStart = this.dateRangeRegister.start;
        this.eventItem.registerEnd = this.dateRangeRegister.end;
        this.eventItem.eventStart = this.dateRangeEvent.start;
        this.eventItem.eventEnd = this.dateRangeEvent.end;
      }

      this.tagsList.forEach((editTag) => {
        if (editTag.status) {
          this.eventItem.tags.push(editTag.name.toLowerCase());
        }
      });

      this.checkValidation(this.eventItem);
      this.isSubmit = true;
      if (this.isFormValidate) {
        this.isSaveSuccess = await createEvent(this.eventItem);

        if (this.isSaveSuccess && this.isSubmit) {
          // ALERT SUCCESS
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Event has been created !",
            showConfirmButton: false,
            timer: 2000,
          });
          this.$router.push("/event");
        } else if (!this.isSaveSuccess && this.isSubmit) {
          // ALERT FAILED
          this.$swal.fire({
            position: "center",
            icon: "error",
            title: "Error please try again later !",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } else {
        // ALERT WARNING
        this.$swal.fire({
          position: "center",
          icon: "warning",
          title: "Failed to create event, Please check input !!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    checkValidation(event) {
      // CHECK EMPTY IMG
      this.validation.img = event.img ? true : false;
      // CHECK EMPTY EVENT NAME
      this.validation.name = event.name ? true : false;
      // CHECK EMPTY DESCRIPTION
      this.validation.description = event.description ? true : false;
      //  CHECK EMPTY TAGS ARRAY
      this.validation.tags = event.tags.length ? true : false;
      // CHECK EMPTY LOCATION
      this.validation.location = event.location ? true : false;
      // VALIDATE POINT
      this.validation.point =
        event.point && this.REGEX_NUMBER.test(event.point);
      // VALIDATE MAX_MEMBER
      this.validation.maxMember =
        event.maxMember && this.REGEX_NUMBER.test(event.maxMember);
      // VALIDATE SECTION
      this.validation.section =
        event.section && this.REGEX_NUMBER.test(event.section);
      //  CHECK EMPTY REGISTER_START
      this.validation.registerStart = event.registerStart ? true : false;
      //  CHECK EMPTY REGISTER_END
      this.validation.registerEnd = event.registerEnd ? true : false;
      //  CHECK EMPTY EVENT_START
      this.validation.eventStart = event.eventStart ? true : false;
      //  CHECK EMPTY EVENT_END
      this.validation.eventEnd = event.eventEnd ? true : false;

      this.isFormValidate =
        this.validation.img &&
        this.validation.name &&
        this.validation.description &&
        this.validation.tags &&
        this.validation.location &&
        this.validation.point &&
        this.validation.maxMember &&
        this.validation.section &&
        this.validation.registerStart &&
        this.validation.registerEnd &&
        this.validation.eventStart &&
        this.validation.eventEnd;
    },
  },
};
</script>

<style lang="scss" scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.tags::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.tags {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
