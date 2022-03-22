<template>
  <div class="reward px-5 h-full bg-slate-50">
    <!-- HEADER -->
    <div class="flex justify-between">
      <div class="text-3xl font-bold py-8">Reward</div>
      <div class="flex items-center">
        <div v-if="pointFilter || searchFilter">
          <button
            class="flex items-center bg-red-200 border border-red-200 mx-1 p-1 rounded"
            @click="clear()"
          >
            Clear <XIcon class="text-red-500" />
          </button>
        </div>
        <SearchBar
          @searchInput="receiveInputValue"
          :value="searchFilter"
          class="mx-1"
          :key="searchKey"
        />
        <DropDown
          class="mx-1"
          value="Select Status"
          :option="[`Point < 300`, `Point = 300`, `Point > 300`]"
          @dropDownValue="receiveDropdownValue"
          :key="dropdownKey"
        />
        <div
          class="flex pr-4 pl-1 rounded items-center bg-primary cursor-pointer drop-shadow-md"
        >
          <PlusIcon class="text-slate-100 opacity-70 mx-1" />
          <button class="text-white text-sm py-2">Add Reward</button>
        </div>
      </div>
    </div>
    <!-- CONTENT -->
    <section class="bg-red-200 h-5/7 overflow-hidden">
      <header
        class="w-full h-14 border border-slate-200 bg-white flex items-center px-3"
      >
        <span class="font-bold">All Event</span>
        <span class="text-slate-400 ml-1">{{ rewardList.length }}</span>
      </header>
      <table class="table-auto w-full h-full">
        <thead
          class="h-10 bg-neutral-200 border border-slate-200 px-3 font-semibold text-black-500 uppercase text-xs"
        >
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Point</th>
            <th>Item</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="h-14 border bg-white border-slate-200 hover:bg-slate-100 px-3 text-sm cursor-pointer text-center text-slate-500"
            v-for="(reward, index) in renderList"
            :key="reward._id"
          >
            <td>
              <span class="text-black">{{
                maxRow * currentPage - maxRow + (index + 1)
              }}</span>
            </td>
            <td>
              <div class="flex items-center justify-center text-black">
                <div class="flex-shrink-0 w-10 h-10">
                  <img
                    class="w-full h-full rounded-full"
                    :src="reward.img"
                    alt=""
                  />
                </div>
                <div class="ml-5">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ reward.name }}
                  </p>
                </div>
              </div>
            </td>
            <td>{{ reward.point }}</td>
            <td>{{ reward.totalItem }}</td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center">
                <div
                  class="w-4 mr-2 transform text-yellow-500 hover:text-emerald-500 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <div
                  class="w-4 mr-2 transform text-red-500 hover:text-emerald-500 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            </td>
            <!-- <td
              :class="
                reward.members.length === reward.maxMember &&
                reward.status === 'opened'
                  ? `text-red-500`
                  : ``
              "
            >
              {{ reward.members.length }}/{{ reward.maxMember }}
            </td> -->
          </tr>
        </tbody>
      </table>
    </section>
    <div class="my-5 flex justify-between">
      <p class="text-slate-500">
        Showing reward {{ maxRow * currentPage - maxRow }} to
        {{
          maxRow * currentPage < rewardFilter.length
            ? maxRow * currentPage
            : rewardFilter.length
        }}
        of {{ rewardFilter.length }} results
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
  name: "RewardView",
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
      searchFilter: "",
      currentPage: 1,
      maxRow: 10,
      pointFilter: "",
      searchKey: 0,
      dropdownKey: 0,
      rewardList: [
        {
          _id: "6225d97d0c70c8101303eac1",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 3100,
        },
        {
          _id: "62303b9e5853bd8675ff4c52",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 3200,
        },
        {
          _id: "6225d97d0c70c8101303eac3",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 200,
        },
        {
          _id: "62303b9e5853bd8675ff4c54",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 100,
        },
        {
          _id: "6225d97d0c70c8101303eac5",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c56",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac7",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c58",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac9",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c10",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea11",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c12",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea13",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c14",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea15",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c16",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea17",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c18",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea19",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c20",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea21",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c22",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea23",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c24",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea25",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c26",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea27",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c28",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303ea29",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c30",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
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
      // console.log("startIndex", startIndex);
      const lastIndex = this.maxRow + startIndex;
      // console.log("lastIndex", lastIndex);
      const renderEventList = this.rewardFilter.slice(startIndex, lastIndex);
      return renderEventList;
    },
    maxPage() {
      return Math.ceil(this.rewardList.length / 10);
    },
    rewardFilter() {
      return this.rewardList
        .filter((reward) =>
          reward.name.toLowerCase().includes(this.searchFilter.toLowerCase())
        )
        .filter((reward) =>
          this.pointFilter === "Point < 300"
            ? reward.point < 300
            : this.pointFilter === "Point > 300"
            ? reward.point > 300
            : this.pointFilter === "Point = 300"
            ? reward.point === 300
            : reward.point
        );
    },
  },
  methods: {
    receiveInputValue(searchFilter) {
      this.searchFilter = searchFilter;
    },
    nextList() {
      this.currentPage < this.maxPage ? this.currentPage++ : "";
    },
    previousList() {
      this.currentPage > 1 ? this.currentPage-- : "";
    },
    receiveDropdownValue(value) {
      this.pointFilter = value;
    },
    clear() {
      this.pointFilter = "";
      this.searchFilter = "";
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
