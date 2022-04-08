<template>
  <div class="cart">
    <app-cart />
  </div>
</template>

<script>
// @ is an alias to /src
import cartt from "@/components/Cart/cart.vue";

export default {
  name: "Adminusertype",
  components: {
    "app-cart": cartt,
  },
};
</script>

<style scoped>
 
</style>
