<template>
  <div class="login">
    <app-login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login/Login.vue'

export default {
  name: 'Login',
  components: {
    'app-login':Login
  }
}
</script>
<style scoped>
.login {
  background-image: url("~@/assets/productImages/backlogin.jpg");
  height: 35.5rem;
  background-size: cover;
}