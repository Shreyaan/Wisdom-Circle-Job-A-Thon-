<script setup>
import axios from "axios";

const props = defineProps({
  tokens: Object,
});

// to toggle between login and register
const emit = defineEmits(["response"]);
function goToSignin() {
  emit("response", true);
}

// refs anf functions for form inputs
let Firstname = ref("");
let lastName = ref("");
let password = ref("");
let email = ref("");

let showPassword = ref(true);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

// refs and functions for api call and error handling
let success = ref(false);
let passwordErrorClasses = ref("");
let errorMessage = ref({
  type: "",
  message: "",
});

function clearInputs() {
  email.value = "";
  password.value = "";

  Firstname.value = "";
  lastName.value = "";
}

function register() {
  const config = {
    headers: {},
  };

  const bodyParameters = {
    email: email.value,
    password: password.value,
    name: `${Firstname.value} ${lastName.value}`,
  };

  if (password.value.length < 8) {
    passwordErrorClasses.value = "text-red-500 border-red-500";
    errorMessage.value.type = "error";
    errorMessage.value.message =
      "Sorry! This password is invalid. Please try again.";
    return;
  }

  axios
    .post("http://localhost:3001/api/auth/register", bodyParameters, config)
    .then((res) => {
      props.tokens.value = JSON.stringify(res.data);
      success.value = true;
      clearInputs();
      errorMessage.value = {
        type: "",
        message: "",
      };
    })
    .catch((err) => {
      props.tokens.value = JSON.stringify(err.response.data);
      success.value = false;

      if (
        err.response.data.error ===
        `duplicate key value violates unique constraint "users_user_email_key"`
      ) {
        errorMessage.value.type = "error";
        errorMessage.value.message =
          "This email/phone number is already registered";
      } else
        errorMessage.value = {
          type: "error",
          message: err.response.data.error,
        };
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
        <h1 class="font-bold text-2xl">Create an account</h1>
        <p class="text-sm mt-1 mb-6">
          Already have an account?
          <a
            v-on:click.stop.prevent="goToSignin"
            class="text-blue-500 font-semibold cursor-pointer"
            >Sign In</a
          >
        </p>

        <!-- success message -->
        <p class="text-sm mt-1 mb-6 text-lime-600" v-if="success">
          Successfull registered!
        </p>

        <!-- name input -->
        <input
          v-model="Firstname"
          class="p-4 pr-12 border rounded-sm h-12 w-full"
          type="text"
          placeholder="First Name"
          required
        />

        <input
          v-model="lastName"
          class="p-4 mt-4 pr-12 border rounded-sm h-12 w-full"
          type="text"
          placeholder="Last Name"
          required
        />

        <!-- email/number input -->
        <input
          v-model="email"
          class="p-4 mt-4 pr-12 border rounded-sm h-12 w-full"
          type="text"
          placeholder="Email or Mobile Number"
          required
        />

        <!-- password input -->
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
            :class="passwordErrorClasses"
            placeholder="Password"
            v-else
          />

          <img
            @click="togglePassword"
            src="~/assets/imgs/Icon.png"
            alt=""
            class="absolute right-[2vw] lg:right-[1vw] bottom-3"
          />
        </div>

        <!-- password criteria -->
        <p class="text-xs pt-1.5 text-[#404555]">
          Password must be at least 8 characters
        </p>

        <!-- t&c -->
        <p class="text-xs pt-4 text-[#404555]">
          By clicking Sign Up you are indicating that you have read and
          acknowledged the
          <a href="" class="underline text-blue-500">Terms of Service</a> and
          <a href="" class="underline text-blue-500">Privacy Notice</a>
        </p>

        <!-- error message -->
        <p
          v-if="errorMessage.type == 'error'"
          class="text-sm mt-1 mb-6 text-red-600"
        >
          {{ errorMessage.message }}
        </p>
      </div>
      <!-- sign up button -->
      <button
        type="submit"
        v-on:click.stop.prevent="register"
        class="bg-[#F1C12B] font-semibold text-lg w-full h-12 rounded-sm mt-6"
      >
        Sign Up
      </button>
    </div>
  </form>
</template>
