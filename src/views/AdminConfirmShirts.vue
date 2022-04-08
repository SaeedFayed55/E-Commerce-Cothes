<template>
  <div class="confirmshirts">
    <app-confirmShirts />
  </div>
</template>

<script>
// @ is an alias to /src
import adminconfirmshirts from '@/components/Admin/adminConfirmShirtsOrder.vue'

export default {
  name: 'Login',
  components: {
    'app-confirmShirts': adminconfirmshirts
  }
}
</script>
