<template>
  <div style="border: 1px solid grey; background: orange">
    <h4>The Manager Component</h4>
    <hr />
    <div class="grid">
      <div class="col-6 md:col-6 lg:col-6">
        <servers>
          <h1 slot="title">Quotes</h1>

          <h3 slot="content">This is a wonderfull quote</h3>
        </servers>
      </div>

      <div class="col-6 md:col-6 lg:col-6">
        <Button @click="selectedcomp= 'comp1'" label="comp1" class="p-button-primary ml-1" />
        <Button @click="selectedcomp= 'comp2'" label="comp2" class="p-button-success ml-1" />
        <Button @click="selectedcomp= 'comp3'" label="comp3" class="p-button-danger ml-1" />

        <div class="mt-3" style="color:white; padding:1rem ; border:1px solid white">
          <component :is="selectedcomp"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import servers from "./servers.vue";
import details from "./serverDetails.vue";
import comp1 from "./dcomp1.vue";
import comp2 from "./dcomp2.vue";
import comp3 from "./dcomp3.vue";

export default {
  name: "StocklastManager",

  data() {
    return {
      name: "saeed",
      age: 27,
      selectedcomp: "comp1",
    };
  },

  mounted() {},

  methods: {
    changename() {
      this.name = "ALsaeed";
    },
  },

  components: {
    servers: servers,
    appUserEdit: details,
    comp1,
    comp2,
    comp3,
  },
};
</script>
