<template>
  <div class="register">
    <app-register />
  </div>
</template>
<script>
// @ is an alias to /src
import Register from "@/components/Login/Register.vue";
export default {
  name: "Register",
  components: {
    "app-register": Register,
  },
};
</script>
<style scoped>
.register {
  background-image: url("~@/assets/productImages/backlogin.jpg");
  height: 40rem;
  background-size: cover;
}
</style>
