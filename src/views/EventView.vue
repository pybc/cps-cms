<template>
  <div class="event px-5 h-full bg-slate-50">
    <!-- MENU -->
    <div class="flex justify-between">
      <div class="text-3xl font-bold py-8">Event</div>

      <div class="flex items-center">
        <SearchBar @searchInput="receiveInputValue" class="mx-1" />
        <DropDown
          class="mx-1"
          value="Select your filter"
          :option="[
            `Last
        12 Months`,
            `Last 13 Months`,
            `Last 14 Months`,
          ]"
        />
        <div
          class="flex pr-4 pl-1 rounded items-center bg-primary cursor-pointer"
        >
          <PlusIcon class="text-slate-100 opacity-70 mx-1" />
          <button class="text-white text-sm py-2 drop-shadow-sm">
            Add Event
          </button>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <section class="bg-red-200 h-5/7 overflow-hidden">
      <header
        class="w-full h-14 border border-slate-200 bg-white flex items-center px-3"
      >
        <span class="font-bold">All Event</span>
        <span class="text-slate-400 ml-1">{{ eventList.length }}</span>
      </header>
      <table class="table-auto w-full">
        <thead
          class="h-10 bg-slate-50 border border-slate-200 px-3 font-semibold text-slate-500 uppercase text-xs"
        >
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Member</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="h-14 border bg-white border-slate-200 hover:bg-slate-100 px-3 text-sm cursor-pointer text-center text-slate-500"
            v-for="event in eventList"
            :key="event._id"
          >
            <td>
              <span class="text-black">{{ event.name }}</span>
            </td>
            <td>{{ event.eventStart }}</td>
            <td>{{ event.eventEnd }}</td>
            <td>{{ event.members.length }}/{{ event.maxMember }}</td>
            <td>
              <span
                :class="[
                  `rounded-full py-2 px-4 capitalize font-semibold`,
                  event.status === 'opened'
                    ? `bg-green-200 text-green-600`
                    : event.status === 'ended'
                    ? `bg-red-200 text-red-600 `
                    : event.status === 'started'
                    ? `bg-yellow-200 text-yellow-600`
                    : `bg-slate-200 text-slate-600`,
                ]"
              >
                {{ event.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="my-5">
      <p class="text-slate-500">
        Showing event 1 to 11 of {{ eventList.length }} results
      </p>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import DropDown from "../components/DropDown.vue";
import { PlusIcon } from "@vue-hero-icons/outline";
export default {
  name: "EventView",
  components: { SearchBar, DropDown, PlusIcon },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      maxPage: 10,
      eventList: [
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "opened",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },

        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "ended",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "started",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "Kick-off Startup by SU Entrepreneur Club",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "opened",
          point: 300,
          members: ["UID1", "UID2", "Ua28a9b8f51a7009c0361e8b9c3df674a"],
          maxMember: 30,
          section: 4,
          registerEnd: "1234567890",
          eventStart: "19 Mar 2021",
          eventEnd: "23 Mar 2021",
        },
      ],
    };
  },
  methods: {
    receiveInputValue(searchValue) {
      this.searchValue = searchValue;
    },
  },
};
</script>

<style lang="scss" scoped></style>
