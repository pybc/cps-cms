<template>
  <div>
    <section>
      <section class="overflow-y-auto">
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Event Summary
        </div>
        <img :src="eventSelected.img" class="rounded-lg" alt="" />
        <div class="text-slate-600 font-semibold my-3">
          <span> Details </span>
        </div>

        <div>
          <div class="text-sm text-slate-500 font-semibold">Event Name</div>
          <div class="text-sm text-slate-600 break-words my-2">
            {{ eventSelected.name }}
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Description</div>
          <div class="text-sm text-slate-600 break-words my-2">
            {{ eventSelected.description }}
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Tags</div>
          <div class="flex">
            <div
              v-for="(tag, index) in eventSelected.tags"
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
            {{ eventSelected.location }}
          </div>
        </div>

        <div class="flex justify-between">
          <div class="text-sm text-slate-500 font-semibold">Status</div>
          <div
            :class="[
              `text-sm text-slate-600 font-medium capitalize  `,
              eventSelected.status === 'opened'
                ? ` text-green-600`
                : eventSelected.status === 'ended'
                ? ` text-red-600 `
                : eventSelected.status === 'started'
                ? ` text-yellow-600`
                : ` text-slate-600`,
            ]"
          >
            {{ eventSelected.status }}
          </div>
        </div>

        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Point</div>
          <div class="text-sm text-emerald-600 font-medium">
            {{ eventSelected.point }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Member</div>
          <div
            :class="[
              `text-sm  font-medium`,
              eventSelected.members.length === eventSelected.maxMember
                ? `text-red-600`
                : `text-emerald-600`,
            ]"
          >
            {{ eventSelected.members.length }} / {{ eventSelected.maxMember }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Section</div>
          <div class="text-sm font-medium text-slate-700">
            {{ eventSelected.section }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Register date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ dateFormat(eventSelected.registerEnd) }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Start date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ dateFormat(eventSelected.eventStart) }}
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">End date</div>
          <div class="text-sm font-medium text-slate-700">
            {{ dateFormat(eventSelected.eventEnd) }}
          </div>
        </div>
      </section>
      <div class="flex justify-center my-2">
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-white p-2 hover:bg-slate-200 mx-1"
          @click="openEditorEvent()"
        >
          <PencilIcon class="p-1" />
          Edit Event
        </button>
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-white p-2 hover:bg-slate-200 mx-1"
          @click="otherEvent()"
        >
          Other
        </button>
      </div>
      <div class="my-2">
        <button
          v-if="eventSelected.status === 'opened'"
          class="w-full flex items-center justify-center text-sm border font-medium border-slate-200 rounded bg-green-500 text-white p-2 mx-1"
          @click="startEvent()"
        >
          Start Event
        </button>
        <button
          v-if="eventSelected.status === 'started'"
          class="w-full flex items-center justify-center text-sm border font-medium border-slate-200 rounded bg-red-500 text-white p-2 mx-1"
          @click="endEvent()"
        >
          Close Event
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { PencilIcon } from "@vue-hero-icons/outline";
import moment from "moment";

export default {
  props: ["eventSelected"],
  components: {
    PencilIcon,
  },
  data() {
    return {
      eventData: [],
    };
  },
  methods: {
    async fetchEventList() {
      await this.$store.dispatch("event/fetchEventList");
    },
    openEditorEvent() {
      this.$store.dispatch("event/saveEventEdited", { ...this.eventSelected });
      this.$store.dispatch("event/openEditMode");
    },
    async startEvent() {
      let event = { ...this.eventSelected };
      event.status = "started";
      const isSaveSuccess = await this.$store.dispatch(
        "event/sendEventEditedToDatabase",
        event
      );
      if (isSaveSuccess) {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your data has been saved !",
          showConfirmButton: false,
          timer: 2000,
        });
        await this.fetchEventList();
        this.$store.dispatch("event/saveEventEdited", []);
      } else {
        this.$swal.fire({
          position: "center",
          icon: "error",
          title: "Error please try again later !",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    async endEvent() {
      let event = { ...this.eventSelected };
      event.status = "ended";
      const isSaveSuccess = await this.$store.dispatch(
        "event/sendEventEditedToDatabase",
        event
      );

      if (isSaveSuccess) {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Your data has been saved !",
          showConfirmButton: false,
          timer: 2000,
        });
        await this.fetchEventList();
        this.$store.dispatch("event/saveEventEdited", []);
      } else {
        this.$swal.fire({
          position: "center",
          icon: "error",
          title: "Error please try again later !",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    otherEvent() {
      this.$router.push(`/event/other/${this.eventSelected._id}`);
    },

    dateFormat(date) {
      return moment(date).format("DD MMM YYYY");
    },
  },
};
</script>

<style lang="scss" scoped></style>
