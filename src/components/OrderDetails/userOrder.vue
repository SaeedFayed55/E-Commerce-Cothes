<template>
  <div>
    <TabView ref="tabview1">
      <TabPanel header="Current Orders">
        <div v-for="(order, index) in UserOrders" :key="index" class="flex">
          <div class="col-2 md:col-2 lg:col-2">
            <img
              style="height: 6rem"
              :src="require('@/assets/shirtsMen/' + order.order.imageSrc)"
              alt=""
            />
          </div>
          <div class="col-8 md:col-8 lg:col-8">
            <p style="text-align: left">{{ order.order.name }}</p>
            <p style="text-align: left">{{ order.size.name }}</p>
            <p
              style="
                text-align: center;
                background: #48a548;
                width: 5rem;
                border: 1px solid white;
                border-radius: 0.5rem;
                color: white;
                padding: 0.1rem;
                padding-bottom: 0.3rem;
              "
            >
              {{ order.status }}
            </p>
          </div>

          <div class="col-2 md:col-2 lg:col-2">
            <router-link
              style="text-decoration: none"
              :to="{
                name: 'trackorder',
                params: {
                  productName: order.order.name,
                  id: order.order.id,
                },
              }"
            >
              <Button
                class="p-button-help p-button-outlined p-button-rounded"
                label="Track your order"
                icon="pi pi-chart-line"
                iconPos="right"
              />
            </router-link>
          </div>
        </div>
      </TabPanel>

      <TabPanel header="Closed Orders">
       <div v-for="(order, index) in getAllCancelledOrders" :key="index" class="flex">
          <div class="col-2 md:col-2 lg:col-2">
            <img
              style="height: 6rem"
              :src="require('@/assets/shirtsMen/' + order.order.imageSrc)"
              alt=""
            />
          </div>
          <div class="col-8 md:col-8 lg:col-8">
            <p style="text-align: left">{{ order.order.name }}</p>
            <p style="text-align: left">{{ order.size.name }}</p>
            <p
              style="
                text-align: center;
                background: red;
                width: 10rem;
                border: 1px solid white;
                border-radius: 0.5rem;
                color: white;
                padding: 0.1rem;
                padding-bottom: 0.3rem;
              "
            >
              {{ order.reason }}
            </p>
          </div>

         
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StocklastUserorder",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["UserOrders","getAllCancelledOrders"]),
  },

  mounted() {},

  methods: {},
};
</script>
