<template>
  <div class="h-full">
    <section>
      <section class="overflow-y-auto">
        <div class="flex text-center text-slate-600 font-semibold my-5">
          Claim Summary
        </div>
        <img :src="claimSelected.itemImg" class="rounded-lg max-h-96" alt="" />
        <div class="text-slate-600 font-semibold my-3">
          <span> Details </span>
        </div>

        <div>
          <div class="text-sm text-slate-500 font-semibold">Item Name</div>
          <div class="text-sm text-slate-600 break-words my-2">
            {{ claimSelected.itemName }}
          </div>
        </div>
        <div>
          <div class="text-sm text-slate-500 font-semibold">Claim By</div>
          <div class="text-sm text-slate-600 break-words my-2">
            {{ claimSelected.firstName }} {{ claimSelected.lastName }}
          </div>
        </div>

        <div>
          <div>
            <div class="text-sm text-slate-500 font-semibold">StudentID</div>
            <div class="text-sm text-slate-600 break-words my-2">
              {{ claimSelected.studentId }}
            </div>
          </div>

          <div class="flex justify-between">
            <div class="text-sm text-slate-500 font-semibold">Status</div>
            <div
              :class="[
                `text-sm text-slate-600 font-medium capitalize  `,
                claimSelected.status === 'confirm'
                  ? ` text-green-600`
                  : claimSelected.status === 'cancel'
                  ? ` text-red-600 `
                  : claimSelected.status === 'waiting'
                  ? ` text-yellow-600`
                  : ` text-slate-600`,
              ]"
            >
              {{ claimSelected.status }}
            </div>
          </div>

          <div class="flex justify-between my-2">
            <div class="text-sm text-slate-500 font-semibold">Claim date</div>
            <div class="text-sm font-medium text-slate-700">
              {{
                claimSelected.claimDate === null
                  ? "-"
                  : dateFormat(claimSelected.claimDate)
              }}
            </div>
          </div>
          <div class="flex justify-between my-2">
            <div class="text-sm text-slate-500 font-semibold">Confirm date</div>
            <div class="text-sm font-medium text-slate-700">
              {{
                claimSelected.confirmDate === null
                  ? "-"
                  : dateFormat(claimSelected.confirmDate)
              }}
            </div>
          </div>
        </div>
      </section>
      <div
        v-if="claimSelected.status === 'waiting'"
        class="flex justify-center my-2"
      >
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-green-400 p-2 hover:bg-green-200 mx-1"
          @click="
            () => {
              isModalConfirm = true;
              message = '';
            }
          "
        >
          Confirm Claim
        </button>
        <button
          class="flex items-center text-sm border text-slate-600 font-medium border-slate-200 rounded bg-red-400 p-2 hover:bg-red-200 mx-1"
          @click="
            () => {
              isModalCancel = true;
              message = '';
            }
          "
        >
          Cancel Claim
        </button>
      </div>

      <!-- MODAL CONFIRM -->

      <section
        v-if="isModalConfirm"
        class="absolute w-full h-full bg-quaternary bg-opacity-50 top-0 left-0"
      >
        <div
          class="absolute bg-white top-1/3 left-0 sm:left-1/4 lg:left-2/4 p-9 rounded text-center"
        >
          <div class="text-2xl font-bold my-3">Are you sure</div>
          <div class="text-xl my-3">
            <span class="text-green-500 font-bold">Confirm</span> claim
            <b>{{ claimSelected.itemName }}</b> by
            <b>{{ claimSelected.firstName + " " + claimSelected.lastName }}</b>
            ?
          </div>
          <div class="flex flex-col">
            <span class="text-left">Attach a message (Optional) </span>
            <label
              for="checked"
              class="mt-3 inline-flex items-center cursor-pointer"
            >
              <span class="relative mb-2">
                <span
                  class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"
                ></span>
                <span
                  :class="[
                    isSendMessage
                      ? `absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-600 transform translate-x-full`
                      : `absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`,
                  ]"
                >
                  <input
                    id="checked"
                    type="checkbox"
                    class="absolute opacity-0 w-0 h-0"
                    @click="
                      () => {
                        isSendMessage = !isSendMessage;
                        message = '';
                      }
                    "
                  />
                </span>
              </span>

              <span class="ml-3 text-sm">{{
                isSendMessage ? `Attach` : "Not attach"
              }}</span>
            </label>
          </div>
          <div v-if="isSendMessage" class="flex flex-col justify-center">
            <div class="text-sm">Please input the message for the user.</div>
            <textarea
              class="focus:outline-emerald-500 my-2 bg-slate-200 rounded text-sm"
              name="message"
              id="message"
              v-model="message"
              cols="30"
              rows="4"
            ></textarea>
          </div>
          <div class="flex justify-center my-3">
            <button
              @click="confirmClaim()"
              class="flex items-center border text-slate-600 font-medium border-slate-200 rounded bg-green-400 py-2 px-4 hover:bg-green-200 mx-1"
            >
              Yes
            </button>
            <button
              @click="
                () => {
                  isModalConfirm = false;
                  isSendMessage = false;
                }
              "
              class="flex items-center border text-slate-600 font-medium border-slate-200 rounded bg-slate-200 py-2 px-4 hover:bg-slate-400 mx-1"
            >
              No
            </button>
          </div>
        </div>
      </section>

      <!-- MODAL CANCEL -->

      <section
        v-if="isModalCancel"
        class="absolute w-full h-full bg-quaternary bg-opacity-50 top-0 left-0"
      >
        <div
          class="absolute bg-white top-1/3 left-0 sm:left-1/4 lg:left-2/4 p-9 rounded text-center"
        >
          <div class="text-2xl font-bold my-3">Are you sure</div>
          <div class="text-xl my-3">
            <span class="text-red-500 font-bold">Cancel</span> claim
            <b>{{ claimSelected.itemName }}</b> by
            <b>{{ claimSelected.firstName + " " + claimSelected.lastName }}</b>
            ?
          </div>
          <div class="flex flex-col">
            <span class="text-left">Attach a message (Optional) </span>
            <label
              for="checked"
              class="mt-3 inline-flex items-center cursor-pointer"
            >
              <span class="relative mb-2">
                <span
                  class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"
                ></span>
                <span
                  :class="[
                    isSendMessage
                      ? `absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-600 transform translate-x-full`
                      : `absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`,
                  ]"
                >
                  <input
                    id="checked"
                    type="checkbox"
                    class="absolute opacity-0 w-0 h-0"
                    @click="
                      () => {
                        isSendMessage = !isSendMessage;
                        message = '';
                      }
                    "
                  />
                </span>
              </span>

              <span class="ml-3 text-sm">{{
                isSendMessage ? `Attach` : "Not attach"
              }}</span>
            </label>
          </div>
          <div v-if="isSendMessage" class="flex flex-col justify-center">
            <div class="text-sm">Please input the message for the user.</div>
            <textarea
              class="focus:outline-emerald-500 my-2 bg-slate-200 rounded text-sm"
              name="message"
              id="message"
              v-model="message"
              cols="30"
              rows="4"
            ></textarea>
          </div>
          <div class="flex justify-center my-3">
            <button
              @click="cancelClaim()"
              class="flex items-center border text-slate-600 font-medium border-slate-200 rounded bg-green-400 py-2 px-4 hover:bg-green-200 mx-1"
            >
              Yes
            </button>
            <button
              @click="
                () => {
                  isModalCancel = false;
                  isSendMessage = false;
                }
              "
              class="flex items-center border text-slate-600 font-medium border-slate-200 rounded bg-slate-200 py-2 px-4 hover:bg-slate-400 mx-1"
            >
              No
            </button>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import { confirmClaim, cancelClaim } from "@/api/claim.service.js";
export default {
  props: ["claimSelected"],
  data() {
    return {
      isSendMessage: false,
      isModalConfirm: false,
      isModalCancel: false,
      message: "",
    };
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("DD MMM YYYY");
    },
    async confirmClaim() {
      this.isModalConfirm = false;
      this.isSendMessage = false;
      const { status } = await confirmClaim({
        _id: this.claimSelected._id,
        message: this.message,
      });
      if (status === 200) {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Claim has been confirmed !",
          showConfirmButton: false,
          timer: 2000,
        });
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
    async cancelClaim() {
      this.isModalCancel = false;
      this.isSendMessage = false;
      const { status } = await cancelClaim({
        _id: this.claimSelected._id,
        message: this.message,
      });
      if (status === 200) {
        this.$swal.fire({
          position: "center",
          icon: "success",
          title: "Claim has been canceled !",
          showConfirmButton: false,
          timer: 2000,
        });
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

<style lang="scss" scoped>
.modal {
  left: 50%;
  top: 50%;
}
</style>
