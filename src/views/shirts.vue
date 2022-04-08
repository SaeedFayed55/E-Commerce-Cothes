<template>
  <div class="shirts">
    <app-shirts />
  </div>
</template>

<script>
// @ is an alias to /src
import shirts from '@/components/Products/shirts.vue'

export default {
  name: 'Login',
  components: {
    'app-shirts':shirts
  }
}
</script>
