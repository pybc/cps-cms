<template>
  <div>
    <section>
      <AlertDanger
        :key="keyAlertDanger"
        topic="Remove reward is not complete !!"
        text="Please Try again later."
        :display="!deleteStatus && deleteClicked"
      />
      <AlertSuccess
        :key="keyAlertSuccess"
        topic="Remove reward is complete !!"
        text="Data was cleared successfully."
        :display="deleteStatus && deleteClicked"
      />
      <section class="overflow-y-auto">
        <div
          class="flex justify-between items-center text-center text-slate-600 font-semibold my-5"
        >
          Reward Summary
          <button
            @click="$emit('closeWindowDetail', false)"
            class="flex items-center rounded-full drop-shadow-md bg-white p-2 hover:bg-slate-200 mx-1"
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
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-red-200 p-2 hover:text-red-500 hover:border-red-500 mx-1"
          @click="
            () => {
              deleteReward(rewardSelected._id);
            }
          "
        >
          <TrashIcon class="p-1" />
          {{ !deleteClicked ? `Delete Reward` : `Processing...` }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { TrashIcon, XIcon } from "@vue-hero-icons/outline";
import { deleteReward } from "@/api/reward.service.js";
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "../../components/AlertDanger.vue";
export default {
  props: ["rewardSelected"],
  components: {
    TrashIcon,
    XIcon,
    AlertSuccess,
    AlertDanger,
  },
  data() {
    return {
      deleteClicked: false,
      deleteStatus: null,
      keyAlertSuccess: "AS" + 0,
      keyAlertDanger: "AD" + 0,
      index: 1,
    };
  },
  methods: {
    async deleteReward(rewardId) {
      console.log("deleteReward method");
      const response = await deleteReward(rewardId);
      console.log("Response deleteReward : ", response.status);

      if (response.status === 200) {
        console.log("Status 200");
        this.keyAlertSuccess = `AS${this.index}`;
        this.index++;
        console.log("Index : ", this.index);
        this.$emit("closeWindowDetail", false);
        await this.$store.dispatch("reward/fetchRewardList");
      } else {
        console.log("Status !== 200");
        this.keyAlertDanger = `AD${this.index}`;
        this.index++;
        console.log("Index : ", this.index);
        this.deleteClicked = false;
      }
      response.status === 200
        ? (this.deleteStatus = true)
        : (this.deleteStatus = false);
      this.deleteClicked = true;
      console.log("deleteClicked : ", this.deleteClicked);
      console.log("deleteStatus : ", this.deleteStatus);
    },
  },
};
</script>

<style lang="scss" scoped></style>
