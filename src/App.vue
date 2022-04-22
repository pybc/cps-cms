<template>
  <div id="app" :class="[this.userProfile ? `bg-slate-50` : ``]">
    <SideBar v-if="this.userProfile" />
    <TopBar v-if="this.userProfile" />
    <router-view :class="[this.userProfile ? `xl:ml-64` : ``]" />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import TopBar from "./components/TopBar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    SideBar,
    TopBar,
  },
  computed: {
    ...mapGetters({
      userProfile: "auth/getUserProfile",
    }),
  },
  watch() {
    if (this.userProfile) {
      console.log(this.$route.name);
      this.$router.push("/event");
    }
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
