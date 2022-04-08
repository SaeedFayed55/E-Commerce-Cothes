<template>
  <div
    style="
      border: 1pxsolid grey;
      background: #af3535;
      color: white;
      padding: 1rem;
    "
  >
    <p>Here we care about the user age</p>
    <p>user age : {{userage}} </p>
     <Button label="Edit Age" class="p-button p-button-warning" @click="editage" icon="pi pi-user" />
  </div>
</template>

<script>
export default {
  name: "StocklastServerdetails",

  data() {
    return {
      
    };
  },

  mounted() {},
  props : {
    userage : Number
  },

  methods: {
    editage(){
      this.userage = 30 ; 
    }
  },
};
</script>
