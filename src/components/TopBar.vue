<template>
  <div id="top-bar" class="md:ml-64 py-4 bg-white">
    <nav class="flex flex-row justify-end mr-5 text-slate-800 items-center">
      <div class="mx-2 user">
        <img src="@/assets/user-mockup.jpg" alt="" />
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
.user {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
