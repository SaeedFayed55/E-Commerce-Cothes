<template>
  <div class="deliver">
    <app-deliverd />
  </div>
</template>

<script>
// @ is an alias to /src
import deliverd from '@/components/Delivered/Delivered.vue'

export default {
  name: 'deliverd',
  components: {
    'app-deliverd':deliverd
  }
}
</script>
