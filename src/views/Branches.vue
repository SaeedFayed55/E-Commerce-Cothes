<template>
  <div class="branches">
    <app-branches />
  </div>
</template>

<script>
// @ is an alias to /src
import branches  from '@/components/Admin/Branches.vue'

export default {
  name: 'Adminusertype',
  components: {
    'app-branches':branches
  }
}
</script>
