<template>
  <div class="steps">
    <app-steps />
  </div>
</template>

<script>
// @ is an alias to /src
import Steps from '@/components/PaymentSteps/Steps.vue'

export default {
  name: 'Steps',
  components: {
    'app-steps':Steps
  }
}
</script>
<style scoped>
.steps{
  height: 87vh !important;
  background: #EFEFEF;
}
</style>