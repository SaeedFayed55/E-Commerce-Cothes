<template>
  <div class="stepsdemo-content flex justify-content-center">
    <Card style="width: 100%">
      <template v-slot:content>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-6 flex justify-content-center">
            <div class="p-fluid" style="width: 100%">
              <div
                :class="{
                  er: $v.Name.$error && lablename,
                }"
                class="p-field mt-2"
              >
                <label class="flex" for="firstname">Name</label>
                <InputText class="inn" v-model="Name" />
              </div>
              <small
                style="color: red"
                class="p-text-secondary"
                v-if="!$v.Name.required && lablename"
              >
                Name is required
              </small>
              <div
                class="p-field mt-2"
                :class="{
                  er: $v.phone.$error && lablephone,
                }"
              >
                <label class="flex" for="lastname">Phone Number</label>
                <InputText class="inn" type="number" v-model="phone" />
              </div>
              <small
                style="color: red"
                class="p-text-secondary"
                v-if="!$v.phone.required && lablephone"
              >
                phone is required
              </small>
              <div
                class="p-field mt-2"
                :class="{
                  er: $v.email.$error && lableemail,
                }"
              >
                <label class="flex" for="age">Email</label>
                <InputText class="inn" v-model="email" />
              </div>
              <small
                style="color: red"
                class="p-text-secondary"
                v-if="!$v.email.required && lableemail"
              >
                email is required
              </small>
              <small
                style="color: red"
                class="p-text-secondary"
                v-if="!$v.email.email && lableemail"
              >
                Not valid email
              </small>
            </div>
          </div>

          <div class="col-12 md:col-6 lg:col-6">
            <div class="p-fluid" style="width: 100%">
              <div class="p-field mt-2">
                <label class="flex" for="firstname">Address</label>
                <InputText class="inn" v-model="address" />
              </div>
              <div class="p-field mt-2">
                <label class="flex" for="lastname">block Number</label>
                <InputText type="number" v-model="blocknumber" />
              </div>
              <div class="p-field mt-2">
                <label class="flex" for="age">Apartment number</label>
                <InputText type="number" v-model="apartmentnumber" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div
          class="p-grid p-nogutter flex justify-content-end p-justify-between"
        >
          <i></i>
          <Button
            label="Next"
            @click.prevent="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      Name: "",
      phone: "",
      email: "",
      apartmentnumber: "",
      blocknumber: "",
      address: "",
      lablename: false,
      lablephone: false,
      lableemail: false,
      lableaddress: false,
      submitted: false,
      validationErrors: {},
      addressData: [
        {
          Name:  this.Name,
          phone: this.phone,
          email: this.email,
          apatment: this.apartmentnumber,
          block: this.blocknumber,
          adress: this.address,
        },
      ],
    };
  },
  computed :{
    ...mapGetters(["getAd"]),
  },
  validations: {
    Name: {
      required,
    },
    phone: {
      required,
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    nextPage() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.lablename = true;
        this.lablephone = true;
        this.lableemail = true;
        this.lableaddress = true;
      } else {
        this.$store.dispatch("deliveryData");
        this.$store.dispatch("saveAddressInfo", {
          Name:  this.Name,
          phone: this.phone,
          email: this.email,
          apatment: this.apartmentnumber,
          block: this.blocknumber,
          adress: this.address,
        });      
      }
      console.log(this.getAd)
    },
  },
};
</script>

<style scoped>
.er .inn {
  border: 1px solid red;
}
.er label {
  color: red;
}
</style>
