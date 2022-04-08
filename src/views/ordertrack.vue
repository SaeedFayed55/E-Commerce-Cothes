<template>
  <div class="trackk">
    <app-track />
  </div>
</template>

<script>
// @ is an alias to /src
import tracking from '@/components/OrderDetails/orderTracking.vue'

export default {
  name: 'trackk',
  components: {
    'app-track':tracking
  }
}
</script>
