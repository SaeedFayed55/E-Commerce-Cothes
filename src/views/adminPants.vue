<template>
  <div class="adminpants">
    <app-adminPants />
  </div>
</template>

<script>
// @ is an alias to /src
import adminPants from '@/components/Admin/adminpants.vue'

export default {
  name: 'Login',
  components: {
    'app-adminPants':adminPants
  }
}
</script>
