<template>
  <div id="app" :class="[loginStatus ? `bg-slate-50` : ``]">
    <SideBar v-if="loginStatus" />
    <TopBar v-if="loginStatus" />
    <router-view @onLogin="onLogin" :class="[loginStatus ? `xl:ml-64` : ``]" />
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
  data() {
    return {
      loginStatus: false,
    };
  },
  methods: {
    onLogin(lineProfile) {
      if (lineProfile.length) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    },
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
