<template>
  <div class="grid flex justify-content-center">
    <div class="surface-card p-4 shadow-2 w-full border-round lg:w-5">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">
          <img
            style="height: 20vh; border-raduis: 50%"
            src="@/assets/productImages/logoo.png"
          />
        </div>
      </div>

      <div>
        <label
          style="
            float: left;
            width: 100%;
            display: flex !important ;
            justify-conetent: left;
          "
          for="email1"
          class="block text-900 font-medium mb-2"
          >Email</label
        >
        <span class="p-input-icon-right mb-4 w-full">
          <i class="pi pi-envelope" />
          <InputText
            type="text"
            class="w-full"
            v-model="email"
            placeholder="Ex : saeedfayed@gmail.com"
          />
        </span>

        <label
          style="
            float: left;
            width: 100%;
            display: flex !important ;
            justify-conetent: left;
          "
          for="email1"
          class="block text-900 font-medium mb-2"
          >Password</label
        >
        <span class="p-input-icon-right mb-4 w-full">
          <i class="pi pi-lock" />
          <InputText type="password" class="w-full" v-model="password" />
        </span>

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="rememberme1"
              :binary="true"
              v-model="checked1"
              class="mr-2"
            ></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
          <a
            class="
              font-medium
              no-underline
              ml-2
              text-blue-500 text-right
              cursor-pointer
            "
            >Forgot password?</a
          >
        </div>

        <Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
        <div class="mt-6 text-center text-600">
          Don't have an account?
          <router-link to="register">
            <a tabindex="0" class="font-medium text-blue-500"
              >Sign up</a
            ></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StocklastAnotherlogin",

  data() {
    return {
      checked1: false,
      email : '',
      password :''
    };
  },

  mounted() {},

  methods: {},
};
</script>
<style scoped>

</style>
