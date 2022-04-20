<template>
  <div class="home">
    <div class="relative h-full">
      <img src="@/assets/home/top-frame.png" alt="" class="w-3/6" />
      <div class="absolute img-logo text-center">
        <img src="@/assets/home/logo.png" alt="" />
        <div class="text-primary font-bold text-2xl">
          Workshop Management Tools
        </div>
        <button
          class="bg-primary text-white font-semibold py-2 px-10 rounded mt-5"
        >
          Sign in with LINE
        </button>
      </div>
      <img
        src="@/assets/home/dizzy-happy-girl.png"
        class="absolute img-girl"
        alt=""
      />
      <img
        src="@/assets/home/bottom-frame.png"
        alt=""
        class="absolute right-0 -bottom-64 w-4/6"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
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
