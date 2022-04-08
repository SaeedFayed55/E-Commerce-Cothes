<template>
  <div class="home">
    <app-home />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Landing/Home.vue'

export default {
  name: 'Login',
  components: {
    'app-home':Home
  }
}
</script>

<style scoped>
.login {
  background-image: url("~@/assets/productImages/backlogin.jpg");
  height: 35.5rem;
  background-size: cover;
}
</style>
