<template>
  <div>
    <section
      :class="[`absolute z-50  right-10  `, display && isOpen ? ` ` : `hidden`]"
    >
      <div
        class="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
        role="alert"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check-circle"
          class="w-4 h-4 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
          ></path>
        </svg>
        <b class="mr-2">{{ topic }}</b> {{ text }}
        <button
          type="button"
          class="items-center btn-close box-content w-4 h-4 p-1 ml-auto text-green-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-green-900 hover:opacity-75 hover:no-underline"
          @click="isOpen = false"
        >
          <XIcon class="text-green-900 mx-1" />
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { XIcon } from "@vue-hero-icons/outline";
export default {
  props: ["display", "topic", "text", "footer"],
  components: {
    XIcon,
  },
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
