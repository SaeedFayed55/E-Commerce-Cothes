<template>
  <div
    :class="{ hasOpenLoading }"
    class="stepsdemo-content flex justify-content-center"
  >
    <Card style="width: 100%">
      <template v-slot:content>
        <div class="grid mt-1">
          <label for="class" class="col-3 flex">Email </label>
          <b class="col-8 flex justify-content-center">{{
            getConfirmPay.email
          }}</b>
        </div>
        <div class="grid mt-1">
          <label for="class" class="col-3 flex">Address </label>
          <b class="col-8 flex justify-content-center">{{
            getConfirmPay.adress
          }}</b>
        </div>
        <div class="grid mt-1">
          <label for="class" class="col-3 flex">Phone </label>
          <b class="col-8 flex justify-content-center">{{
            getConfirmPay.phone
          }}</b>
        </div>
        <div class="grid mt-1">
          <label for="class" class="col-3 flex">Block Number </label>
          <b class="col-8 flex justify-content-center">{{
            getConfirmPay.block
          }}</b>
        </div>
        <div class="grid mt-1">
          <label for="class" class="col-3 flex">Apartment </label>
          <b class="col-8 flex justify-content-center">{{
            getConfirmPay.apatment
          }}</b>
        </div>
      </template>
      <template v-slot:footer>
        <div class="p-grid p-nogutter p-justify-between">
          <Button
            style="float: left"
            label="Back"
            @click="prevPage()"
            icon="pi pi-angle-left"
          />
          <Button
            style="float: right"
            label="Complete"
            @click="complete()"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
          />
        </div>
      </template>
    </Card>
    <Dialog
      :visible="showSuccessDialoug"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="top"
    >
      <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>your order has placed successfully!</h5>
      </div>
      <template #footer>
        <div class="p-d-flex p-jc-center">
          <Button label="OK" @click="closeD()" class="p-button-text" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("confirmPayInfo");
  },
  data() {
    return {
      purchase: {},
      submittedOrder: {},
      hasOpenLoading: false,
      showSuccessDialoug: false,
      DeleteOrders: null,
    };
  },
  computed: {
    ...mapGetters([
      "getConfirmPay",
      "Orders",
      "getDeliverInfo",
      "getOrderex",
      "getSumbmitedUserData",
      "getSubmit",
    ]),
  },
  methods: {
    prevPage() {
      if (this.getDeliverInfo.deliverystate == "HomeDeliver") {
        this.$store.dispatch("deliveryData");
        console.log("ex", this.getOrderex);
        console.log("submited", this.getSubmit);
      } else {
        this.$store.dispatch("paymentData");
      }
    },
    complete() {
      console.log("data", this.getConfirmPay);
      this.purchase = this.getConfirmPay;
      this.submittedOrder = this.Orders;
  
         axios
        .post("/purchase", this.purchase)
        .then((res) => {
          for (let i of this.Orders) {
            axios.post("/pending", i).then(res => {
              axios.post('originaluserOrder' , i)
            })
            
          }
          this.handleClickLoading("circles");
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
     
      
    },

    handleClickLoading(type) {
      const loading = this.$vs.loading({
        type,
        color: "#FF7300",
      });
      this.hasOpenLoading = true;
      setTimeout(() => {
        loading.close();
        this.hasOpenLoading = false;
        this.showSuccessDialoug = true;
      }, 3000);
    },
    openLoading(type, ref) {
      this.$vs.loading({
        target: this.$refs[ref][0],
        text: type,
        type,
        color: "#FF7300",
      });
    },
    closeD() {
      this.showSuccessDialoug = false;
      this.getConfirmPay = {};
      //this.$store.dispatch('clearCart')
      this.clearCart();
      this.$router.push("/shirts");
      window.location.reload();
    },

    clearCart() {
      this.DeleteOrders = this.Orders;
      for (const prod of this.DeleteOrders) {
        axios.delete(`/orders/${prod.id}`).then((res) => {
          console.log(res);
        });
      }
    },
  },
};
</script>
