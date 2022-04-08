<template>
  <div class="adminshirts">
    <app-adminshirts />
  </div>
</template>

<script>
// @ is an alias to /src
import adminshirts  from '@/components/Admin/adminShirts.vue'

export default {
  name: 'Adminusertype',
  components: {
    'app-adminshirts':adminshirts
  }
}
</script>
