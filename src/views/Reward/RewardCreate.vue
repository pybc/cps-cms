<template>
  <div>
    <section>
      <!-- ALERT -->
      <AlertWarning
        :key="keyAlertWarning"
        topic="Edit reward is not complete !!"
        text="Please check in on
        some of those fields below."
        :display="!isFormValidate && isSubmit"
      />
      <AlertDanger
        :key="keyAlertDanger"
        topic="Edit reward is not complete !!"
        text="Please Try again later."
        :display="!isSaveSuccess && isFormValidate && isSubmit"
      />
      <AlertSuccess
        :key="keyAlertSuccess"
        topic="Edit reward is complete !!"
        text="Data was saved successfully."
        :display="isSaveSuccess && isFormValidate"
      />

      <section class="w-full md:w-4/6 mx-auto">
        <button
          @click="back()"
          class="flex text-center text-slate-600 font-semibold border border-slate-200 px-2 py-1 my-5 bg-white hover:bg-slate-300 rounded"
        >
          <ChevronLeftIcon class="p-1" />
          Back to Reward
        </button>
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Create Reward
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
              Select image reward
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
              Please select your image reward
            </p>
          </div>
        </div>

        <div class="relative mb-8">
          <div class="text-sm text-slate-500 font-semibold">Reward Name</div>
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
            Please input reward name
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
        <div class="flex justify-start items-center mb-8">
          <div class="relative">
            <div class="flex items-center">
              <span class="text-sm text-slate-500 font-semibold">Point</span>
              <input
                type="text"
                v-model="eventItem.point"
                class="text-sm text-emerald-600 border border-slate-200 p-2 mx-2 w-full focus:outline-emerald-500"
              />
            </div>
            <p
              v-if="!validation.point && this.isSubmit"
              class="mt-1 text-sm text-red-500 absolute"
            >
              Please input point of reward
            </p>
          </div>

          <div class="relative">
            <div class="flex items-center">
              <span class="w-24 text-sm text-slate-500 font-semibold"
                >Total Reward</span
              >
              <div
                class="text-sm font-medium flex items-center text-emerald-600"
              >
                <input
                  type="text"
                  v-model="eventItem.totalItem"
                  class="border border-slate-200 p-2 w-full focus:outline-emerald-500"
                />
              </div>
            </div>
            <p
              v-if="!validation.totalItem && this.isSubmit"
              class="mt-1 text-sm text-red-500 absolute"
            >
              Please input total reward
            </p>
          </div>
        </div>

        <div class="flex justify-center mt-20 mb-20">
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
import AlertWarning from "@/components/AlertWarning.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "../../components/AlertDanger.vue";
import imageCompression from "browser-image-compression";
import { createReward } from "@/api/reward.service.js";
import {
  ChevronLeftIcon,
  CheckIcon,
  RefreshIcon,
} from "@vue-hero-icons/outline";

export default {
  components: {
    ChevronLeftIcon,
    CheckIcon,
    RefreshIcon,
    AlertWarning,
    AlertSuccess,
    AlertDanger,
  },
  data() {
    return {
      REGEX_NUMBER: /^[0-9]*$/,
      eventItem: {
        name: "",
        img: "",
        description: "",
        point: 0,
        totalItem: 0,
      },
      countAlertKey: 0,
      keyAlertWarning: "AW" + 0,
      keyAlertSuccess: "AS" + 0,
      keyAlertDanger: "AD" + 0,
      keyDropdown: "DDE" + 0,
      keyImgInput: "I" + 0,
      validation: {
        img: false,
        name: false,
        description: false,
        point: false,
        totalItem: false,
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
      this.$router.push("/reward");
    },
    async imgToBase64() {
      try {
        const file = document.getElementById(`imgEvent`)["files"][0];
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        };
        console.log("file : ", file);
        const compressedFile = await imageCompression(file, options);
        console.log("compressedFile : ", compressedFile);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          this.eventItem.img = reader.result;
        };
      } catch (error) {
        console.log(error);
      }
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
      this.checkValidation(this.eventItem);
      this.isSubmit = true;
      if (this.isFormValidate) {
        this.isSaveSuccess = await createReward({
          ...this.eventItem,
          img: "https://www.img.in.th/images/b3da56b6b62ede85ffb4a3ecda739cb9.jpg",
        });

        if (this.isSaveSuccess && this.isSubmit) {
          // ALERT SUCCESS
          this.keyAlertSuccess = this.keyAlertSuccess + this.countAlertKey;
          this.$router.push("/reward");
        } else if (!this.isSaveSuccess && this.isSubmit) {
          // ALERT FAILED
          this.keyAlertDanger = this.keyAlertDanger + this.countAlertKey;
        }
      } else {
        // ALERT WARNING
        this.isSaveSuccess = false;
        this.isSubmit = false;
        this.keyAlertWarning = this.keyAlertWarning + this.countAlertKey;
        this.countAlertKey++;
      }
    },
    checkValidation(reward) {
      // CHECK EMPTY IMG
      this.validation.img = reward.img ? true : false;
      // CHECK EMPTY EVENT NAME
      this.validation.name = reward.name ? true : false;
      // CHECK EMPTY DESCRIPTION
      this.validation.description = reward.description ? true : false;
      //  CHECK EMPTY TAGS ARRAY
      this.validation.point =
        reward.point && this.REGEX_NUMBER.test(reward.point);
      // VALIDATE MAX_MEMBER
      this.validation.totalItem =
        reward.totalItem && this.REGEX_NUMBER.test(reward.totalItem);

      this.isFormValidate =
        this.validation.img &&
        this.validation.name &&
        this.validation.description &&
        this.validation.point &&
        this.validation.totalItem;
    },
    resetEvent() {
      this.isSubmit = false;
      this.eventItem = {
        ...this.eventItem,
        name: "",
        img: "",
        description: "",
        point: 0,
        totalItem: 0,
      };
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
