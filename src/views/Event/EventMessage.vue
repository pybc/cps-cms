<template>
  <div>
    <section>
      <!-- ALERT -->
      <AlertWarning
        :key="keyAlertWarning"
        topic="Edit event is not complete !!"
        text="Please check in on
        some of those fields below."
        :display="!isFormValidate"
      />
      <AlertDanger
        :key="keyAlertDanger"
        topic="Edit event is not complete !!"
        text="Please Try again later."
        :display="!isSaveSuccess && isSubmit"
      />
      <AlertSuccess
        :key="keyAlertSuccess"
        topic="Edit event is complete !!"
        text="Data was saved successfully."
        :display="isSaveSuccess"
      />

      <section class="w-full md:w-4/6 mx-auto">
        <button
          @click="back()"
          class="flex text-center text-slate-600 font-semibold border border-slate-200 px-2 py-1 my-5 bg-white hover:bg-slate-300 rounded"
        >
          <ChevronLeftIcon class="p-1" />
          Back to Event
        </button>
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Send Message Event
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import AlertWarning from "@/components/AlertWarning.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "../../components/AlertDanger.vue";
import { ChevronLeftIcon } from "@vue-hero-icons/outline";

export default {
  components: {
    ChevronLeftIcon,

    AlertWarning,
    AlertSuccess,
    AlertDanger,
  },
  data() {
    return {
      // REGEX_TEXT: /^[a-zA-Zก-๏\s]+$/,
      REGEX_NUMBER: /^[0-9]*$/,
      eventItem: "",
      countEditKey: 0,
      countAlertKey: 0,
      keyAlertWarning: "AW" + 0,
      keyAlertSuccess: "AS" + 0,
      keyAlertDanger: "AD" + 0,
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
      validation: {
        img: false,
        name: false,
        description: false,
        tags: false,
        location: false,
        status: false,
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

  computed: {
    eventEdited() {
      return this.$store.state.event.eventEdited;
    },
  },
  mounted() {
    this.eventItem = { ...this.eventEdited };
    this.checkValidation(this.eventItem);
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
      this.$router.push(`/event`);
    },
    imgToBase64() {
      const file = document.getElementById(`editImgEvent`)["files"][0];
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
    async saveEvent() {
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

      this.editTagsList.forEach((editTag) => {
        if (editTag.status) {
          this.eventItem.tags.push(editTag.name.toLowerCase());
        }
      });
      if (this.editBase64String) {
        this.eventItem.img = this.editBase64String;
      }
      this.checkValidation(this.eventItem);
      if (this.isFormValidate) {
        this.isSaveSuccess = await this.$store.dispatch(
          "event/sendEventEditedToDatabase",
          this.eventItem
        );
        this.isSubmit = true;

        // ALERT FAILED
        if (this.isSaveSuccess) {
          // ALERT SUCCESS
          this.keyAlertSuccess = this.keyAlertSuccess + this.countAlertKey;
          await this.$store.dispatch("event/fetchEventList");
          this.$store.dispatch("event/closeEditMode");
        } else if (!this.isSaveSuccess && this.isSubmit) {
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
      // CHECK EMPTY STATUS
      this.validation.status = event.status ? true : false;
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
        this.validation.status &&
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
