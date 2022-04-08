<template>

  <div>
    <Toast />
    <div class="grid">
      <div class="col-12 md:col-8 lg:col-8">
        <Card style="margin-bottom: 2em">
          <template #title> Product Details </template>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-5 lg:col-5">
                <div class="flex">
                  <ImagePreview
                    :src="
                      require('@/assets/shirtsMen/' + currentProduct.imageSrc)
                    "
                    alt="Image Text"
                    preview
                  />
                </div>

                <div class="mylist flex mt-3" style="height: 3rem">
                  <ImagePreview
                    style="height: 3rem"
                    :src="
                      require('@/assets/shirtsMen/' + currentProduct.imageSrcc)
                    "
                    alt="Image Text"
                    preview
                  />
                  <ImagePreview
                    class="ml-2"
                    :src="
                      require('@/assets/shirtsMen/' + currentProduct.imageSrccc)
                    "
                    alt="Image Text"
                    preview
                  />
                </div>
              </div>
              <div class="col-12 md:col-7 lg:col-7" style="text-align: left">
                <p style="font-size: 1.5rem; position: relative; top: -2rem">
                  {{ currentProduct.name }} (original)
                </p>
                <p style="font-size: 1.5rem; position: relative; top: -2rem">
                  {{ currentProduct.price }} $ <br />
                  <span style="font-size: 1rem"
                    ><s>{{ currentProduct.oldprice }} $ </s></span
                  >
                  <span style="color: orange; font-size: 1rem" class="ml-4"
                    >-{{
                      currentProduct.oldprice - currentProduct.price
                    }}
                    $</span
                  >
                </p>
                <p style="font-size: 1.5rem; position: relative; top: -2rem">
                  {{ currentProduct.description }}
                </p>

                <p style="position: relative; top: -2rem">
                  deliver for free when you are above 350$
                </p>
                <Button
                  class="p-button p-button-warning"
                  :disabled="
                    currentProduct.inventoryStatus.toLowerCase() == 'outofstock'
                  "
                  @click="sendInfo(currentProduct)"
                  style="
                    width: 60%;
                    position: relative;
                    top: -0.2rem;
                    height: 2.3rem;
                    background: #464e53;
                    color: orange;
                    border: 1px solid wheat;
                  "
                  icon="pi pi-shopping-cart"
                  iconPos="right"
                  label="Add To Cart"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <Dialog
      :visible="displayResponsive"
      class="cdi col-12 md:col-10 lg:col-7"
      :modal="true"
    >
      <div
        class="header flex"
        style="position: fixed; top: 10px; background: #464e53"
      >
        <h5 style="position: fixed; top: 0px; left: 17px; color: white">
          select your needs
        </h5>
        <i
          @click="closeResponsive"
          style="
            color: white;
            border: 1px solid orange;
            padding: 0.3rem;
            border-radius: 50%;
            position: fixed;
            right: 17px;
            top: 16px;
            cursor: pointer;
          "
          class="pi pi-times"
        ></i>
      </div>
      <div class="grid">
        <div class="col-12 md:col-3 lg:col-3 flex justify-content: left">
          <p style="margin-top: 0px">
            {{ selectedCard.name }}
          </p>
          <p style="margin-top: 0px" class="ml-3">{{ selectedCard.price }}$</p>
          <p style="margin-top: 0px; color: orange" class="ml-3">
            (-{{ selectedCard.oldprice - selectedCard.price }}$)
          </p>
        </div>

        <div class="col-12 md:col-4 lg:col-4">
          <Dropdown
            :class="{
              er: $v.selectedSize.$error && lablefirst,
            }"
            style="width: 90%"
            v-model="selectedSize"
            :options="sizes"
            optionLabel="name"
            :filter="true"
            placeholder="Select your size"
            :showClear="true"
          >
            <template #value="slotProps">
              <div
                class="country-item country-item-value"
                v-if="slotProps.value"
              >
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
          <p
            style="color: red"
            class="p-text-secondary"
            v-if="!$v.selectedSize.required && lablefirst"
          >
            Size is required
          </p>
        </div>
        <div class="col-12 md:col-5 lg:col-5">
          <Button
            icon="pi pi-minus"
            class="p-button-danger"
            @click="productnum--"
            :disabled="productnum <= 1"
          />
          <InputText
            :class="{
              er: $v.productnum.$error && lablefirst,
            }"
            id="horizontal"
            v-model="productnum"
            placeholder="quantity"
            buttonLayout="horizontal"
            class=""
            disabled
          />
          <Button
            :disabled="selectedCard.quantity == productnum || productnum > 4"
            icon="pi pi-plus"
            class="p-button-success"
            @click="productnum++"
          />
          <p
            style="color: red"
            class="p-text-secondary"
            v-if="!$v.productnum.required && lablesecond"
          >
            quantity is required
          </p>
        </div>
      </div>
      <template #footer>
        <div class="grid flex justify-content-end">
          <div class="col-12 md:col-3 lg:col-3">
            <Button
              class="p-button p-button-warning mt-1"
              style="width: 100%"
              label="Add To Cart"
              @click.prevent="addToCart"
            />
          </div>

          <div class="col-12 md:col-3 lg:col-3">
            <Button
              style="width: 100%"
              label="Back "
              @click="closeResponsive"
              class="p-button-outlined button-secondary mt-1"
            />
          </div>
        </div>
      </template>
    </Dialog> 
  

  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "StocklastOrderdetails",

  data() {
    return {
      id: this.$route.params.id,
      currentProduct: {},
      sshirts : [],
      cart: {},
      selectedCard: "",
      lablefirst: false,
      lablesecond: false,
      status: "ordered",
      productnum: "",
      selectedSize: "",
      sizes: [
        { name: "xl", code: "AU" },
        { name: "xxl", code: "BR" },
        { name: "xxxl", code: "CN" },
        { name: "L", code: "EG" },
      ],
      displayResponsive: false,
    };
  },
  // beforeRouteEnter(to , from , next){
  //   if(this.findIndexById()){
  //     next()
  //   }
  //   else{
  //     next(false)
  //   }
  // },

// watch :{
//   '$route'(to , from){
//     this.id = to.params.id
//   }

  validations: {
    selectedSize: {
      required,
    },
    productnum: {
      required,
    },
  },

  computed: {
    ...mapGetters([
      "getAllShirts",
      "getUsers",
      "getCurrentUser",
      "getItemclicked",
    ]),
  },

  created() {
  //  this.findIndexById();
    axios.get('/shirts')
    .then((response) => {
      this.sshirts = response.data;
      this.findIndexById()
    })
    .catch((err) => console.log('error', err))
  },

  

  mounted() {},

  methods: {
    createId() {
      let id = "";
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },

    addToCart(cart) {
      this.cart = cart;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.lablefirst = true;
        this.lablesecond = true;
      } else {
        axios
          .post("/orders", {
            id: this.createId(),
            order: this.selectedCard,
            quantity: this.productnum,
            size: this.selectedSize,
            status: this.status,
            userdetails: this.getCurrentUser,
          })
          .then((res) => {
            console.log(res.status);
            this.$store.dispatch("initOrders");
            this.closeAddCartDialouge();
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Product Added to your Cart",
              life: 3000,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    sendInfo(item) {
      this.selectedCard = item;
      this.displayResponsive = true;
    },
    closeResponsive() {
      this.displayResponsive = false;
      this.lablesecond = false;
      this.lablefirst = false;
      this.productnum = "";
    },
    closeAddCartDialouge() {
      this.productnum = 0;
      this.selectedSize = "";
      this.displayResponsive = false;
    },

    findIndexById() {
      for (let i = 0; i <= this.sshirts.length; i++) {
        if (this.sshirts[i].id == this.id) {
          this.currentProduct = this.sshirts[i];
          break;
        } else {
          continue;
        }
      }

      console.log("current shirt", this.currentProduct);
    },
  },
};
</script>
<style scoped>
.p-card >>> .p-card-title {
  display: flex;
}
.p-image >>> img {
  border-radius: 0.5rem;
  border: 0.2px solid chocolate;
  border-width: thin;
}
.mylist .p-image >>> img {
  height: 3rem;
  width: 3.5rem;
  border: 1px solid orange;
  border-radius: 0.5rem;
}

.p-dialog-mask.p-component-overlay >>> .p-dialog-header-icon:last-child {
  display: none !important;
}
.p-dialog-mask.p-component-overlay >>> .cdi {
  box-shadow: unset !important;
}
.p-dialog-mask.p-component-overlay >>> .p-dialog-content {
  overflow-y: unset !important;
}
.p-component-overlay {
  --maskbg: rgba(0, 1, 0.2, 0.1) !important;
}

.cdi >>> .p-dialog-header {
  background: #464e53 !important;
  opacity: 0.2;
}
.cdi >>> .p-dialog-content {
  padding: 1rem !important;
  background: #e8e8e8;
}
.cdi >>> .p-dialog-footer {
  background: #e8e8e8;
}

.er {
  border: 1px solid red;
}
.p-card >>> .p-card-content {
  padding: unset !important;
}
.p-card >>> .p-card-body {
  padding: 0.02rem !important;
}
.p-card >>> .p-card-title {
  margin-bottom: unset !important;
}
.p-card >>> .p-card-subtitle {
  margin-bottom: unset !important;
}
.red {
  background: #ffcdd2;
  color: #c63737;
}
.green {
  background: #c8e6c9;
  color: #256029;
}

.yellow {
  background: #feedaf;
  color: #8a5340;
}
.mycard {
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.p-multiselect-label:not(.p-placeholder) {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}
.p-card .p-card-content {
  padding: 0rem 0rem !important;
}
.p-card .p-card-body {
  padding: unset !important;
}
.p-card .p-card-subtitle {
  margin-bottom: unset !important;
}
.p-card .p-card-title {
  margin-bottom: unset !important;
}
</style>
