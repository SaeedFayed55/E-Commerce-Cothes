<template>
  <div class="stepsdemo-content flex justify-content-center">
    <Card style="width: 100%">
      <template v-slot:content>
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12">
            <label class="flex" for="class">Card Name (*optional)</label>
            <InputText type="text" v-model="cardholderName" />
          </div>

          <div class="grid">
            <div class="p-field col-12 md:col-4 lg:col-4 mt-3">
              <label class="flex" id="number" for="lastname">Number</label>
              <InputMask
                id="number"
                mask="9999-9999-9999-9999"
                v-model="cardholderNumber"
              />
            </div>
            <div class="p-field col-12 md:col-4 lg:col-4 mt-3">
              <label class="flex" id="date" for="date">Date</label>
              <InputMask id="date" mask="99/99" v-model="date" />
            </div>
            <div class="p-field col-12 md:col-4 lg:col-4 mt-3">
              <label class="flex" for="cvv">CVV</label>
              <InputMask id="cvv" mask="999" v-model="cvv" />
            </div>
          </div>
          <div class="p-field-checkbox p-col-12 mt-2 flex">
            <Checkbox id="remember" v-model="remember" :binary="true" />
            <label
              style="text-align: left; font-size: 0.9rem"
              for="remember"
              class="p-checkbox-label ml-1"
              >Save credit card information
            </label>
          </div>
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
export default {
  data() {
    return {
      cardholderName: "",
      cardholderNumber: "",
      date: "",
      cvv: "",
      remember: false,
    };
  },
  methods: {
    nextPage() {
      this.$store.dispatch("confirmpay");
      this.$store.dispatch("savePaymentInfo", {
        cardholderName: this.cardholderName,
        cardholderNumber: this.cardholderNumber,
        date: this.date,
        cvv: this.cvv,
      });
    },
    prevPage() {
      this.$store.dispatch("deliveryData");
    },
  },
};
</script>
