<script setup>
import axios from "axios";

const props = defineProps({
  tokens: Object,
});

const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/gm;

// to toggle between login and register
const emit = defineEmits(["response"]);

function goToSignUp() {
  emit("response", false);
}

// refs anf functions for form inputs
let email = ref("");
let password = ref("");
let showPassword = ref(true);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

// refs and functions for api call and error handling

let passwordErrorClasses = ref("");
let emailErrorClasses = ref("");

let success = ref(false);

let errorMessage = ref({
  type: "",
  message: "",
});

function clearInputs() {
  email.value = "";
  password.value = "";
}

function login() {
  success.value = false;
  errorMessage.value = {
    type: "",
    message: "",
  };
  const config = {
    headers: {},
  };

  const bodyParameters = {
    email: email.value,
    password: password.value,
  };

  // validate email and password

  if (!regex.test(email.value)) {
    emailErrorClasses.value = "text-red-500 border-red-500";
    errorMessage.value.type = "email";
    errorMessage.value.message =
      "Sorry! This mobile number/email is invalid. Please try again.";
  }

  if (password.value.length < 4) {
    passwordErrorClasses.value = "text-red-500 border-red-500";
    errorMessage.value.type = "password";
    errorMessage.value.message =
      "Sorry! This password is invalid. Please try again.";
    return;
  }

  axios
    .post("http://localhost:3001/api/auth/login", bodyParameters, config)
    .then((res) => {
      props.tokens.value = JSON.stringify(res.data);
      success.value = true;
      clearInputs();
      emailErrorClasses.value = "border-lime-600 ";
      passwordErrorClasses.value = " border-lime-600 ";
      errorMessage.value = {
        type: "",
        message: "",
      };
    })
    .catch((err) => {
      props.tokens.value = JSON.stringify(err.response.data);
      success.value = false;
      errorMessage.value = {
        type: "",
        message: "",
      };

      if (err.response.data.error == "Email is incorrect") {
        emailErrorClasses.value = "text-red-500 border-red-500";
        errorMessage.value.type = "email";
        errorMessage.value.message =
          "Sorry! This mobile number/email is not registered.";
      } else if (err.response.data.error == "Incorrect password") {
        passwordErrorClasses.value = "text-red-500 border-red-500";
        errorMessage.value.type = "password";
        errorMessage.value.message =
          "Sorry! The password you entered is incorrect.";
      }
      //Email is incorrect
      //Incorrect password
    });
}
</script>

<template>
  <form action="" class="px-[5vw]">
    <div
      class="lg:w-[30vw] flex flex-col justify-between lg:justify-start h-[80vh] lg:h-fit"
    >
      <!-- container for h1, p and input feilds -->
      <div class="" v-on:submit.prevent="onSubmit">
        <h1 class="font-bold text-2xl">Sign In to WisdomCircle</h1>
        <p class="text-sm mt-1 mb-6">
          Don't have an account?
          <a
            v-on:click.stop.prevent="goToSignUp"
            class="text-blue-500 font-semibold cursor-pointer"
            >Sign Up</a
          >
        </p>

        <!-- success message -->
        <p class="text-sm mt-1 mb-6 text-lime-600" v-if="success">
          Successfull logged in! Welcome back!
        </p>

        <!-- email/ mobile number input -->
        <input
          v-model="email"
          class="p-4 pr-12 border rounded-sm h-12 w-full"
          :class="emailErrorClasses"
          type="text"
          placeholder="Email or Mobile Number"
          required
        />

        <!-- error message for email/mobile -->
        <p
          v-if="errorMessage.type == 'email'"
          class="text-sm mt-1 mb-6 text-red-600"
        >
          {{ errorMessage.message }}
        </p>

        <!-- password inputs -->
        <div class="password_input relative">
          <input
            v-model="password"
            class="p-4 border rounded-sm h-12 w-full mt-4"
            type="password"
            :class="passwordErrorClasses"
            placeholder="Password"
            required
            v-if="showPassword"
          />

          <input
            v-model="password"
            class="p-4 border rounded-sm h-12 w-full mt-4"
            type="text"
            required
            placeholder="Password"
            :class="passwordErrorClasses"
            v-else
          />

          <img
            @click="togglePassword"
            src="~/assets/imgs/Icon.png"
            alt=""
            class="absolute right-[2vw] lg:right-[1vw] bottom-3"
          />
        </div>

        <!-- error message -->
        <p
          v-if="errorMessage.type == 'password'"
          class="text-sm mt-1 mb-6 text-red-600"
        >
          {{ errorMessage.message }}
        </p>

        <!-- forgot password -->
        <div class="lg:w-[30vw] flex justify-end pt-1">
          <a href="#" class="text-blue-500 font-semibold">Forgot password</a>
        </div>
      </div>

      <!-- sign in button -->
      <button
        type="submit"
        v-on:click.stop.prevent="login"
        class="bg-[#F1C12B] font-semibold text-lg w-full h-12 rounded-sm mt-6"
      >
        Sign In
      </button>
    </div>
  </form>
</template>
