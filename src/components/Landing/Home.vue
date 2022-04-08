<template>
  <div>
    <div class="card scalein fadeinup animation-duration-1000">
      <Carousel
        :value="products"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel"
        :circular="true"
        :autoplayInterval="2000"
      >
        <template #header>
          <h5>Circular, AutoPlay, 3 Items per Page and Scroll by 1</h5>
        </template>
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="p-mb-3">
                <img
                  :src="
                    require('@/assets/productImages/' + slotProps.data.imageSrc)
                  "
                  :alt="slotProps.data.name"
                  class="product-image"
                />
              </div>
              <div>
               <div class="flex justify-content-center">
                  <h4 class="p-mb-1">{{ slotProps.data.name }}</h4>
                <h6 style="color : red" class="p-mb-1 ml-4">-{{ slotProps.data.oldprice -  slotProps.data.price}}$</h6>
               </div>
                <div class="flex justify-content-center">
                  <h4 class="p-mt-0 p-mb-3"><s>${{ slotProps.data.oldprice }}</s></h4>
                  <h4 class="p-mt-0 ml-2 p-mb-3">${{ slotProps.data.price }}</h4>
                </div>

                <span
                  :class="
                    'product-badge status-' +
                    slotProps.data.inventoryStatus.toLowerCase()
                  "
                  >{{ slotProps.data.inventoryStatus }}</span
                >
                <div class="car-buttons p-mt-5">
                  <Button
                    icon="pi pi-eye"
                    class="p-button p-button-rounded p-mr-2"
                  />
                  <Button
                    icon="pi pi-shopping-cart"
                    class="p-button-success p-button-rounded p-mr-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>

    <br />
    <div>
      <div class="fadeinleft animation-duration-20000">
        <Card class="bf" style="width: 100%; margin-bottom: 2em">
          <template #title style="width: 100%"> Black Friday </template>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-6">
                <img
                  style="width: 100%"
                  src="@/assets/productImages/blackFriday1.jpg"
                  alt=""
                />
              </div>
              <div class="col-12 md:col-6 lg:col-6">
                <img
                  style="width: 100%"
                  src="@/assets/productImages/blackFriday2.jpg"
                  alt=""
                />
              </div>
              <br />
              <div class="col-12 md:col-6 lg:col-6">
                <img
                  style="width: 100%"
                  src="@/assets/productImages/blackFriday3.jpg"
                  alt=""
                />
              </div>
              <div class="col-12 md:col-6 lg:col-6">
                <img
                  style="width: 100%"
                  src="@/assets/productImages/blackFriday4.jpg"
                  alt=""
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StockprojectLanding",

  data() {
    return {
      lik: "",
      // myimg : this.getAllProducts[0].imageSrc,
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getAllProducts"]),

    products() {
      return this.getAllProducts.slice(0, 9);
    },
  },

  mounted() {},
  created() {
    console.log(this.getAllProducts);
    console.log(typeof this.getAllProducts);
  },

  methods: {},
};
</script>

<style scoped>
.product-item .product-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}

.product-image {
  width: 70%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.bf {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
@media only screen and (max-width: 480px) {
  img {
    width: 100%;
  }
}
</style>
