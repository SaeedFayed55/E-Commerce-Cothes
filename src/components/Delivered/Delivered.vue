<template>
  <div>
    <Toast />
    <div class="mb-1 mt-2 flex" style="width: 100%">
      <div class="flex" style="width: 60%">
        <Button
          label="Confirm All"
          icon="pi pi-check"
          class="p-button-success ml-2"
          @click="confirmDeleteSelected"
          :disabled="!selectedProducts || !selectedProducts.length"
        />
      </div>

      <div class="flex justify-content-end" style="width: 40%">
        <Button
          label="Export"
          icon="pi pi-upload"
          class="p-button-help"
          @click="exportCSV($event)"
        />
      </div>
    </div>
    <div
      class="mys"
      style="
        width: 100%;
        overflow-x: scroll;
        box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
      "
    >
      <DataTable
        style="width: 125rem"
        ref="dt"
        show-empty="saeed"
        :value="getShippedShirts"
        :selection.sync="selectedProducts"
        dataKey="id"
        :paginator="true"
        :rows="4"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[4, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #empty>
          <InlineMessage class="flex justify-content-center" severity="warn"
            >No Orders Found
          </InlineMessage>
        </template>
        <template #header>
          <div class="table-header justify-content-start">
            <h5 class="p-m-0" style="color: white">Manage Ordered Shirts</h5>
            <span class="p-input-icon-right ml-4">
              <i class="pi pi-search" />
              <InputText v-model="filters['global']" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          field="userdetails.firstname"
          header="User Name"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="userdetails.email"
          header="Email"
          headerStyle="width: 15rem"
          sortable
        ></Column>
        <Column
          field="userdetails.address"
          header="Adress"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="userdetails.zipcode"
          header="Phone"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="order.code"
          header="Code"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="order.name"
          header="Name"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img
              :src="
                require('@/assets/shirtsMen/' + slotProps.data.order.imageSrc)
              "
              :alt="slotProps.data.image"
              class="product-image"
            />
          </template>
        </Column>
        <Column
          field="order.brand"
          header="Brand"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="order.price"
          header="Price"
          headerStyle="width: 10rem"
          sortable
        >
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.order.price) }}
          </template>
        </Column>
        <Column
          field="quantity"
          header="Quantity"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column>
          <template #body="slotProps">
            <Button
              label="confirm"
              class="p-button-rounded p-button-success"
              @click="confirmDeleteProduct(slotProps.data)"
            />
            <Button
              label="cancel"
              class="ml-2 p-button-rounded p-button-danger"
              @click="confirmCancelProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      :visible.sync="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Confirm Order <b>{{ product.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteProduct"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete the selected products?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedProducts"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="cancleProductDialog"
      :style="{ width: '450px' }"
      header="Cancel Order"
      :modal="true"
    >
      <div class="confirmation-content">
        <div style="display: block">
          <div>
            <span v-if="product"
              ><i
                class="pi pi-exclamation-triangle p-mr-3 mt-1"
                style="font-size: 2rem"
              />
              choose the reason for cancle</span
            >
          </div>
          <div class="flex mt-3">
            <span>
              <RadioButton value="Failed Delivery" v-model="dfailed" />
              <label>Failed Delivery</label>
            </span>

            <span class="ml-3">
              <RadioButton value="Wrong address" v-model="dfailed" />
              <label>Wrong Address</label>
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="cancleProductDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="confirmCancel"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "StocklastAdminshirts",

  data() {
    return {
      dfailed: null,
      products: null,
      productDialog: false,
      productAddDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      cancleProductDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
      updatedShirt: {},
    };
  },

  computed: {
    ...mapGetters(["getShippedShirts", "UserOrders"]),
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

  mounted() {},

  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    hideDialog() {
      this.productDialog = false;
      this.productAddDialog = false;
      this.submitted = false;
    },

    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    confirmCancelProduct(product) {
      this.product = product;
      this.cancleProductDialog = true;
    },
    deleteProduct() {
      this.product.status = "delivered";
      this.product.deleliverDate = this.orderDate;
      this.$store.dispatch("confirmDeliveredShirt", this.product);
      this.updatedShirt = this.product;
      if (this.updatedShirt.id) {
        this.$set(
          this.UserOrders,
          this.findIndexByIdd(this.updatedShirt.id),
          this.cart,
          axios
            .put(
              `/originaluserOrder/${this.updatedShirt.id}`,
              this.updatedShirt
            )
            .then((res) => {
              this.$store.dispatch("initUserOrders");
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
      this.deleteProductDialog = false;
      this.product = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    },

    confirmCancel(){
       this.product.reason = this.dfailed;
      this.$store.dispatch("cancelOrder", this.product);
      this.cancleProductDialog = false;
       this.product = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.getShippedShirts.length; i++) {
        if (this.getShippedShirts[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    findIndexByIdd(id) {
      let index = -1;
      for (let i = 0; i < this.UserOrders.length; i++) {
        if (this.UserOrders[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
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
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      for (const prod of this.selectedProducts) {
        prod.status = "delivered";
        prod.deleliverDate = this.orderDate;
        axios.post("/delivered", prod).then((res) => {
          axios
            .post("/deliveredIDs", {
              id: prod.order.id,
              deleliverDate: prod.deleliverDate,
            })
            .then((res) => {
              axios.delete(`/shipped/${prod.id}`).then((res) => {
                console.log(res);
                this.$store.dispatch("getPendingOrder");
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Products confirmed",
                  life: 3000,
                });
              });
            });
        });
      }
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
    },
  },
};
</script>

<style scopped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}
.p-datatable .p-datatable-header {
  background: #7a747a !important;
  padding: 0.3rem !important;
}
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  .p-toolbar {
    flex-wrap: wrap;
  }
  .p-toolbar .p-button {
    margin-bottom: 0.25rem;
  }
}

.p-toast-top-right {
  z-index: 45345345 !important;
}
.p-input-icon-left {
  top: 1rem;
}

.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.7rem 1rem !important;
}

.mys::-webkit-scrollbar {
  border-radius: 1rem;
  height: 0.5rem;
}

.mys::-webkit-scrollbar-track {
  --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.mys::-webkit-scrollbar-thumb {
  background-color: #7a747a;
  outline: 1px solid #7a747a;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
