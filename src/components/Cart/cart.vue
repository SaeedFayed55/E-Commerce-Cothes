<template>
  <div class="out">
    <div class="inner">
      <Toast />

      <div class="grid">
        <div v-if="!Orders.length" class="col-12">
          <img style=" width: 70%;
    height: 30rem;
   
    position: relative;
   " :src="require('@/assets/productImages/empty.jpg')" alt=""><br>
   
  <router-link style="text-decoration:none" to="/home">
  
  <button class="p-button p-button-info mt-3">Shop Now</button></router-link> 
        </div>
        <div class="lg:col-8 md:col-8 col-12">
          <Card
            class="mb-2"
            v-for="(order, index) in Orders"
            :key="index"
            style="width: 100%"
          >
            <template #title>
              <div class="grid">
                <div class="col-12 md:col-8 lg:col-8">
                  <div class="grid">
                    <div class="col-3 md:col-2 lg:col-2">
                      <img
                        style="height: 4rem; width: 5rem"
                        :src="
                          require('@/assets/shirtsMen/' + order.order.imageSrc)
                        "
                      />
                    </div>
                    <div class="col-9 md:col-6 lg:col-6">
                      <p>{{ order.order.name }} ( {{ order.order.brand }} )</p>
                    </div>

                    <div
                      class="flex justify-content-start col-6 md:col-2 lg:col-2"
                    >
                      <p>size({{ order.size.name }})</p>
                    </div>

                    <div
                      class="flex justify-content-start col-6 md:col-2 lg:col-2"
                    >
                      <p>{{ order.order.price }}$</p>
                    </div>

                    <div
                      class="flex justify-content-start col-6 md:col-2 lg:col-2"
                    >
                      <p>Quantity</p>
                    </div>
                    <div
                      class="flex justify-content-start col-6 md:col-2 lg:col-2"
                    >
                      <p>
                        <select
                          @change="onChange($event, order)"
                          v-model="order.quantity"
                          style="padding: 0.5rem"
                        >
                          <option
                            v-for="(quantity, index) in quantities"
                            :key="index"
                          >
                            {{ quantity }}
                          </option>
                        </select>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 lg:col-4 md:col-4">
                  <div
                    class="
                      flex
                      justify-content-center
                      col-12
                      md:col-12
                      lg:col-12
                    "
                  >
                    <p>
                      <Button
                        style="position: relative; top: -1rem"
                        label="Delete Item"
                        @click="deleteCart(order)"
                        class="p-button-danger"
                        icon="pi pi-trash"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div v-if="Orders.length" class="lg:col-4 md:col-4 col-12">
          <Card  class="mb-2">
            <template #header> </template>
            <template #title>
              <div class="grid">
                <div class="block col-12 md:col-12 lg:col-12">
                  <p style="color: orange">
                    Your order cost is : {{ totalPrice }}$
                  </p>
                  <p
                    v-if="totalPrice > 300"
                    style="border: 1px solid green; padding: 0.5rem"
                  >
                    Your order has passed the free deliver. free delivery dosnot
                    include large size quantities
                  </p>
                  <div v-else>
                    <p>Delivery Service : 10$</p>
                    <p style="color: green">
                      Total order cost is : {{ totalPrice + 10 }}$
                    </p>
                  </div>
                 <router-link to='/payment'>
                 <Button
                    @click="totalPrice"
                    class="p-button-warning mt-2"
                    icon="pi pi-dollar"
                    label="Go To Purchase"
                  />
                  </router-link>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "StocklastCart",

  data() {
    return {
      quantities: [1, 2, 3, 4, 5],
      orderr: {},
      cart: {},
    };
  },

  computed: {
    ...mapGetters(["Orders"]),

    totalOrders() {
      let order = 0;
      for (let orr of this.Orders) {
        order += orr.quantity;
      }
      return order;
    },

    totalPrice() {
      let sum = 0;
      for (let price of this.Orders) {
        sum += Number(price.quantity * price.order.price);
      }
      return sum;
    },
  },

  mounted() {
    console.log(this.Orders);
  },

  methods: {
    onChange(event, order) {
      this.cart = order;
      if (this.cart.id) {
        this.$set(
          this.Orders,
          this.findIndexById(this.cart.id),
          this.cart,
          axios.put(`/orders/${this.cart.id}`, this.cart).then((res) => {
            this.$store.dispatch("initOrders");
            console.log(res);
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Product updated",
              life: 3000,
            });
          })
        );
      }
      console.log("value,", event.target.value);
    },

    deleteCart(cart) {
      this.cart = cart;
      this.$store.dispatch("deleteCart", this.cart);
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Item is Removed from your Cart",
        life: 3000,
      });
    },

    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.Orders.length; i++) {
        if (this.Orders[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
  },
};
</script>

<style scoped>
.p-card >>> .p-card-title {
  font-size: unset !important;
  margin-bottom: unset !important;
}
.p-card >>> .p-card-content {
  padding: unset !important;
}
.p-card {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
}
.p-toast-top-right {
  z-index: 45345345 !important;
}

.out {
  background: #FEEDCC !important;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  z-index: -1;
  background: #c7cbba;
  margin-top: -2%;
}
.inner {
  padding: 1rem;
  z-index: 287787;
  opacity: 0.8;
  filter: alpha(opacity=50);
}

@media screen and (max-width: 1336px) {
  .out {
    margin-top: -2.1% !important;
  }
}

@media screen and (max-width: 1247px) {
  .out {
    margin-top: -2.2% !important;
  }
}

@media screen and (max-width: 1150px) {
  .out {
    margin-top: -2.4% !important;
  }
}
@media screen and (max-width: 1104px) {
  .out {
    margin-top: -2.6% !important;
  }
}

@media screen and (max-width: 1009px) {
  .out {
    margin-top: -2.9% !important;
  }
}

@media screen and (max-width: 907px) {
  .out {
    margin-top: -3.1% !important;
  }
}
@media screen and (max-width: 850px) {
  .out {
    margin-top: -3.4% !important;
  }
}
@media screen and (max-width: 760px) {
  .out {
    margin-top: -3.8% !important;
  }
}

@media screen and (max-width: 662px) {
  .out {
    margin-top: -4.3% !important;
  }
}

@media screen and (max-width: 631px) {
  .out {
    margin-top: -5.7% !important;
  }
}
@media screen and (max-width: 580px) {
  .out {
    margin-top: -7% !important;
  }
}
@media screen and (max-width: 375px) {
  .out {
    margin-top: -9% !important;
  }
}
@media screen and (max-width: 360px) {
  .out {
    margin-top: -10% !important;
  }
}

@media screen and (max-width: 280px) {
  .out {
    margin-top: -12% !important;
  }
}

.p-toast-top-right {
  z-index: 566 !important;
  top: 3.4rem;
}
</style>
