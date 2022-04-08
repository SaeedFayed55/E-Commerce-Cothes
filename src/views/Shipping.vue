<template>
  <div class="shipping">
    <app-shipping />
  </div>
</template>

<script>
// @ is an alias to /src
import ship from '@/components/shipping/shipping.vue'

export default {
  name: 'Login',
  components: {
    'app-shipping':ship
  }
}
</script>
