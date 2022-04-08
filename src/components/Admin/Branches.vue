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
        :disabled="!selectedBranches || !selectedBranches.length"
      />
    </div>
    <br /><br />
    <DataTable
      style="
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
          rgba(17, 17, 26, 0.1) 0px 8px 24px,
          rgba(17, 17, 26, 0.1) 0px 16px 56px;
      "
      ref="dt"
      :value="branches"
      :selection.sync="selectedBranches"
      dataKey="id"
      :paginator="true"
      :rows="4"
      class="mt-4"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[4, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} user types"
    >
      <template #header>
        <div class="table-header">
          <h5 class="p-m-0" style="float: left">Manage Branches</h5>
          <span class="p-input-icon-left" style="float: right">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global']"
              placeholder="Search By Name"
            />
          </span>
        </div>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="address" header="Address" sortable></Column>

      <Column>
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success ml-2 p-mr-2"
            @click="editBranch(slotProps.data)"
          />

          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger ml-2"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      :visible.sync="productEditDialog"
      :style="{ width: '450px' }"
      header="Edit Branch"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field flex">
        <label style="width: 40%" for="description">Branch Name</label>
        <inputText
          id="description"
          style="width: 60%; flot: left"
          v-model.trim="branch.name"
          required="true"
          :class="{ 'p-invalid': submitted && !branch.name }"
          autofocus
          rows="3"
          cols="20"
        />
      </div>
      <small class="p-invalid ml-6" v-if="submitted && !branch.name"
        >Branch name is required.</small
      >

      <div class="p-field mt-2 flex">
        <label for="name" style="width: 40%">Branch Address</label>
        <InputText
          style="width: 60%; float: left"
          id="name"
          class=""
          v-model.trim="branch.address"
          required="true"
          :class="{ 'p-invalid': submitted && !branch.address }"
        />
        <br />
        <br />
      </div>
      <small class="p-invalid ml-6" v-if="submitted && !branch.address"
        >Branch address is required.</small
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
          @click="saveBranch"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="productDialog"
      :style="{ width: '450px' }"
      header="Add New Branch"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field flex">
        <label style="width: 40%" for="description">Branch Name</label>
        <inputText
          id="description"
          style="width: 60%; flot: left"
          v-model.trim="branch.name"
          required="true"
          :class="{ 'p-invalid': submitted && !branch.name }"
          autofocus
          rows="3"
          cols="20"
        />
      </div>
      <small class="p-invalid ml-6" v-if="submitted && !branch.name"
        >Branch name is required.</small
      >

      <div class="p-field mt-2 flex">
        <label for="name" style="width: 40%">Branch Address</label>
        <InputText
          style="width: 60%; float: left"
          id="name"
          class=""
          v-model.trim="branch.address"
          required="true"
          :class="{ 'p-invalid': submitted && !branch.address }"
        />
        <br />
        <br />
      </div>
      <small class="p-invalid ml-6" v-if="submitted && !branch.address"
        >Branch address is required.</small
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
          @click="saveBranch"
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
        <span v-if="branch"
          >Are you sure you want to delete <b>{{ branch.name }}</b
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
          @click="deleteBranch"
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
        <span v-if="branch"
          >Are you sure you want to delete the selected branches?</span
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
          @click="deleteSelectedBranches"
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
      productEditDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      branch: {},
      selectedBranches: null,
      filters: {},
      submitted: false,
    };
  },
  computed: {
    ...mapGetters(["allBranches"]),

    branches: {
      get() {
        return this.allBranches;
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
      this.branch = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.productEditDialog = false;
      this.submitted = false;
    },
    saveBranch() {
      this.submitted = true;

      if (this.branch.name.trim() && this.branch.address.trim()) {
        if (this.branch.id) {
          this.$set(
            this.branches,
            this.findIndexById(this.branch.id),
            this.branch,
            axios
              .put(`/allBranches/${this.branch.id}`, this.branch)
              .then((res) => {
                console.log(res);
                this.$toast.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Branch updated",
                  life: 3000,
                });
              })
          );
        } else {
          this.branch.id = this.createId();
          axios
            .post("/allBranches", this.branch)
            .then((res) => {
              console.log(res);
              this.$store.dispatch("initBranches");
              this.$toast.add({
                severity: "success",
                summary: "Success",
                detail: "new branch is added",
                life: 3000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }

        this.productDialog = false;
        this.productEditDialog = false;
        this.branch = {};
      }
    },
    editBranch(branch) {
      this.branch = { ...branch };
      this.productEditDialog = true;
    },
    confirmDeleteProduct(branch) {
      console.log(this.branch);

      this.branch = branch;
      this.deleteProductDialog = true;
    },
    deleteBranch() {
      console.log(this.branch);
      this.$store.dispatch("deleteBranch", this.branch);
      this.deleteProductDialog = false;
      this.branch = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Branch is Deleted",
        life: 3000,
      });
      this.$store.dispatch("initBranches");
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.branches.length; i++) {
        if (this.branches[i].id === id) {
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
    deleteSelectedBranches() {
      //this.$store.dispatch("deleteSelectedBranches", this.selectedBranches);
      for (const branc of this.selectedBranches) {
        axios.delete(`/allBranches/${branc.id}`).then((res) => {
          console.log(res);
          this.$store.dispatch("initBranches");
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Branches Deleted",
            life: 3000,
          });
        });
      }
      this.deleteProductsDialog = false;
      this.selectedBranches = null;
    },
  },
};
</script>

<style scoped>
.p-toast-top-right {
  z-index: 45345345 !important;
}
.p-input-icon-left {
  top: 1rem;
}
</style>
