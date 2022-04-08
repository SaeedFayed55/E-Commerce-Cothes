<template>
  <div class="menpants">
    <app-menpants />
  </div>
</template>

<script>
// @ is an alias to /src
import menPants from '@/components/Products/MenPants.vue'

export default {
  name: 'Login',
  components: {
    'app-menpants':menPants
  }
}
</script>
