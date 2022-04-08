<template>
  <div class="orderdetils">
    <app-orderDetails />
  </div>
</template>

<script>
// @ is an alias to /src
import orderdetails from '@/components/OrderDetails/orderDetails.vue'

export default {
  name: 'Login',
  components: {
    'app-orderDetails':orderdetails
  }
}
</script>
