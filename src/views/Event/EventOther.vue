<template>
  <div>
    <section>
      <!-- ALERT -->

      <section class="w-full md:w-4/6 mx-auto">
        <button
          @click="back()"
          class="flex text-center text-slate-600 font-semibold border border-slate-200 px-2 py-1 my-5 bg-white hover:bg-slate-300 rounded"
        >
          <ChevronLeftIcon class="p-1" />
          Back to Event
        </button>
        <div class="flex text-center my-5 justify-between">
          <div>
            <button
              class="text-slate-600 font-semibold mr-5"
              @click="isMenuSelected = `message`"
            >
              Multi Message Event
            </button>
            <button
              class="text-slate-600 font-semibold mr-5"
              @click="isMenuSelected = `member`"
            >
              Member
            </button>
          </div>
          <div>
            <a
              class="font-semibold mr-5 bg-orange-500 text-white p-3 rounded"
              href="https://ex10.tech/manager/login"
              target="_blank"
            >
              <span class="text-black">(EX10 Chat Center)</span> Chat with user
            </a>
          </div>
        </div>
        <div v-if="isMenuSelected === `message`">
          <textarea
            name=""
            id=""
            rows="10"
            v-model="message"
            class="w-full border-slate-400"
          ></textarea>
          <button
            class="w-full py-1 rounded bg-primary text-white"
            @click="sendMessage()"
          >
            Send
          </button>
        </div>
        <div v-else-if="isMenuSelected === `member`">
          <!-- CONTENT -->
          <section class="h-4/5">
            <header
              class="w-full h-14 border border-slate-200 bg-white flex items-center px-3"
            >
              <span class="font-bold">All members</span>
              <span class="text-slate-400 ml-1">{{ memberList.length }}</span>
            </header>
            <table class="table-auto w-full">
              <thead
                class="h-10 bg-slate-50 border border-slate-200 px-3 font-semibold text-slate-500 uppercase text-xs"
              >
                <tr>
                  <th>No.</th>
                  <th>User Id</th>
                  <th>Display Name</th>
                  <th>Name</th>
                  <th>StudentId</th>
                  <th>Major</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="h-14 border bg-white border-slate-200 hover:bg-slate-100 px-3 text-sm cursor-pointer text-center text-slate-500"
                  v-for="(member, index) in memberList"
                  :key="member.uid"
                >
                  <td>
                    {{ maxRow * currentPage - maxRow + (index + 1) }}
                  </td>
                  <td>
                    <span class="text-black">{{ member.uid }}</span>
                  </td>
                  <td>
                    <span class="text-black">{{ member.displayName }}</span>
                  </td>
                  <td>
                    <span class="text-black">{{
                      member.firstName + " " + member.lastName
                    }}</span>
                  </td>
                  <td>
                    <span class="text-black">{{ member.studentId }}</span>
                  </td>
                  <td>
                    <span>
                      {{ member.major }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@vue-hero-icons/outline";
import { mapGetters } from "vuex";
import { multicastEvent } from "../../api/event.service";
export default {
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      isMenuSelected: "message",
      message: "",
      eventId: "",
      currentPage: 1,
      maxRow: 10,
    };
  },
  computed: {
    ...mapGetters({
      getEventById: "event/getEventById",
    }),
    memberList() {
      const startIndex =
        this.currentPage === 1
          ? 0
          : this.maxRow * this.currentPage - this.maxRow;
      const lastIndex = this.maxRow + startIndex;
      const renderMemberList = this.getEventById.memberList.slice(
        startIndex,
        lastIndex
      );
      return renderMemberList;
    },
  },
  async mounted() {
    await this.$store.dispatch(
      "event/fetchEventById",
      this.$route.params.eventId
    );
  },
  methods: {
    back() {
      this.$router.push(`/event`);
    },
    async sendMessage() {
      if (this.message.length > 0) {
        const res = await multicastEvent({
          eventId: this.$route.params.eventId,
          message: this.message,
        });
        if (!res) {
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Your message has been sent !",
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
        this.message = "";
      }
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
