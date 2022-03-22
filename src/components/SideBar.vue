<template>
  <div>
    <div
      class="hidden absolute xl:flex xl:flex-col text-left px-6 pt-3 w-64 h-full text-white nav-bar"
      style="background-color: #1e293b"
    >
      <div class="h-14 flex items-center justify-left mb-2 bg-w">
        <img src="@/assets/logo/cps-logo.png" class="w-24" alt="" />
      </div>
      <div class="menu">
        <div><router-link to="/event">Event</router-link></div>
        <div><router-link to="/reward">Reward</router-link></div>
        <div><router-link to="/achievement">Achievement</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.nav-bar {
  border-right: 1px solid black;
}
.menu {
  div {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 40px;
  }
}
</style>
