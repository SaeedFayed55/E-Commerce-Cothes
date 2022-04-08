<template>
  <div class="anotherlogin">
    <app-another />
  </div>
</template>

<script>
// @ is an alias to /src
import another from "@/components/Login/anotherLogin.vue";

export default {
  name: "Adminusertype",
  components: {
    "app-another": another,
  },
};
</script>

<style scoped>
.anotherlogin {
  background-image: url("~@/assets/productImages/backlogin.jpg");
  height: 35.5rem;
  background-size: cover;
}
</style>
