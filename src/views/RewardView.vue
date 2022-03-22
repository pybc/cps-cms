<template>
  <div class="reward px-5 h-full bg-slate-50">
    <!-- HEADER -->
    <div class="flex justify-between">
      <div class="text-3xl font-bold py-8">Reward</div>
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
              <span class="text-black">{{ index + 1 }}</span>
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
                  class="w-4 mr-2 transform hover:text-emerald-500 hover:scale-110"
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
                  class="w-4 mr-2 transform hover:text-emerald-500 hover:scale-110"
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
          maxRow * currentPage < rewardList.length
            ? maxRow * currentPage
            : rewardList.length
        }}
        of {{ rewardList.length }} results
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
} from "@vue-hero-icons/outline";
export default {
  name: "RewardView",
  components: { SearchBar, DropDown, PlusIcon, ArrowLeftIcon, ArrowRightIcon },
  data() {
    return {
      searchValue: "",
      currentPage: 1,
      maxRow: 10,
      rewardList: [
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
          name: "Iphone",
          img: "https://www.img.in.th/images/e7772596da3e59aaea7763d30b49e046.jpg",
          description: "ascasczxcqwczsczxczcascasc",
          totalItem: 26,
          point: 300,
        },
        {
          _id: "6225d97d0c70c8101303eac8",
          name: "Ipad pro",
          itemId: "6225d97d0c70c8101303eac8",
          img: "https://www.img.in.th/images/3752a9c6788a06dd3069af3f27ef69bb.jpg",
          description: "amvioaevnmasdpovcmpoxzcxsc",
          totalItem: 23,
          point: 300,
        },
        {
          _id: "62303b9e5853bd8675ff4c51",
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
      console.log("startIndex", startIndex);
      const lastIndex = this.maxRow + startIndex;
      console.log("lastIndex", lastIndex);
      const renderEventList = this.rewardList.slice(startIndex, lastIndex);
      return renderEventList;
    },
    maxPage() {
      return Math.ceil(this.rewardList.length / 10);
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
  },
};
</script>
<style lang="scss" scoped></style>
