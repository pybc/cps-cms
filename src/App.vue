<template>
  <div id="app" class="`bg-slate-50`">
    <SideBar />
    <TopBar />
    <router-view class="`xl:ml-64`" />
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
  height: 100vh;
  overflow: auto;
}
</style>
