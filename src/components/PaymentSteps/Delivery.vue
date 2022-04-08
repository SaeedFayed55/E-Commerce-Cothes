<template>
  <div class="stepsdemo-content flex justify-content-center">
    <Card style="width: 100%">
      <template v-slot:content>
        <div class="grid">
          <div class="col-12 md:col-12 lg:col-12">
            <div class="p-field-radiobutton flex">
              <RadioButton
                class=""
                value="centerdelivery"
                v-model="deliverystate"
              />
              <label class="ml-2" style="text-align: justify"
                >Center Place Delivery <br />
                <small
                  >Will be available from sunday 20/1/2022 with the least
                  cost</small
                ></label
              >
              <small></small>
            </div>
            <div class="p-field-radiobutton flex mt-4">
              <RadioButton
                class=""
                value="HomeDeliver"
                v-model="deliverystate"
              />
              <label class="ml-2" style="text-align: justify">
                Home Delivery <br />
                <small>
                  Please assign the exact address in theprevios page <br />
                  Will be available from sunday 20/1/2022 with the least
                  cost</small
                ></label
              >
              <small></small>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="p-grid">
          <i></i>
          <Button
            style="float: left"
            label="Back"
            @click="prevPage()"
            icon="pi pi-angle-left"
            iconPos="left"
          />
          <Button
            style="float: right"
            class="ml"
            label="Next"
            @click="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      deliverystate: "",
      submitted: false,
    };
  },
  computed : {
    ...mapGetters(["getDeliverInfo"])
  },
  methods: {
    nextPage() {
      this.$store.dispatch("saveDeliverInfo" , {deliverystate:this.deliverystate});
      console.log(this.getDeliverInfo);
      if(this.getDeliverInfo.deliverystate == "HomeDeliver"){
        this.$store.dispatch('confirmpay')
      }
      else{
             this.$store.dispatch("paymentData");

      }

      
    },
    prevPage() {
      this.$store.dispatch("personalInfo");
    },
  },
};
</script>
