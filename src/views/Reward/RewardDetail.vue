<template>
  <div>
    <section>
      <section class="overflow-y-auto">
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Reward Summary
        </div>
        <div class="flex justify-center">
          <img
            :src="rewardSelected.img"
            width="250"
            class="rounded-lg"
            alt="imgEvent"
          />
        </div>
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
              disabled
              type="text"
              :value="rewardSelected.description"
              class="w-full h-28 p-2 my-2 text-sm text-slate-600 resize-none rounded border border-emerald-500 focus:outline-emerald-500"
            />
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Point</div>
          <div class="font-medium text-sm text-emerald-600 break-words my-2">
            {{ rewardSelected.point }}
          </div>
        </div>

        <div class="flex justify-between my-2">
          <div class="text-sm text-slate-500 font-semibold">Total Reward</div>
          <div
            :class="[
              rewardSelected.totalItem ? `text-emerald-600` : `text-red-600`,
              `font-medium text-sm break-words my-2`,
            ]"
          >
            {{ rewardSelected.totalItem }}
          </div>
        </div>
      </section>
      <div class="flex justify-center my-2">
        <button
          :disabled="deleteClicked"
          class="w-full flex items-center justify-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-red-200 p-2 hover:text-red-500 hover:border-red-500 mx-1"
          @click="
            () => {
              deleteReward(rewardSelected._id);
            }
          "
        >
          <TrashIcon class="p-1" />
          {{ !deleteClicked ? `Delete Reward` : `Processing...` }}
        </button>
        <button
          class="w-full flex items-center justify-center text-sm border font-medium border-slate-200 rounded bg-red-500 text-white p-2 mx-1 hover:border-red-800 hover:text-slate-600"
          @click="$emit('closeWindowDetail', false)"
        >
          Close
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { TrashIcon } from "@vue-hero-icons/outline";
import { deleteReward } from "@/api/reward.service.js";

export default {
  props: ["rewardSelected"],
  components: {
    TrashIcon,
  },
  data() {
    return {
      deleteClicked: false,
    };
  },
  methods: {
    async deleteReward(rewardId) {
      console.log("deleteReward method");
      const response = await deleteReward(rewardId);
      console.log("Response deleteReward : ", response.status);

      if (response.status === 200) {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Reward has been removed !",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$emit("closeWindowDetail", false);
        await this.$store.dispatch("reward/fetchRewardList");
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
  },
};
</script>
