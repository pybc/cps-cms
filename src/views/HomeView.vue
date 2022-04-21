<template>
  <div class="home relative h-full">
    <img src="@/assets/home/top-frame.png" alt="" class="w-3/6" />
    <div class="absolute img-logo text-center">
      <img src="@/assets/home/logo.png" alt="" />
      <div class="text-primary font-bold text-2xl">
        Workshop Management Tools
      </div>
      <button
        @click="onLogin()"
        class="bg-primary text-white font-semibold py-2 px-10 rounded mt-5"
      >
        Sign in with LINE
      </button>
    </div>
    <img
      src="@/assets/home/dizzy-happy-girl.png"
      class="hidden absolute img-girl md:flex"
      alt=""
    />
    <img
      src="@/assets/home/bottom-frame.png"
      alt=""
      class="absolute right-0 bottom-0 w-4/6"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import lineUtils from "@/utils/line.utils";
export default {
  name: "HomeView",
  components: {},
  computed: {
    ...mapGetters({
      userProfile: "auth/getUserProfile",
    }),
  },
  async created() {
    await lineUtils.init();
  },
  methods: {
    async onLogin() {
      await lineUtils.login();
      const lineProfile = await lineUtils.getProfile();
      await this.$store.dispatch("auth/initProfile", lineProfile);
      this.$router.push("/event");
      this.$emit("onLogin", lineProfile);
    },
  },
};
</script>

<style scoped>
.img-girl {
  width: auto;
  max-width: 24%;
  top: 2%;
  right: 10%;
}
.img-logo {
  width: auto;
  max-width: 25%;
  top: 30%;
  left: 10%;
}
</style>
