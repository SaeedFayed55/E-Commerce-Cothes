<template>
  <div>
    <div class="grid" style="background: #efefef">
        <div class="col-12 md:col-4 lg:col-3">
        <Card>
          <template #header></template>
          <template #title>
            <div class="grid" style="font-size: 0.8rem">
              <div class="block col-12 md:col-12 lg:col-12">
                <p style="color: orange">Your Cost is : {{ totalPric() }}$</p>

                <p
                  v-if="totalPric() > 300"
                  style="border: 1px solid green; padding: 0.5rem"
                >
                  Your order has passed the free deliver. free delivery dosnot
                  include large size quantities
                </p>
                <div v-else>
                  <p>Delivery Service : 10$</p>
                  <p style="color: green">
                    Total order cost is : {{ totalPric() + 10 }}$
                  </p>
                </div>
                <hr />
                <div class="flex" v-for="(order, index) in Orders" :key="index">
                  <img
                    class="mt-2"
                    style="height: 2rem; width: 3rem; border-radius: 50%"
                    :src="require('@/assets/shirtsMen/' + order.order.imageSrc)"
                  />
                  <p style="width: 50%; display: flex; justify-content: left">
                    {{ order.order.name }} ({{ order.quantity }})
                  </p>
                  <p style="color: orange">
                    {{ order.order.price * order.quantity }}$
                  </p>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div class="col-12 md:col-8 lg:col-9" style="position: relative;
    top: -16px;
">
        <ul
          class="flex"
          style="
            background: white;
            list-style: none;
            box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%),
              0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
          "
        >
          <li style="width: 25%">
            <p class="num" style="padding-bottom: 1rem">
              <span :class="{ acitvee: isAdress }">1</span>
            </p>

            <p class="word">Address</p>
          </li>
          <li style="width: 25%">
            <p class="num" style="padding-bottom: 1rem">
              <span :class="{ acitvee: isDelivery }">2</span>
            </p>
            <p>Delivery</p>
          </li>
          <li v-if="getDeliverInfo.deliverystate != 'HomeDeliver' &&dstate" style="width: 25%">
            <p class="num" style="padding-bottom: 1rem">
              <span :class="{ acitvee: isPay }">3</span>
            </p>
            <p>Payment</p>
          </li>
          <li style="width: 25%; margin-right:3rem">
            <p class="num" style="padding-bottom: 1rem">
              <span :class="{ acitvee: isConfirm }">4</span>
            </p>
            <p>Confirmation</p>
          </li>
        </ul>
        <keep-alive>
          <component :is="getActiveStep"></component>
        </keep-alive>
      </div>

    
    </div>
  </div>
</template>

<script>
import personal from "./PersonalInfo.vue";
import delivery from "./Delivery.vue";
import payment from "./Payment.vue";
import confirmpay from "./ConfirmOrder.vue";
import { mapGetters } from "vuex";
export default {
  name: "StocklastSteps",

  data() {
    return {
      dstate : false,
    };
  },

  created(){
    if(this.getDeliverInfo.deliverystate != 'HomeDeliver'){
      this.dstate = true
    }
  },

  components: {
    personal,
    delivery,
    payment,
    confirmpay,
  },

  computed: {
    ...mapGetters([
      "getActiveStep",
      "Orders",
      "isAdress",
      "isDelivery",
      "isPay",
      "isConfirm",
      "getDeliverInfo"
    ]),
  },
  mounted() {
    console.log(this.getActiveStep);
  },

  methods: {
    totalPric() {
      let totatl = 0;
      for (let i = 0; i < this.Orders.length; i++) {
        totatl +=
          Number(this.Orders[i].quantity) * Number(this.Orders[i].order.price);
      }
      console.log(totatl);

      return totatl;
    },
  },
};
</script>

<style scoped>
.acitvee {
  color: white !important;
  background: #0d89ec !important;
  padding: 0.5rem;
  padding-right: 0.7rem;
  padding-left: 0.6rem;
  border-radius: 18%;
}

.stepsdemo-content {
  height: 80%;
}
.line {
  width: 9vw;
  height: 0;
  border: 1px solid #c4c4c4;
  margin: 3px;
  display: inline-block;
}

.num {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) calc(51% - 1px),
    rgba(192, 192, 192, 1) calc(50%),
    rgba(0, 0, 0, 0) calc(50% + 1px)
  );
  background-position-y: -0.5rem;
}

</style>
