<template>
  <div  class="sloot">
    <div>
      <slot name="title"></slot>
    </div>
    <hr>
    <div>
      <slot name="content"></slot>
      </div>  
  </div>
    

</template>

<script>
export default {
  name: "StocklastServers",

  data() {
    return {};
  },
  props:{
    name : String,
    userage : Number
  },

  mounted() {
  },

  methods: {
    reset(){
      this.name = "ALsaeed Fayed"
      this.$emit("resetname" , this.name)
    }
  
  },
};
</script>

<style scoped>
h1{
  color: red;

}
h3{
  color: green;
}
.sloot{
  border: 1px solid white;
  padding:1rem;
  margin-left: 1rem;
}
</style>