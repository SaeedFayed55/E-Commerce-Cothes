<template>
  <div class="shirts">
    <app-userorder />
  </div>
</template>

<script>
// @ is an alias to /src
import userorder from '@/components/OrderDetails/userOrder.vue'

export default {
  name: 'userorder',
  components: {
    'app-userorder':userorder
  }
}
</script>
