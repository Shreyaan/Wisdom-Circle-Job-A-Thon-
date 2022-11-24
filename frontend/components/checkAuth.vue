<script setup>
import axios from "axios";

const props = defineProps({
  tokens: Object,
});

let response = ref("");

function checkAuth() {
  let tokens = JSON.parse(props.tokens.value);
  const config = {
    headers: { Authorization: `Bearer ${tokens.accessToken}` },
  };

  const bodyParameters = {};

  axios
    .get("https://wisdom-circle-job-a-thon-production.up.railway.app/api/checkauth", config, bodyParameters)
    .then((res) => {
      response.value = (res);
    })
    .catch((err) => {
      response.value = { Authorization: `Bearer ${tokens.accessToken}` };
    });
}
</script>

<template>
  <div>
    <div class="">
      <div><button @click="checkAuth">check</button></div>
      {{response}}
    </div>
  </div>
</template>
