<script setup>
// ref to toggle between login and register
let loginScreen = ref(true);

// to watch for changes in the loginScreen ref
const loginScreenMsg = ref(loginScreen.value);

watch(loginScreenMsg, (val) => {
  loginScreen.value = val;
});

// stores the tokens from the server response
// refreshtoken is stored in cookies and accesstoken isnt stored anywhere and is used to authenticate the user on the api. accesstoken expires in very short time and the refreshtoken is used to get a new accesstoken and logic for that is already written in checkAuth.vue
let tokens = ref({});
</script>

<template>
  <div
    id="main-container"
    class="flex justify-center lg:justify-start flex-col lg:flex-row"
  >
    <!-- side banner for pc (gets hidden on mobile) -->
    <div
      id="side-banner-pc"
      class="hidden lg:flex flex-col justify-between w-[41.09375vw] h-screen bg-[#404555]"
    >
      <!-- container for pc logo -->
      <div id="logo container">
        <img
          class="mx-auto pt-[25.714vh]"
          src="~/assets/imgs/Group1244.png"
          alt="img"
        />
      </div>
      <!-- container for pose img and pc text  -->
      <div
        id="side-banner-pc_lower-container"
        class="overflow-hidden flex items-end w-[41.09375vw]"
      >
        <!-- pose img container -->
        <div class="h-[216px] w-[165px]">
          <img class="max-w-none" src="~/assets/imgs/POSE_02.png" alt="" />
        </div>
        <!-- pc text container -->
        <div class="flex-col w-[26.328125vw]">
          <h2 class="text-white text-2xl font-bold">Welcome back!</h2>
          <p class="text-white text-base mt-4">
            Sign In to find opportunities that match your interests. We have
            both part-time and full-time roles that can be done online and
            in-person.
          </p>
          <img
            src="~/assets/imgs/graphic.png"
            width="26.23"
            class="mt-12 mb-14"
            alt=""
          />
          <p class="text-white text-xs mb-8 font-normal">
            Please contact us at
            <a href="tel:+919380644532" class="font-semibold">+91-9380644532</a>
            if you need any assistance.
          </p>
        </div>
      </div>
    </div>
    <!-- top logo for mobile -->
    <div class="mobile_logo lg:hidden flex justify-center items-center my-10">
      <img src="~/assets/imgs/mobileLogo.png" alt="" />
    </div>

    <!-- form main container both pc and mobile-->
    <div
      class="formComponent lg:w-[58.90625vw] flex justify-center items-center"
      v-if="loginScreen"
    >
      <login :tokens="tokens" @response="(msg) => (loginScreenMsg = msg)" />
    </div>
    <div
      class="formComponent lg:w-[58.90625vw] flex justify-center items-center"
      v-else
    >
      <register :tokens="tokens" @response="(msg) => (loginScreenMsg = msg)" />
    </div>
  </div>
</template>
