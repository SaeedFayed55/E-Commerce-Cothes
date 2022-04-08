<template>
  <div class="">
    <div style="z-index: 1" class="header flex fixed top-0 w-full">
      <div class="" style="width: 6%">
        <vs-button
          style="color: white"
          @click="activeSidebar = !activeSidebar"
          flat
          icon
        >
          <i class="bx bx-menu"></i>
        </vs-button>
      </div>

      <p class="country" style="color: white; width: 10%">
        <i class="pi pi-map-marker"></i> Egypt
      </p>

      <span style="width: 39%" class="ml-1 p-input-icon-right mt-1 search">
        <i class="pi pi-search" />
        <InputText
          placeholder="search..."
          style="width: 100%; height: 90%"
          type="text"
        />
      </span>

      <div
        class="cartitems mt-2"
        style="width: 20%; display: flex; justify-content: end"
      >
        <router-link to="/cart" style="text-decoration: none">
          <i
            style="color: orange; font-size: 1.7rem"
            class="pi pi-shopping-cart"
          ></i>
          <Badge
            v-if="Orderss"
            style="font-size: "
            :value="Orderss"
            severity="warning"
            class="p-mr-2"
          ></Badge>
        </router-link>
      </div>

      <div class="flex ml-1 justify-content-end" style="width: 22%">
        <div class="flex usn">
          <p class="username mr-1" style="color: white">saeed fayed</p>

          <vs-avatar
            class="mr-2 myav"
            style="margin-top: 0.3rem; height: 2.4rem"
          >
            <img
              @click="userSpecs = true"
              style="cursor: pointer; height: 2.7rem"
              src="@/assets/productImages/saeed.jpg"
              alt=""
            />
          </vs-avatar>

          <i
            @click="notify = true"
            style="
              font-size: 1.4rem;
              position: relative;
              left: 0.4rem;
              cursor: pointer;
            "
            class="text-white mt-3 ml-2 pi pi-bell"
          ></i>
          <Badge
            v-if="getPendingOrderG.length"
            class=""
            :value="getPendingOrderG.length"
            severity="danger"
          ></Badge>
        </div>
      </div>
    </div>

    <vs-sidebar fixed v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <!-- ...img logo -->
        <div style="border-bottom: 1px solid white; width: 100%">
          <img src="~@/assets/productImages/addid.png" alt="" />
          <p style="color: white">SAEED STOCK SYSTEM</p>
        </div>
      </template>

      <vs-sidebar-item
        @click="activeSidebar = !activeSidebar"
        to="/home"
        id="home"
      >
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="market">
        <template #icon>
          <i class="bx bx-grid-alt"></i>
        </template>
        Market Overview
      </vs-sidebar-item>
      <!-- <vs-sidebar-item id="Music">
        <template #icon>
          <i class="bx bxs-music"></i>
        </template>
        Music
      </vs-sidebar-item> -->
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-user-plus"></i>
            </template>
            Men
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item to="/menpants" id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          <a @click="activeSidebar = !activeSidebar"> Pants </a>
        </vs-sidebar-item>
        <a @click="activeSidebar = !activeSidebar">
          <vs-sidebar-item to="/shirts" id="shirts">
            <template #icon>
              <i class=""></i>
            </template>
            Shirts
          </vs-sidebar-item></a
        >

        <a @click="activeSidebar = !activeSidebar">
          <vs-sidebar-item id="jackets">
            <template #icon>
              <i class=""></i>
            </template>
            Jackets
          </vs-sidebar-item></a
        >
        <vs-sidebar-item id="shose">
          <template #icon>
            <i class=""></i>
          </template>
          Shose
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-user-minus"></i>
            </template>
            Women
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Pants
        </vs-sidebar-item>
        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Shirts
        </vs-sidebar-item>
        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Jackets
        </vs-sidebar-item>
        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Shose
        </vs-sidebar-item>
      </vs-sidebar-group>

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-user-plus"></i>
            </template>
            Kids care products
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Pants
        </vs-sidebar-item>
        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Shirts
        </vs-sidebar-item>
        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Jackets
        </vs-sidebar-item>
        <vs-sidebar-item id="pants">
          <template #icon>
            <i class=""></i>
          </template>
          Shose
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-user-plus"></i>
            </template>
            Administration
          </vs-sidebar-item>
        </template>

        <a @click="activeSidebar = !activeSidebar">
          <vs-sidebar-item to="/usertypes" id="adminusertype">
            <template #icon>
              <i class=""></i>
            </template>
            user types
          </vs-sidebar-item></a
        >
        <a @click="activeSidebar = !activeSidebar">
          <vs-sidebar-item to="/branches" id="branches">
            <template #icon>
              <i class=""></i>
            </template>
            branches
          </vs-sidebar-item></a
        >
        <a @click="activeSidebar = !activeSidebar">
          <vs-sidebar-item to="/adminshirts" id="adminshirts">
            <template #icon>
              <i class=""></i>
            </template>
            Admin Shirts
          </vs-sidebar-item></a
        >

        <a @click="activeSidebar = !activeSidebar">
          <vs-sidebar-item to="/adminpants" id="">
            <template #icon>
              <i class=""></i>
            </template>
            Admin Pants
          </vs-sidebar-item></a
        >
      </vs-sidebar-group>

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-code-alt"></i>
            </template>
            Coding
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="github">
          <template #icon>
            <i class="bx bxl-github"></i>
          </template>
          Github
        </vs-sidebar-item>
        <vs-sidebar-item id="codepen">
          <template #icon>
            <i class="bx bxl-codepen"></i>
          </template>
          Codepen
        </vs-sidebar-item>
      </vs-sidebar-group>

      <template #footer>
        <div class="w-full">
          <div class="flex">
            <vs-button
              style="width: 16%; cursor: none; height: 2rem; width: 2rem"
              upload
              icon
              color="warn"
              flat
            >
              <i class="bx bxs-envelope"></i>
            </vs-button>
            <p
              style="
                font-size: 0.8rem;
                width: 84%;
                color: orange;
                display: flex;
                justify-content: flex-start;
              "
            >
              alsaeedfayed@gmail.com
            </p>
          </div>

          <div class="flex">
            <vs-button
              style="width: 16%; cursor: none; height: 2rem; width: 2rem"
              upload
              icon
              color="warn"
              flat
            >
              <i class="bx bxs-phone-call"></i>
            </vs-button>

            <p
              style="
                width: 50%;
                color: orange;
                display: flex;
                justify-content: flex-start;
                font-size: 0.8rem;
              "
            >
              01159043228
            </p>
          </div>
        </div>
      </template>
    </vs-sidebar>
    <br /><br /><br /><br />

    <Card
      v-click-outside="onClickOutside"
      class="sa"
      v-if="userSpecs"
      style="
        z-index: 1;
        position: fixed;
        right: 3rem;
        width: 18rem;
        top: 3rem;
        margin-bottom: 2em;
        background: #f9fafc;
        background: rgb(38 38 38);

        opacity: 0.9;
      "
    >
      <template #title>
        <div class="flex" style="height: 2rem">
          <p style="width: 19%">
            <img
              src="@/assets/productImages/saeed.jpg"
              style="
                position: relative;
                top: -1rem;
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
                border: 0.5px solid #2cb731;
                padding: 2px;
                position: relative;
                top: -1.5rem;
              "
            />
          </p>
          <div
            class="block ml-2"
            style="display: block; width: 80%; color: white"
          >
            <p
              style="
                font-size: 1rem;
                width: 100%;
                position: relative;
                top: -1rem;
                text-align: left;
              "
            >
              saeed fayed
            </p>
            <p
              style="
                font-size: 0.7rem;
                position: relative;
                top: -2rem;
                text-align: left;
              "
            >
              Cairo-dept
            </p>
          </div>
          <i
            style="cursor: pointer; color: white"
            class="mt-1 pi pi-sign-out"
          ></i>
        </div>
      </template>
      <template #content>
        <div class="flex">
          <p
            @mouseover="color = 'orange'"
            @mouseleave="color = 'white'"
            :style="{ color: color }"
            class="flex"
            style="font-size: 1.1rem; cursor: pointer; width: 100%"
          >
            <span style="width: 95%; text-align: left">
              <i class="pi pi-cog mt-1"></i>
              <span class="ml-2">profile settings</span>
            </span>
            <i style="float: right" class="pi pi-angle-right"></i>
          </p>
        </div>

        <router-link style="text-decoration:none" to="/orders">
        <div @click="onClickOutside" class="flex">
          <p
            @mouseover="colorr = 'orange'"
            @mouseleave="colorr = 'white'"
            :style="{ color: colorr }"
            class="flex"
            style="font-size: 1.1rem; cursor: pointer; width: 100%"
          >
            <span style="width: 95%; text-align: left">
              <i class="pi pi-shopping-cart mt-1"></i>
              <span class="ml-2">orders</span>
             
            </span>
             <span v-if="UserOrders.length > 0" class="mr-4">
                <Badge
                  :value="UserOrders.length"
                  severity="danger"
                ></Badge>
              </span>
            <i style="float: right ; margin-top:.4rem" class=" pi pi-angle-right"></i>
          </p>
        </div>
        </router-link>

        <router-link style="text-decoration:none" to="/confirmshipping">
        <div @click="onClickOutside" class="flex">
          <p
            @mouseover="colorrrrr = 'orange'"
            @mouseleave="colorrrrr = 'white'"
            :style="{ color: colorrrrr }"
            class="flex"
            style="font-size: 1.1rem; cursor: pointer; width: 100%"
          >
            <span style="width: 95%; text-align: left">
              <i class="pi pi-shopping-cart mt-1"></i>
              <span class="ml-2">Confirm Shipped </span>
             
            </span>
             <span v-if="getConfirmedShirts.length > 0" class="mr-4">
                <Badge
                  :value="getConfirmedShirts.length"
                  severity="danger"
                ></Badge>
              </span>
            <i style="float: right ; margin-top:.4rem" class=" pi pi-angle-right"></i>
          </p>
        </div>
        </router-link>

        <router-link style="text-decoration:none" to="/confirmdelivery">
        <div @click="onClickOutside" class="flex">
          <p
            @mouseover="colorrrr = 'orange'"
            @mouseleave="colorrrr = 'white'"
            :style="{ color: colorrrr }"
            class="flex"
            style="font-size: 1.1rem; cursor: pointer; width: 100%"
          >
            <span style="width: 95%; text-align: left">
              <i class="pi pi-shopping-cart mt-1"></i>
              <span class="ml-2">Confirm Delivered</span>
             
            </span>
             <span v-if="getShippedShirts.length > 0" class="mr-4">
                <Badge
                  :value="getShippedShirts.length"
                  severity="danger"
                ></Badge>
              </span>
            <i style="float: right ; margin-top:.4rem" class=" pi pi-angle-right"></i>
          </p>
        </div>
        </router-link>
        <div class="flex">
          <p
            @mouseover="colorrr = 'orange'"
            @mouseleave="colorrr = 'white'"
            :style="{ color: colorrr }"
            class="flex"
            style="font-size: 1.1rem; cursor: pointer; width: 100%"
          >
            <span style="width: 95%; text-align: left">
              <i class="pi pi-heart mt-1"></i>
              <span class="ml-2">saved orders</span>
            </span>
            <i style="float: right" class="pi pi-angle-right"></i>
          </p>
        </div>
      </template>
    </Card>

    <div
      v-click-outside="onClickOutsidee"
      class="sa"
      v-if="notify"
      style="
        z-index: 1;
        position: fixed;
        right: 4.3rem;
        width: 23rem;
        top: 0.7rem;
        margin-bottom: 2em;
        background: white;
        box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      "
    >
      <div class="" style="height: 4rem">
        <p
          class="ml-1"
          style="
            position: fixed;
            top: 0;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 2rem;
            width: 21.5rem;
            border-bottom: 1px solid wheat;
            display: flex;
            padding: 1rem;
            background: white;
          "
        >
          Notifications
        </p>
      </div>

      <div
        class="uuu"
        style="list-style: none; height: 5rem"
        v-for="(pend, index) in getPendingOrderG"
        :key="index"
      >
        <router-link style="text-decoration: none" to="/confirmshirts">
          <div @click="onClickOutsidee" style="display: flex">
            <p style="width: 60%">
              <i class="pi pi-user"></i> {{ pend.userdetails.firstname }} has
              ordered
            </p>
            <p style="width: 20%">{{ pend.order.name }}</p>
            <p>
              <img
                style="height: 2rem; width: 3rem"
                :src="require('@/assets/shirtsMen/' + pend.order.imageSrc)"
              />
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      color: "white",
      colorr: "white",
      colorrr: "white",
      colorrrr: "white",
      colorrrrr : "white",
      link: "@/assets/productImages/saeed.jpg",
      active: "home",
      activeSidebar: false,
      collapsed: true,
      notify: false,

      items: [
        {
          label: "File",
          icon: "pi pi-fw pi-file",
        },
      ],
      userSpecs: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },

  computed: {
    ...mapGetters([
      "Orders",
      "getSumbmitedUserData",
      "getSumbmitedOrderData",
      "getSubmit",
      "getPendingOrderG",
      "UserOrders",
      "getConfirmedShirts",
      "getShippedShirts"
    ]),
    Orderss() {
      let flagCart = 0;
      for (let order of this.Orders) {
        flagCart += Number(order.quantity);
      }
      return flagCart;
    },
  },

  mounted() {},
  created() {
    //this.userName = this.getAllUsers[0].firstname
    console.log("orders", this.Orders);
  },

  methods: {
    onClickOutside(event) {
      console.log("Clicked outside. Event: ", event);
      this.userSpecs = false;
    },

    onClickOutsidee(event) {
      console.log("Clicked outside. Event: ", event);
      this.notify = false;
      console.log(this.getPendingOrderG);
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
};
</script>
<style scoped>
.uuu :hover {
  background: #ecf5ec;

  cursor: pointer;
  color: black;
}
@media screen and (max-width: 1013px) {
  .search {
    height: 100% !important;
  }
  .username {
    display: none;
  }
  @media screen and (max-width: 631px) {
    .country {
      display: none;
    }
  }

  @media screen and (max-width: 625px) {
    .search {
      margin-left: 2rem !important;
      height: 90% !important;
    }
  }
  @media screen and (max-width: 370px) {
    .myav {
      position: relative !important;
      left: 1.1rem !important;
      width: 2rem;
    }
  }
  .sa::-webkit-scrollbar {
    border-radius: 1rem;
    width: 0.5rem;
  }

  .sa::-webkit-scrollbar-track {
    --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .sa::-webkit-scrollbar-thumb {
    background-color: #7a747a;
    outline: 1px solid #7a747a;
    border-radius: 1rem;
    padding: 1rem;
  }

  .sa >>> .p-card >>> .p-card-content {
    padding: 0.5rem 0 !important;
  }

  .p-card >>> .p-card-body >>> .ch :hover {
    color: orange;
    background: orange;
  }

  .userimage {
    position: relative;
    left: 2rem;
  }
  .notification {
    position: relative;
    left: 2rem;
  }
  .notificationbadge {
    right: 7.5rem !important;
  }
  .carticons {
    position: relative;
    left: 3rem;
  }
  .cartbadge {
    right: 9.5rem !important;
  }
  .logos {
    left: 2rem !important;
  }
}
.vs-sidebar-content {
  background-image: url("~@/assets/productImages/backside.jpeg");
  background-size: cover;
  background-position-x: -8rem;
}

.header {
  background: #131921;
  z-index: 3 !important;
}
.p-dataview >>> .p-dataview-header {
  background: unset !important;
}
.open >>> .vs-sidebar__item__icon {
  background: unset !important;
  color: white;
}
.vs-sidebar__item {
  color: white;
}
.vs-sidebar__group__content .vs-sidebar__item {
  background: rgba(var(--vs-background), 0);
  color: white;
}
.vs-sidebar__item.hasIcon.active {
  border: 1px solid white;
  color: orange;
  border-radius: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: var(--bluegray-900);
  opacity: 0.8;
}
.vs-sidebar__item__icon.active {
  color: orange;
}
.vs-sidebar__group.open > .vs-sidebar__group__header .vs-sidebar__item {
  opacity: 0.7;
  background: #648391;
}
.open {
  border-radius: unset;
}
.open >>> .vs-sidebar {
  background: #414a4f !important;
  opacity: 0.8;
}
.open >>> .vs-sidebar__logo {
  background: #414a4f !important;
  opacity: 0.8;
}
.open >>> .vs-sidebar__footer {
  background: #414a4f !important;
  opacity: 0.8;
  border-top: 1px solid white;

  border-radius: 0.2rem;
}
</style>
