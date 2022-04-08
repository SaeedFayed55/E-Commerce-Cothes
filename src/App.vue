<template>
  <div id="app">
    <app-sidebar
      v-if="$route.name !== 'Register' && $route.name !== 'Login'"
    ></app-sidebar>
    <router-view />
  </div>
</template>

<script>
import appSide from "./components/Shared/SideBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "StocklastApp",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["Orders"]),
  },
  created() {
    this.$store.dispatch("initCoountries");
    this.$store.dispatch("initProducts");
    // this.$store.dispatch('initdtuserTypes')
    this.$store.dispatch("initjsonUserTypes");
    this.$store.dispatch("initBranches");
    this.$store.dispatch("initUsers");
    this.$store.dispatch("initShirts");
    this.$store.dispatch("initPants");
    this.$store.dispatch("initUsers");
    this.$store.dispatch("initOrders");
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getOrderInfo");
    this.$store.dispatch("getSumbmitedOrder");
    this.$store.dispatch("getClickedItem");
    this.$store.dispatch("getPendingOrder");
    this.$store.dispatch("initUserOrders");
    this.$store.dispatch("getConfirmedOrders");
    this.$store.dispatch("getShippedOrders");
    this.$store.dispatch("getDeliveredOrders");
    this.$store.dispatch("getConfirmedShirtss");
    this.$store.dispatch("getdeliveredShirtss");
    this.$store.dispatch("getShippedShirtss");
    this.$store.dispatch('getCancelledOrders')


    
  },

  components: {
    "app-sidebar": appSide,
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.login {
  background-image: url("~@/assets/productImages/backlogin.jpg");
  height: 40rem;
  background-size: cover;
}
</style>
