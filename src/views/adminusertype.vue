<template>
  <div class="adminusertype">
    <app-adminUserType />
  </div>
</template>

<script>
// @ is an alias to /src
import adminUserType  from '@/components/Admin/adminusertype.vue'

export default {
  name: 'Adminusertype',
  components: {
    'app-adminUserType':adminUserType
  }
}
</script>
