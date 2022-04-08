<template>
  <div>
    <Toast />
    <div class="mb-1 mt-2 flex" style="width: 100%">
      <div class="flex" style="width: 60%">
        <Button
          label="New"
          icon="pi pi-plus"
          class="p-button-success p-mr-2"
          @click="openNew"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger ml-2"
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
        :value="getAllPants"
        :selection.sync="selectedProducts"
        dataKey="id"
        :paginator="true"
        :rows="4"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[4, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div class="table-header justify-content-start">
            <h5 class="p-m-0" style="color: white">Manage Shirts</h5>
            <span class="p-input-icon-right ml-4">
              <i class="pi pi-search" />
              <InputText v-model="filters['global']" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          field="code"
          header="Code"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="name"
          header="Name"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img
              :src="require('@/assets/pantsMen/' + slotProps.data.imageSrc)"
              :alt="slotProps.data.image"
              class="product-image"
            />
          </template>
        </Column>
        <Column
          field="brand"
          header="Brand"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="description"
          header="Description"
          headerStyle="width: 15rem"
          sortable
        ></Column>

        <Column
          field="price"
          header="Price"
          headerStyle="width: 10rem"
          sortable
        >
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
        <Column
          field="oldprice"
          header="Old Price"
          headerStyle="width: 10rem"
          sortable
        >
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.oldprice) }}
          </template>
        </Column>
        <Column
          field="quantity"
          header="Quantity"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="category"
          header="Category"
          headerStyle="width: 10rem"
          sortable
        ></Column>
        <Column
          field="rating"
          header="Reviews"
          headerStyle="width: 10rem"
          sortable
        >
          <template #body="slotProps">
            <Rating
              :value="slotProps.data.rating"
              :readonly="true"
              :cancel="false"
            />
          </template>
        </Column>
        <Column
          field="inventoryStatus"
          header="Status"
          headerStyle="width: 10rem"
          sortable
        >
          <template #body="slotProps">
            <span
              :class="
                'product-badge status-' +
                slotProps.data.inventoryStatus.toLowerCase()
              "
              >{{ slotProps.data.inventoryStatus }}</span
            >
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      :visible.sync="productAddDialog"
      :style="{ maxHeight: '76%' }"
      header="Add new product"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <div class="flex">
          <label for="code" style="width: 30%">Code</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.code"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !product.code }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.code"
          >Code is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Name</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.name"
            required="true"
            :class="{ 'p-invalid': submitted && !product.name }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.name"
          >Name is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Image Name</label>
          <InputText
            placeholder="Examlpe : image.jpg"
            style="width: 70%"
            v-model.trim="product.imageSrc"
            required="true"
            :class="{ 'p-invalid': submitted && !product.imageSrc }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.imageSrc"
          >Image with its extention are required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="brand" style="width: 30%">Brand</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.brand"
            required="true"
            :class="{ 'p-invalid': submitted && !product.brand }"
          />
        </div>
        <small class="p-invalid" v-if="submitted && !product.brand"
          >Brand is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Price</label>
          <InputText
            style="width: 70%"
            type="number"
            v-model="product.price"
            :class="{ 'p-invalid': submitted && !product.price }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.price"
          >Price is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Old Price</label>
          <InputText
            style="width: 70%"
            type="number"
            v-model="product.oldprice"
            :class="{ 'p-invalid': submitted && !product.oldprice }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.oldprice"
          >Old Price is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Quantity</label>
          <InputText
            style="width: 70%"
            v-model="product.quantity"
            type="number"
            :class="{ 'p-invalid': submitted && !product.quantity }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.quantity"
          >Quantity is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="status" style="width: 30%">Status</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.inventoryStatus"
            required="true"
            :class="{ 'p-invalid': submitted && !product.inventoryStatus }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.inventoryStatus"
          >Inventory Status is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Description</label>
          <Textarea
            style="width: 70%"
            id="description"
            v-model="product.description"
            required="true"
            rows="3"
            cols="20"
            :class="{ 'p-invalid': submitted && !product.description }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.description"
          >Description is required.</small
        >
      </div>

      <div class="field">
        <label class="mt-2 mb-3" style="float: left">Category</label>
        <div class="p-formgrid grid">
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category1"
              name="category"
              value="Accessories"
              v-model="product.category"
            />
            <label for="category1">Accessories</label>
          </div>
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category2"
              name="category"
              value="Clothing"
              v-model="product.category"
            />
            <label for="category2">Clothing</label>
          </div>
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category3"
              name="category"
              value="Electronics"
              v-model="product.category"
            />
            <label for="category3">Electronics</label>
          </div>
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category4"
              name="category"
              value="Fitness"
              v-model="product.category"
            />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="productDialog"
      :style="{ maxHeight: '76%' }"
      header="Edit Product"
      :modal="true"
      class="p-fluid"
    >
      <img
        :src="require('@/assets/pantsMen/' + product.imageSrc)"
        :alt="product.image"
        class="product-image"
        v-if="product.imageSrc"
      />

      <div class="field">
        <div class="flex">
          <label for="code" style="width: 30%">Code</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.code"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !product.code }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.code"
          >Code is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Name</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.name"
            required="true"
            :class="{ 'p-invalid': submitted && !product.name }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.name"
          >Name is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="price" style="width: 30%">Price</label>
          <InputText
            type="number"
            style="width: 70%"
            v-model="product.price"
            :class="{ 'p-invalid': submitted && !product.price }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.price"
          >Price is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="oldprice" style="width: 30%">Old Price</label>
          <InputText
            type="number"
            style="width: 70%"
            v-model="product.oldprice"
            :class="{ 'p-invalid': submitted && !product.oldprice }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.oldprice"
          >Old Price is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Quantity</label>
          <InputText
            style="width: 70%"
            v-model="product.quantity"
            type="number"
            :class="{ 'p-invalid': submitted && !product.quantity }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.quantity"
          >Quantity is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Status</label>
          <InputText
            style="width: 70%"
            v-model.trim="product.inventoryStatus"
            required="true"
            :class="{ 'p-invalid': submitted && !product.inventoryStatus }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.inventoryStatus"
          >Inventory Status is required.</small
        >
      </div>

      <div class="field">
        <div class="flex">
          <label for="name" style="width: 30%">Description</label>
          <Textarea
            style="width: 70%"
            id="description"
            v-model="product.description"
            required="true"
            rows="3"
            cols="20"
            :class="{ 'p-invalid': submitted && !product.description }"
          />
        </div>

        <small class="p-invalid" v-if="submitted && !product.description"
          >Description is required.</small
        >
      </div>

      <div class="field">
        <label class="mt-2 mb-3" style="float: left">Category</label>
        <div class="p-formgrid grid">
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category1"
              name="category"
              value="Accessories"
              v-model="product.category"
            />
            <label for="category1">Accessories</label>
          </div>
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category2"
              name="category"
              value="Clothing"
              v-model="product.category"
            />
            <label for="category2">Clothing</label>
          </div>
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category3"
              name="category"
              value="Electronics"
              v-model="product.category"
            />
            <label for="category3">Electronics</label>
          </div>
          <div class="p-field-radiobutton col-6">
            <RadioButton
              id="category4"
              name="category"
              value="Fitness"
              v-model="product.category"
            />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete <b>{{ product.name }}</b
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
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "StocklastAdminshirts",

  data() {
    return {
      products: null,
      productDialog: false,
      productAddDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
    };
  },

  computed: {
    ...mapGetters(["getAllPants"]),
  },

  mounted() {},

  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productAddDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.productAddDialog = false;
      this.submitted = false;
    },
    saveProduct() {
      this.submitted = true;

      if (
        this.product.name.trim() &&
        this.product.code.trim() &&
        this.product.brand.trim() &&
        this.product.imageSrc.trim() &&
        this.product.price.trim() &&
        this.product.oldprice.trim() &&
        this.product.quantity.trim() &&
        this.product.inventoryStatus.trim() &&
        this.product.description.trim()
      ) {
        if (this.product.id) {
          this.$set(
            this.getAllPants,
            this.findIndexById(this.product.id),
            this.product,
            axios
              .put(`/pantsmen/${this.product.id}`, this.product)
              .then((res) => {
                this.$store.dispatch("initPants");
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
          this.product.id = this.createId();
          axios.post("/pantsmen", this.product).then((res) => {
            this.$store.dispatch("initPants");
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Product Created",
              life: 3000,
            });
          });
        }

        this.productDialog = false;
        this.productAddDialog = false;
        this.product = {};
      }
    },
    editProduct(product) {
      this.product = { ...product };
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.$store.dispatch("deletePant", this.product);
      this.$store.dispatch("initPants");
      this.deleteProductDialog = false;
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
      for (let i = 0; i < this.getAllPants.length; i++) {
        if (this.getAllPants[i].id === id) {
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
        axios.delete(`/pantsmen/${prod.id}`).then((res) => {
          console.log(res);
          this.$store.dispatch("initPants");
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Products Deleted",
            life: 3000,
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
