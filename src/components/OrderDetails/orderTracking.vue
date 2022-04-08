<template>
  <div>
    <div class="card">
      <h5>Track your order</h5>
      <Timeline :value="events1" align="alternate" class="customized-timeline">
        <template #marker="slotProps">
          <span
            class="custom-marker p-shadow-2"
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <i :class="slotProps.item.icon"></i>
          </span>
        </template>
        <template #content="slotProps">
          <Card>
            <template #title>
              {{ slotProps.item.status }}
            </template>
            <template #subtitle>
              {{ slotProps.item.date }}
            </template>
            <template #content>
              <img
                v-if="slotProps.item.image"
                :src="require('@/assets/shirtsMen/' + order.imageSrc)"
                :alt="slotProps.item.name"
                width="200"
                class="p-shadow-2"
              />
            </template>
          </Card>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StocklastOrdertracking",

  data() {
    return {
      events1: [
        {
          status: "Ordered",
          date: "15/10/2020 10:30",
          icon: "pi pi-check",
          color: "green",
          image: "game-controller.jpg",
        },
        {
          status: "Waiting for confirming your order",
          date: "",
          icon: "pi pi-spin pi-cog",
          color: "var(--orange-500)",
        },
        {
          status: "shipped",
          date: "",
          icon: "pi pi-spin pi-circle-fill",
          color: "grey",
        },
        {
          status: "delivered",
          date: "",
          icon: "pi pi-circle-fill",
          color: "grey",
        },
      ],
      order: {},
      orderdate :'',
    };
  },

  computed: {
    ...mapGetters(["getConfirmed", "getShipped", "getDelivered","getAllShirts","UserOrders"]),
  },
  beforeCreate() {},
  created() {
    this.events1[0].status = "Ordered";
    this.events1[0].date = this.orderdate;
    console.log("all shirts"  , this.getAllShirts)
   
    this.findMatchedShirt()
    
   
  },

  mounted() {},

  methods: {

     getOrderDate(){
      debugger
      let id =  this.$route.params.id
      for (const shirt of this.UserOrders) {
        if (shirt.order.id === id) {
         this.orderdate = shirt.orderDate
         break
         
        } else {
          continue;
        }
      }

     
    },

    findMatchedShirt(){
      debugger
      let id =  this.$route.params.id
      for (const shirt of this.getAllShirts) {
        if (shirt.id === id) {
         this.order = shirt
         this.confirmedOrder()
        
         console.log(this.order)
         
        } else {
          continue;
        }
      }

     
    },
    confirmedOrder() {
      let id =  this.$route.params.id
      for (let i = 0; i <= this.getConfirmed.length; i++) {
        if (this.getConfirmed[i].id === id) {
          this.events1[1].status = "confirmed";
          this.events1[1].icon = "pi pi-check";
          this.events1[1].color = "green";
          this.events1[1].date = this.getConfirmed[i].confirmDate;
           this.events1[2].status = "Processing Shipping";
          this.events1[2].icon = "pi pi-spin pi-cog";
          this.events1[2].color = "var(--orange-500)";
          this.ShippedOrder()
        } else {
         
          continue;
        }
      }
    },

    ShippedOrder() {
      debugger;
      let idd = this.$route.params.id
      for (let i = 0; i <= this.getShipped.length; i++) {
        if (this.getShipped[i].id === idd) {
          this.events1[2].status = "shipped";
          this.events1[2].icon = "pi pi-check";
          this.events1[2].color = "green";

           this.events1[3].status = "Processing Delivery";
          this.events1[3].icon = "pi pi-spin pi-cog";
          this.events1[3].color = "var(--orange-500)";
          this.events1[2].date = this.getShipped[i].shippedDate;
          this.deliveredOrders()
        } else {
          

         
          continue;
        }
      }
    },

    deliveredOrders() {
      let id = this.$route.params.id
      for (let i = 0; i <= this.getDelivered.length; i++) {
        if (this.getDelivered[i].id === id) {
          this.events1[3].status = "Delivered";
          this.events1[3].icon = "pi pi-check";
          this.events1[3].color = "green";
          this.events1[3].date = this.getDelivered[i].deleliverDate;
           this.getOrderDate()
        } else {
          this.events1[3].status = "processing Delivery";
          this.events1[3].icon = "pi pi-spin pi-cog";
          this.events1[3].color = "var(--orange-500)";
          continue;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-timeline-event-content) ::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>
