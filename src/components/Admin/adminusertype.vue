<template>
  <div>
    <Toast
      style="z-index: 84753987534985734985734"
      :breakpoints="{
        '920px': { width: '100%', right: '0', left: '0', top: 10 },
      }"
    ></Toast>

    <div class="p-mb-4 ml-2 mt-2" style="float: left">
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
    <br /><br />
    <DataTable
    style="box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;"
      ref="dt"
      :value="jsonUsers"
      :selection.sync="selectedProducts"
      dataKey="id"
      :paginator="true"
      :rows="10"
      class="mt-4"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} user types"
    >
      <template #header>
        <div class="table-header">
          <h5 class="p-m-0" style="float: left">Manage Users</h5>
          <span class="p-input-icon-left" style="float: right">
            <i class="pi pi-search" />
            <InputText v-model="filters['global']" placeholder="Search By Name" />
          </span>
        </div>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="code" header="Code" sortable></Column>
      <Column field="name" header="Name" sortable></Column>

      <Column>
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      :visible.sync="productDialog"
      :style="{ width: '450px' }"
      header="Add user type"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field flex">
        <label style="width: 40%" for="description">user type code</label>
        <inputText
          id="description"
          style="width: 60%; flot: left"
          v-model.trim="userType.code"
          required="true"
          :class="{ 'p-invalid': submitted && !userType.code }"
          autofocus
          rows="3"
          cols="20"
        />
      </div>
      <small class="p-invalid ml-6" v-if="submitted && !userType.code"
        >Code is required.</small
      >

      <div class="p-field mt-2 flex">
        <label for="name" style="width: 40%">user type</label>
        <InputText
          style="width: 60%; float: left"
          id="name"
          class=""
          v-model.trim="userType.name"
          required="true"
          :class="{ 'p-invalid': submitted && !userType.name }"
        />
        <br />
        <br />
      </div>
      <small class="p-invalid ml-6" v-if="submitted && !userType.name"
        >Name is required.</small
      >
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
          @click="saveUserType"
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
        <span v-if="userType"
          >Are you sure you want to delete <b>{{ userType.name }}</b
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
        <span v-if="userType"
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
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "StocklastAdminusertype",

  data() {
    return {
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      userType: {},
      selectedProducts: null,
      usertypes: [],
      filters: {},
      submitted: false,
    };
  },
  computed: {
    ...mapGetters(["getJsonTypes"]),

    userTypes: {
      get() {
        return this.getdtProducts;
      },
      set(newuserTypes) {
        return newuserTypes;
      },
    },

    jsonUsers: {
      get() {
        return this.getJsonTypes;
      },
      set(newuserTypes) {
        return newuserTypes;
      },
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
    openNew() {
      this.userType = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    saveUserType() {
      this.submitted = true;

      if (this.userType.name.trim() && this.userType.code.trim()) {
        if (this.userType.id) {
          this.$set(
            this.products,
            this.findIndexById(this.userType.id),
            this.userType
          );
        } else {
          this.userType.id = this.createId();
          axios
            .post("/usertypes", this.userType)
            .then((res) => {
              console.log(res);
              this.$store.dispatch("initjsonUserTypes");
              this.$toast.add({
                severity: "success",
                summary: "Success",
                detail: "User Type is added",
                life: 3000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }

        this.productDialog = false;
        this.userType = {};
      }
    },
    editProduct(userType) {
      this.userType = { ...userType };
      this.productDialog = true;
    },
    confirmDeleteProduct(userType) {
      console.log(this.userType);

      this.userType = userType;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      console.log(this.userType);
      this.$store.dispatch("deleteUserType", this.userType);
      console.log("deleted");
      console.log("product now", this.userType);
      console.log("user types now", this.userTypes);
      this.deleteProductDialog = false;
      this.userType = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "User Type Deleted",
        life: 3000,
      });
      this.$store.dispatch("initjsonUserTypes");
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
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
      //this.$store.dispatch("deleteSelectedUserType", this.selectedProducts);
      for (const usertype of this.selectedProducts){
        axios.delete(`/usertypes/${usertype.id}`).then(res=>{
          console.log(res)
          this.$store.dispatch('initjsonUserTypes')
           this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "user types deleted",
        life: 3000,
      });
        })
      }
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
     
    },
  },
};
</script>

<style scoped>
.p-toast-top-right {
  z-index: 45345345 !important;
}
.p-input-icon-left{
  top:1rem
}
</style>
