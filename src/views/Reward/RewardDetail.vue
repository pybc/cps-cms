<template>
  <div>
    <section>
      <section class="overflow-y-auto">
        <div
          class="flex justify-between items-center text-center text-slate-600 font-semibold my-5"
        >
          Reward Summary
          <button
            @click="$emit('closeWindowDetail', false)"
            class="flex items-center rounded-full drop-shadow-sm bg-white p-2 hover:bg-slate-200 mx-1"
          >
            <XIcon class="text-red-400" />
          </button>
        </div>
        <img
          :src="rewardSelected.img"
          width="250"
          class="rounded-lg"
          alt="imgEvent"
        />
        <div class="text-slate-600 font-semibold my-3">
          <span> Details </span>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Reward Id</div>
          <div class="text-sm text-slate-600 break-words my-2">
            {{ rewardSelected._id }}
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Reward Name</div>
          <div class="text-sm text-slate-600 break-words my-2">
            {{ rewardSelected.name }}
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Description</div>
          <div class="text-sm text-slate-600 break-words my-2">
            <textarea
              type="text"
              :value="rewardSelected.description"
              class="w-full h-28 p-2 my-2 text-sm text-slate-600 resize-none rounded border border-emerald-500 focus:outline-emerald-500"
            />
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Point</div>
          <div class="text-sm text-emerald-600 break-words my-2">
            {{ rewardSelected.point }}
          </div>
        </div>

        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Total Reward</div>
          <div class="text-sm text-emerald-600 break-words my-2">
            {{ rewardSelected.totalItem }}
          </div>
        </div>
      </section>
      <div class="flex justify-center my-2">
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-red-200 p-2 hover:text-red-500 hover:border-red-500 mx-1"
          @click="() => deleteReward(activeReward._id)"
        >
          <TrashIcon class="p-1" />
          Delete Reward
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { TrashIcon, XIcon } from "@vue-hero-icons/outline";
import moment from "moment";

export default {
  props: ["rewardSelected"],
  components: {
    TrashIcon,
    XIcon,
  },
  methods: {
    openEditorEvent() {
      this.$store.dispatch("event/saveRewardEdited", {
        ...this.rewardSelected,
      });
      this.$store.dispatch("event/openEditMode");
    },

    dateFormat(date) {
      return moment(date).format("DD MMM YYYY");
    },
  },
};
</script>

<style lang="scss" scoped></style>
