<template>
  <div class="card">
    <DataView
      :value="filteredBrands"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div
          class="grid nogutter"
          style="background: #0e0e0e91; padding: 0.5rem"
        >
          <div class="col-12 md:col-2 lg:col-2 ml-2" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-12 md:col-3 lg:col-3 ml-2" style="text-align: left">
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
              <div class="flex p-2">
                <div style="width: 40%; float: left">
                  <i class="pi pi-tag product-category-icon"></i>
                  <span class="product-category">{{
                    slotProps.data.category
                  }}</span>
                </div>
                <span style="width: 25%"></span>
                <span
                  style="width: 35%"
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
                :src="require('@/assets/pantsMen/' + slotProps.data.imageSrc)"
                style="height: 15rem"
              />
            </template>
            <template #title>
              {{ slotProps.data.name }}
              <small>({{ slotProps.data.brand.toLowerCase() }})</small>
            </template>
            <template #subtitle>
              {{ slotProps.data.description }}
            </template>
            <template #content> </template>
            <template #footer>
              <div class="flex">
                <p style="width: 10%; float: left; color: red">
                  <s> {{ slotProps.data.oldprice }}$</s>
                </p>
                <p style="width: 3%"></p>

                <p style="width: 47%; float: right">
                  {{ slotProps.data.price }}$
                  <span style="color: green"
                    >(save
                    {{ slotProps.data.oldprice - slotProps.data.price }}$)</span
                  >
                </p>
                <p style="width: 25%"></p>

                <Button :disabled="slotProps.data.inventoryStatus.toLowerCase() == 'outofstock'"
                  style="width: 15%; height: 2.3rem"
                  icon="pi pi-shopping-cart"
                />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
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
    };
  },

  computed: {
    ...mapGetters(["getAllPants"]),
    getBrands() {
      const brands = [];
      for (const brand of this.getAllPants) {
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
        return this.getAllPants;
      }
      const Brandss = [];
      for (const brandd of this.getAllPants) {
        if (this.selectedBrandss.includes(brandd.brand.toLowerCase())) {
          Brandss.push(brandd);
        }
      }
      return Brandss;
    },
  },

  created() {
    console.log("shirts", this.getAllPants);
  },
  mounted() {
    console.log("shirts", this.getAllPants);
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
  },
};
</script>

<style scoped>
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
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
  border: 1px solid grey;
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
</style>
