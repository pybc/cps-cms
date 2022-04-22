<template>
  <div>
    <div
      :key="idNavTop"
      id="top-bar"
      :class="[
        isLogin ? ` xl:ml-64 py-4 bg-white` : `absolute xl:ml-64 py-4 bg-white`,
      ]"
    >
      <nav class="flex flex-row justify-end mr-5 text-slate-800 items-center">
        <div class="mx-2">
          <img
            @click="idNavTop++"
            src="@/assets/user-mockup.jpg"
            class="rounded-full w-10 h-10"
            alt="user-profile"
          />
        </div>
        <div>{{ displayName }}</div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isLogin: false,
      displayName: "",
      idNavTop: 0,
    };
  },
  computed: {
    ...mapGetters({
      userProfile: "auth/getUserProfile",
    }),
  },
  watch: {
    topNav() {
      if (this.userProfile) {
        this.idNavTop++;
      }
      console.log("this.idNavTop", this.idNavTop);
    },
  },
  created() {
    console.log("nav ->", this.userProfile);
    console.log("nav ->", this.userProfile.length);
    if (this.userProfile) {
      this.displayName = this.userProfile.displayName;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    console.log("login -> ", this.isLogin);
    console.log("this.idNavTop", this.idNavTop);
  },
};
</script>

<style lang="scss" scoped>
#top-bar {
  border-bottom: 1px solid gainsboro;
}
</style>
