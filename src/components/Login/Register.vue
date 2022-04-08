<template>
  <div class="flex justify-content-center">
    <Dialog
      :visible="dialogstatus"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="top"
    >
      <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
        <i
          class="pi pi-times"
          style="position: fixed; top: 7px; left: 10px; cursor: pointer"
          @click="cancleDialoug"
        ></i>
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Registration Successful!</h5>
        <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
          Your account is registered under email : <b>{{ userData.email }}</b>
        </p>
        <p>Go To Login</p>
      </div>
      <template #footer>
        <div class="p-d-flex p-jc-center">
          <Button label="OK" @click="toggleDialog" class="p-button-text" />
        </div>
      </template>
    </Dialog>
    <div class="card col-12 md:col-10 lg:col-10">
      <div>
        <img
          src="@/assets/productImages/logoo.png"
          alt=""
          style="height: 4rem; position: relative; top: 0px; float: left"
        />
        <router-link to="/"
          ><span
            style="
              float: right;
              position: relative;
              right: 1rem;
              top: 0.5rem;
              color: white;
            "
          >
            Login<i class="pi pi-sign-in p-2" /></span
        ></router-link>
      </div>
      <br />

      <h4 style="padding: 1rem; color: white">Register a new user</h4>
      <div class="p-fluid grid flex justify-content-center">
        <div
          class="p-field col-12 md:col-5 lg:col-5"
          :class="{
            'form-group--error': $v.userData.firstname.$error && lablefirst,
          }"
        >
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-user" />
            <InputText
              class="inputErr"
              placeholder="First Name"
              type="text"
              v-model="userData.firstname"
              v-model.trim="$v.userData.firstname.$model"
            />
          </span>
          <p class="error" v-if="!$v.userData.firstname.required && lablefirst">
            First Name is required
          </p>
        </div>

        <div
          class="p-field col-12 md:col-6 lg:col-6"
          :class="{
            'form-group--error': $v.userData.lastname.$error && lablelast,
          }"
        >
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-user" />
            <InputText
              class="inputErr"
              placeholder="Last Name"
              type="text"
              v-model="userData.lastname"
              v-model.trim="$v.userData.lastname.$model"
            />
          </span>
          <p class="error" v-if="!$v.userData.lastname.required && lablelast">
            Last Name is required
          </p>
        </div>

        <div
          class="p-field col-12 md:col-5 lg:col-5"
          :class="{
            'form-group--error': $v.userData.email.$error && lablelast,
          }"
        >
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />

            <InputText
              class="inputErr"
              placeholder="E-Mail"
              v-model.trim="$v.userData.email.$model"
              v-model="userData.email"
            />
          </span>
          <p class="error" v-if="!$v.userData.email.required && lableemail">
            Email is required
          </p>
          <p class="error" v-if="!$v.userData.email.email && lableemail">
            Invalid Email
          </p>
        </div>

        <div class="p-field col-12 md:col-3 lg:col-3">
          <span
            class="p-float-label p-input-icon-right"
            :class="{
              'form-group--error': $v.userData.password.$error && lablepassword,
            }"
          >
            <i class="pi pi-lock" />
            <InputText
              class="inputErr"
              placeholder="Password"
              type="password"
              v-model="userData.password"
              v-model.trim="$v.userData.password.$model"
            />
          </span>
          <p
            class="error"
            v-if="!$v.userData.password.required && lablepassword"
          >
            Password is required
          </p>
        </div>

        <div
          class="p-field col-12 md:col-3 lg:col-3"
          :class="{
            'form-group--error':
              $v.userData.confirmpassword.$error && lableconfirm,
          }"
        >
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-lock" />
            <InputText
              class="inputErr"
              placeholder="Confirm Password"
              type="password"
              v-model="userData.confirmpassword"
              v-model.trim="$v.userData.confirmpassword.$model"
            />
          </span>
          <p
            class="error"
            v-if="$v.userData.confirmpassword.$error && lableconfirm"
          >
            Not identical !
          </p>
        </div>

        <div class="p-field flex col-12 md:col-3 lg:col-3">
          <Dropdown
            style="width: 100%"
            v-model="userData.selectedCountry"
            :options="countries"
            optionLabel="name"
            :filter="true"
            placeholder="Select a Country"
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
        </div>

        <div class="p-field flex col-12 md:col-2 lg:col-2">
          <InputText
            style=""
            placeholder="zip code"
            type="number"
            v-model="userData.zipcode"
          />
        </div>

        <div class="p-field flex col-12 md:col-6 lg:col-6">
          <h5 class="mt-0" style="width: 20%; color: white">Gender</h5>
          <div
            class="p-field-radiobutton flex justify-content-center"
            style="width: 40%"
          >
            <RadioButton
              id="male"
              name="gender"
              value="Male"
              v-model="userData.gender"
            />
            <label for="city1" class="ml-2" style="color: white">Male</label>
          </div>
          <div
            class="p-field-radiobutton flex justify-content-start"
            style="width: 40%; float: left"
          >
            <RadioButton
              id="female"
              name="gender"
              value="Female"
              v-model="userData.gender"
            />
            <label for="female" class="ml-2" style="color: white">Female</label>
          </div>
        </div>

        <div
          class="p-field flex col-12 md:col-3 lg:col-3"
          :class="{
            'form-group--error':
              $v.userData.selectedusertype.$error && lableusertype,
          }"
        >
          <Dropdown
            style="width: 100%"
            v-model="userData.selectedusertype"
            :options="getJsonTypes"
            optionLabel="name"
            placeholder="user type"
            :showClear="true"
            class="inputErr"
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
        </div>

        <div
          class="p-field flex col-12 md:col-2 lg:col-2"
          :class="{
            'form-group--error':
              $v.userData.selecteduserbranch.$error && lableuserbranch,
          }"
        >
          <Dropdown
            style="width: 100%"
            v-model="userData.selecteduserbranch"
            :options="allBranches"
            optionLabel="name"
            placeholder="Branch"
            :showClear="true"
            class="inputErr"
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
        </div>

        <div class="p-field col-12 md:col-6 lg:col-6">
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-map-marker" />
            <InputText
              placeholder="Address"
              id="inputtext-right"
              type="text"
              v-model="userData.address"
            />
          </span>
        </div>

        <div class="p-field col-12 md:col-5 lg:col-5">
          <Textarea
            placeholder="Type your notes"
            id="textarea"
            v-model="userData.notes"
            rows="3"
          />
        </div>

        <div class="p-field col-12 md:col-6 lg:col-6"></div>

        <div class="p-field col-12 md:col-5 lg:col-5">
          <div
            class="p-field-checkbox flex justify-content-start"
            :class="{
              'form-group--error':
                $v.userData.acceptterms.$error && lableacceptterms,
            }"
          >
            <Checkbox
              class="inputErr"
              id="binary"
              v-model="userData.acceptterms"
              :binary="true"
            />
            <label
              for="binary"
              class="ml-2"
              style="color: white"
              :class="{
                redtext: $v.userData.acceptterms.$error && lableacceptterms,
              }"
              >I accept terms of use</label
            >
          </div>
        </div>

        <div class="p-field col-12 md:col-6 lg:col-6"></div>

        <div class="p-field col-12 md:col-5 lg:col-5">
          <Button
            type="submit"
            @click.prevent="submit"
            style="width: 30%"
            label="submit"
            class="p-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "StocklastRegister",

  data() {
    return {
      submitStatus: "",
      lablefirst: false,
      lablelast: false,
      lableemail: false,
      lablepassword: false,
      lableconfirm: false,
      lableusertype: false,
      lableuserbranch: false,
      userData: {
        firstname: "",
        acceptterms: false,
        lastname: "",
        password: "",
        confirmpassword: "",
        zipcode: "",
        gender: "",
        email: "",
        address: "",
        notes: "",
        selectedusertype: "",
        selecteduserbranch: "",
        selectedCountry: "",
      },
      countries: [
        { name: "Australia", code: "AU" },
        { name: "Brazil", code: "BR" },
        { name: "China", code: "CN" },
        { name: "Egypt", code: "EG" },
        { name: "France", code: "FR" },
        { name: "Germany", code: "DE" },
        { name: "India", code: "IN" },
        { name: "Japan", code: "JP" },
        { name: "Spain", code: "ES" },
        { name: "United States", code: "US" },
      ],
    };
  },

  validations: {
    userData: {
      firstname: {
        required,
      },
      lastname: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      confirmpassword: {
        sameAsPass: sameAs("password"),
      },
      selectedusertype: {
        required,
      },
      selecteduserbranch: {
        required,
      },
      acceptterms: {
        checked(val) {
          return val;
        },
      },
    },
  },
  computed: {
    ...mapGetters(["allBranches", "getJsonTypes"]),
    dialogstatus() {
      return this.$store.getters.getDialog;
    },
  },
  mounted() {},
  created() {},

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.lablefirst = true;
        this.lablelast = true;
        this.lableemail = true;
        this.lablepassword = true;
        this.lableconfirm = true;
        this.lableusertype = true;
        this.lableuserbranch = true;
        this.lableacceptterms = true;
        console.log(this.submitStatus);
      } else {
        this.$store.dispatch("signUser", this.userData);

        // do your submit logic here axios post
        // this.submitStatus = "PENDING";
        // setTimeout(() => {
        //   this.submitStatus = "OK";
        // }, 500);
      }
    },
    resetUser() {
      this.userData.firstname = "";
      this.userData.lastname = "";
      this.userData.gender = "";
      this.userData.email = "";
      this.userData.selectedusertype = "";
      this.userData.selecteduserbranch = "";
      this.userData.address = "";
      this.userData.password = "";
      this.userData.confirmpassword = "";
      this.userData.selectedCountry = "";
      this.userData.zipcode = "";
      this.userData.acceptterms = "";
      this.userData.notes = "";
      this.lablefirst = false;
      this.lablelast = false;
      this.lableemail = false;
      this.lablepassword = false;
      this.lableconfirm = false;
      this.lableusertype = false;
      this.lableuserbranch = false;
      this.lableacceptterms = false;
    },

    toggleDialog() {
      this.$store.dispatch("toggleDialog");
      this.$router.push("/");
    },
    cancleDialoug() {
      this.$store.dispatch("toggleDialog");
      this.resetUser();
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 489px) {
  .p-formgroup-inline .p-field {
    margin-bottom: 1em !important;
  }
}

.layout-content .content-section.implementation > h3 {
  font-weight: 600;
}

textarea {
  resize: none;
}
.card {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}

.form-group--error .inputErr {
  border: 1px solid rgb(236, 65, 65);
}
.form-group--error .error {
  color: rgb(204, 107, 107);
}
.redtext {
  color: red;
}

.p-dialog .p-dialog-header-icons {
  visibility: hidden;
}
</style>
