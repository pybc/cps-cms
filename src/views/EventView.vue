<template>
  <div class="event px-5 h-full bg-slate-50">
    <!-- MENU -->
    <div class="flex justify-between">
      <div class="text-3xl font-bold py-8">Event</div>

      <div class="flex items-center">
        <div v-if="statusFilter || searchValue">
          <button
            class="flex bg-white border border-slate-200 mx-1 p-1 rounded"
            @click="clear()"
          >
            Clear <XIcon class="text-red-500" />
          </button>
        </div>
        <SearchBar
          @searchInput="receiveInputValue"
          :value="searchValue"
          class="mx-1"
          :key="searchKey"
        />
        {{ searchValue }}
        <DropDown
          class="mx-1"
          value="Select Status"
          :option="[`opened`, `started`, `ended`]"
          @dropDownValue="receiveDropdownValue"
          :key="dropdownKey"
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
            v-for="event in renderList"
            :key="event._id"
          >
            <td>
              <span class="text-black">{{ event.name }}</span>
            </td>
            <td>{{ event.eventStart }}</td>
            <td>{{ event.eventEnd }}</td>
            <td
              :class="
                event.members.length === event.maxMember &&
                event.status === 'opened'
                  ? `text-red-500`
                  : ``
              "
            >
              {{ event.members.length }}/{{ event.maxMember }}
            </td>
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
    <div class="my-5 flex justify-between">
      <p class="text-slate-500">
        Showing event {{ maxRow * currentPage - maxRow }} to
        {{
          maxRow * currentPage < eventFilter.length
            ? maxRow * currentPage
            : eventFilter.length
        }}
        of
        {{ eventFilter.length }}
        results
      </p>
      <div class="flex">
        <button
          @click="previousList"
          :class="[
            `border bg-white border-slate-200 hover:bg-slate-100 flex p-2`,
            currentPage === 1 ? `text-slate-300` : `text-green-500`,
          ]"
        >
          <ArrowLeftIcon class="p-1" />Previous
        </button>
        <button
          @click="nextList"
          :class="[
            `border bg-white border-slate-200 hover:bg-slate-100 flex p-2 ml-2`,
            currentPage === maxPage ? `text-slate-300` : `text-green-500`,
          ]"
        >
          Next <ArrowRightIcon class="p-1" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import DropDown from "../components/DropDown.vue";
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
} from "@vue-hero-icons/outline";
export default {
  name: "EventView",
  components: {
    SearchBar,
    DropDown,
    PlusIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    XIcon,
  },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      maxRow: 10,
      statusFilter: "",
      searchKey: 0,
      dropdownKey: 0,
      eventList: [
        {
          _id: "6226f73eb93e1e192b983be1",
          name: "xxx",
          img: "https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/273981489_3183704231872870_4231241122640609487_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=FSLMtJodNbIAX_EttM3&tn=NCnuf_xRNxGWrVL5&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT9Ob78HpBEsaRZLr3XUPGfw_5zGcXWx5jGiwxetATmjNQ&oe=623AF654",
          description:
            "แชร์ประสบการณ์จากรุ่นพี่สู่รุ่นน้อง โดยนักศึกษาผู้ประกอบการ",
          tags: ["GUIDE"],
          location: "zoom",
          status: "opened",
          point: 300,
          members: [
            "UID1",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "UID2",
            "Ua28a9b8f51a7009c0361e8b9c3df674a",
          ],
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
          name: "xxxxxxxx",
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
  computed: {
    renderList() {
      const startIndex =
        this.currentPage === 1
          ? 0
          : this.maxRow * this.currentPage - this.maxRow;
      const lastIndex = this.maxRow + startIndex;
      const renderEventList = this.eventFilter.slice(startIndex, lastIndex);
      return renderEventList;
    },
    eventFilter() {
      return this.eventList.filter((event) => {
        return (
          event.name.toLowerCase().includes(this.searchValue.toLowerCase()) &&
          event.status.toLowerCase().includes(this.statusFilter.toLowerCase())
        );
      });
    },
    maxPage() {
      return Math.ceil(this.eventList.length / 10);
    },
  },
  methods: {
    receiveInputValue(searchValue) {
      this.searchValue = searchValue;
    },
    nextList() {
      this.currentPage < this.maxPage ? this.currentPage++ : "";
    },
    previousList() {
      this.currentPage > 1 ? this.currentPage-- : "";
    },
    receiveDropdownValue(value) {
      this.statusFilter = value;
    },
    clear() {
      this.statusFilter = "";
      this.searchValue = "";
      this.forceRerenderSearch();
    },
    forceRerenderSearch() {
      this.dropdownKey += 1;
      this.searchKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
