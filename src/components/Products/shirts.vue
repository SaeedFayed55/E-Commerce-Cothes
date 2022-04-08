<template>
  <div class="card">
    <Toast />
    <DataView
      :value="filteredBrands"
      :layout="layout"
      :paginator="true"
      :rows="8"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div
          class="grid nogutter"
          style="background: #0e0e0e91; padding: 0.5rem"
        >
          <div class="col-12 md:col-2 lg:col-2" style="text-align: left">
            <Dropdown
              style="width: 100%"
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-12 md:col-3 lg:col-3" style="text-align: left">
            <MultiSelect
              style="width: 100%"
              v-model="selectedBrands"
              :options="getBrands"
              optionLabel="name"
              placeholder=" Filter By Brand"
              :filter="true"
              class="multiselect-custom"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-for="option of slotProps.value"
                  :key="option.code"
                >
                  <div>{{ option.name }}</div>
                </div>
                <template
                  v-if="!slotProps.value || slotProps.value.length === 0"
                >
                  Filter By Brands
                </template>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </MultiSelect>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-12 p-md-4">
          <Card class="mycard ml-2 mt-2" style="width: 20em">
            <template #header>
                   

              <router-link
                style="text-decoration: none"
                :to="{
                  name : 'details',
                  params : {id : slotProps.data.id,
                  pname : slotProps.data.name}
                }"
              >
                <div class="flex p-2">
                  <div style="width: 40%; float: left; padding: 0.2rem">
                    <i class="pi pi-tag product-category-icon mr-1"></i>
                    <span class="product-category">{{
                      slotProps.data.category
                    }}</span>
                  </div>
                  <span style="width: 25%"></span>
                  <span
                    style="width: 35%; padding: 0.1rem"
                    :class="[
                      {
                        red:
                          slotProps.data.inventoryStatus.toLowerCase() ===
                          'outofstock',
                      },
                      {
                        green:
                          slotProps.data.inventoryStatus.toLowerCase() ===
                          'instock',
                      },
                      {
                        yellow:
                          slotProps.data.inventoryStatus.toLowerCase() ===
                          'lowstock',
                      },
                    ]"
                    >{{ slotProps.data.inventoryStatus }}</span
                  >
                </div>
                <img
                  :src="
                    require('@/assets/shirtsMen/' + slotProps.data.imageSrc)
                  "
                  style="height: 15rem"
                />
              </router-link>
            </template>
            <template #title>
              {{ slotProps.data.name }}
              <small>({{ slotProps.data.brand.toLowerCase() }})</small>
            </template>
            <template #subtitle>
              <div class="flex justify-content-center">
                <p style="width: 10%; float: left; color: red">
                  <s> {{ slotProps.data.oldprice }}$</s>
                </p>
                <p style="width: 3%"></p>

                <p style="width: 40%; float: right">
                  {{ slotProps.data.price }}$
                  <span style="color: green"
                    >(save
                    {{ slotProps.data.oldprice - slotProps.data.price }}$)</span
                  >
                </p>
              </div>
            </template>

            <template #footer>
              <Button
                class="p-button p-button-warning"
                :disabled="
                  slotProps.data.inventoryStatus.toLowerCase() == 'outofstock'
                "
                @click="sendInfo(slotProps.data)"
                style="
                  width: 98%;
                  position: relative;
                  top: -0.2rem;
                  height: 2.3rem;
                  background: #464e53;
                  color: orange;
                  border: 1px solid wheat;
                  cursor: pointer;
                "
                icon="pi pi-shopping-cart"
                iconPos="right"
                label="Add To Cart"
              />
            </template>
          </Card>
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
              <p v-if="sh" style="margin-top: 0px">
                {{ selectedCard.name }}
              </p>

              <p style="margin-top: 0px" class="ml-3">
                {{ selectedCard.price }}$
              </p>
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
                :disabled="
                  selectedCard.quantity == productnum || productnum > 4
                "
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

        <Dialog
          :visible="displayResponsivee"
          class="cdi col-12 md:col-10 lg:col-7"
          :modal="true"
        >
          <div
            class="header flex"
            style="position: fixed; top: 10px; background: #464e53"
          >
            <h5 style="position: fixed; top: 0px; left: 17px; color: white">
              Edit
            </h5>
            <i
              @click="closeResponsivee"
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
              <p v-if="sh" style="margin-top: 0px">
                {{ selectedCard.name }}
              </p>

              <p style="margin-top: 0px" class="ml-3">
                {{ selectedCard.price }}$
              </p>
              <p style="margin-top: 0px; color: orange" class="ml-3">
                (-{{ selectedCard.oldprice - selectedCard.price }}$)
              </p>
            </div>

            <div class="col-12 md:col-4 lg:col-4">
              {{ getSize }}
            </div>
            <div class="col-12 md:col-5 lg:col-5">
              <Button
                icon="pi pi-minus"
                class="p-button-danger"
                @click="getQuantity--"
                :disabled="getQuantity < 1"
              />
              <InputText
                :class="{
                  er: $v.productnum.$error && lablefirst,
                }"
                id="horizontal"
                v-model="getQuantity"
                buttonLayout="horizontal"
                class=""
                disabled
              />
              <Button
                :disabled="
                  selectedCard.quantity == getQuantity || getQuantity > 4
                "
                icon="pi pi-plus"
                class="p-button-success"
                @click="getQuantity++"
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
                  @click="closeResponsivee"
                  class="p-button-outlined button-secondary mt-1"
                />
              </div>
            </div>
          </template>
        </Dialog>
      </template>
    </DataView>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      getSizee: [],
      getQuantity: null,
      shh: false,
      displayResponsivee: false,
      sh: true,
      lablefirst: false,
      lablesecond: false,
      products: null,
      layout: "grid",
      brandds: ["s", "m"],
      sortKey: null,
      sortOrder: null,
      sortField: null,
      selectedBrands: [],
      status: "red",
      sortOptions: [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
      ],
      cardbutton: true,
      displayResponsive: false,
      selectedCard: "",
      productnum: "",
      selectedSize: "",
      sizes: [
        { name: "xl", code: "AU" },
        { name: "xxl", code: "BR" },
        { name: "xxxl", code: "CN" },
        { name: "L", code: "EG" },
      ],
      status: "ordered",
      cart: {},
      getSize: null,
    };
  },
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
      "Orders",
      "getBtn",
    ]),
    getBrands() {
      const brands = [];
      for (const brand of this.getAllShirts) {
        if (!(brand.name in brand)) {
          brands.push({ name: brand.brand.toLowerCase() });
        }
      }
      var duplicateRemover = new Set();
      var distinctArrObj = brands.filter((obj) => {
        if (duplicateRemover.has(JSON.stringify(obj))) return false;
        duplicateRemover.add(JSON.stringify(obj));
        return true;
      });
      return distinctArrObj;
    },

    selectedBrandss() {
      const Brandss = [];
      for (const brand of this.selectedBrands) {
        Brandss.push(brand.name.toLowerCase());
      }
      return Brandss;
    },
    filteredBrands() {
      if (this.selectedBrandss.length === 0) {
        return this.getAllShirts;
      }
      const Brandss = [];
      for (const brandd of this.getAllShirts) {
        if (this.selectedBrandss.includes(brandd.brand.toLowerCase())) {
          Brandss.push(brandd);
        }
      }
      return Brandss;
    },

    orderDate() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const d = new Date();
      const year = d.getFullYear();
      const monthName = monthNames[d.getMonth()];
      const day = d.getDay();
      const date = d.getDate();

      let dayName;

      if (day == 0) {
        dayName = "Sunday";
      } else if (day == 1) {
        dayName = "Monday";
      } else if (day == 2) {
        dayName = "Tuesday";
      } else if (day == 3) {
        dayName = "Wednesday";
      } else if (day == 4) {
        dayName = "Thursday";
      } else if (day == 5) {
        dayName = "Friday";
      } else {
        dayName = "Saturday";
      }
      var h = d.getHours();
      var m = d.getMinutes();
      var x = h >= 12 ? "pm" : "am";
      h = h % 12;
      h = h ? h : 12;
      m = m < 10 ? "0" + m : m;
      var mytime = h + ":" + m + " " + x;
      const formatted = `${dayName}, ${date} ${monthName} ${year}, ${mytime}`;
      return formatted;
    },
  },

 

  created() {
    console.log("shirts", this.getAllShirts);
    console.log("users", this.getCurrentUser);
  },
  mounted() {
    console.log("shirts", this.getAllShirts);
  },
  methods: {
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },

    closeResponsive() {
      this.displayResponsive = false;
      this.lablesecond = false;
      this.lablefirst = false;
      this.productnum = "";
    },

    closeResponsivee() {
      this.displayResponsivee = false;
      this.lablesecond = false;
      this.lablefirst = false;
      this.productnum = "";
    },

    sendInfo(item) {
      this.selectedCard = item;
      // this.checkOrder(item);
      this.displayResponsive = true;
    },

    checkOrder(item) {
      //let an =  this.$store.dispatch('containProduct' , item)
      for (let pr of this.Orders) {
        debugger;
        if (item.name == pr.order.name) {
          this.displayResponsive = false;
          this.displayResponsivee = true;
          this.getQuantity = pr.quantity;
          this.getSize = pr.size.name;
          break;
        } else {
          this.displayResponsive = true;
          this.displayResponsivee = false;
        }
      }
    },

    closeAddCartDialouge() {
      this.productnum = 0;
      this.selectedSize = "";
      this.displayResponsive = false;
    },
    closeAddCartDialougee() {
      this.productnum = 0;
      this.selectedSize = "";
      this.displayResponsivee = false;
    },
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
      if (this.cart.id) {
        this.$set(
          this.Orders,
          this.findIndexById(this.product.id),
          this.product,
          axios.put(`/shirts/${this.product.id}`, this.product).then((res) => {
            this.$store.dispatch("initShirts");
            console.log(res);
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Product updated",
              life: 3000,
            });
          })
        );
      } else {
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
              orderDate: this.orderDate,
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
      }
    },
  },
};
</script>

<style scoped>
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

.p-dataview >>> .p-dataview-content {
  background: unset;
}
.p-dataview >>> .p-dataview-header {
  background: unset !important;
  padding: 0.5rem 0.5rem !important;
}

.p-dataview {
  position: relative;
  top: -1.8rem;
  border: 0.1px solid #e1c2c2;
  background: antiquewhite;
  background-size: cover;
  background-repeat: no-repeat;
}

.p-dataview >>> .nogutter {
  background: #364352 !important;
}
</style>
