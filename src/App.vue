<template>
  <div id="app">
    <SideBar />
    <TopBar />
    <router-view class="ml-64" />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import TopBar from "./components/TopBar.vue";
export default {
  components: {
    SideBar,
    TopBar,
  },
};
</script>

<style>
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
}
</style>
