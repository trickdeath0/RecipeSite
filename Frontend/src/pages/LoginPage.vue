<template>
  <div class="container-loginPage">
    <div id="background"></div>
    <img class="LoginImg" src="@/assets/loginImage.png" width="600" height="250" />
    
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">

      <!-- Username -->
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username">
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password">
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.valid">
          Your password need at least one number and one special letter
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" style="width:100px;display:block;" class="mx-auto w-100">Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
      
    </b-form>

    <div>
      <b-button @click="modalShow = !modalShow" >Forget your password? </b-button>
      <b-modal v-model="modalShow" hide-footer title="Forget your password?">Please relax and try to remember! 😉</b-modal>
    </div>

    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Login failed: {{ form.submitError }}
    </b-alert>

    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->

  </div>
</template>

<script>
import { BButton, BModal } from 'bootstrap-vue';
import { required, alpha, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    BButton,
    BModal
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
      modalShow: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        // length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      password: {
        required,
        // valid: function(value) {
        //   const isNumberInclude = /[0-9]/.test(value);
        //   const isSpecialIncule = /[!@#$%^&*]/.test(value);
        //   return isNumberInclude && isSpecialIncule;
        // },
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain +"/Login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            username: this.form.username,
            password: this.form.password
          },
          { withCredentials: true }
        );
        console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        // this.$root.store.login(response.data);



        // let favorites_ids = [];
        // let favorites = await this.axios.get(
        //   this.$root.store.server_domain + "/users/favorites"
        // );
        // favorites.data.forEach((recipe) => {
        //   favorites_ids.push(recipe.id.toString());
        // });
        // sessionStorage.setItem("favorites", JSON.stringify(favoritesIds));


        // let lastSeen = await this.axios.get(
        //   this.$root.store.server_domain + "/users/watchedAll"
        // );
        // sessionStorage.setItem("watchedRecipes", JSON.stringify(lastSeen.data.watched) );





        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      } catch (err) {
        this.$root.toast("Input Error", err.response.data.message, "danger");
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
@import url(../scss/form-style.scss);
.container-loginPage {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1253b4;
}
.LoginImg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

#background4 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/diy-food-photography-backgrounds.jpg);
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
}
</style>
