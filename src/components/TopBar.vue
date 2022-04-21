<template>
  <div id="top-bar" class="absolute xl:ml-64 py-4 bg-white">
    <nav class="flex flex-row justify-end mr-5 text-slate-800 items-center">
      <div class="mx-2">
        <img
          src="@/assets/user-mockup.jpg"
          class="rounded-full w-10 h-10"
          alt="user-profile"
        />
      </div>
      <div>DisplayName</div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#top-bar {
  border-bottom: 1px solid gainsboro;
}
</style>
