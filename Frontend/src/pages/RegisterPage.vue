<template>
  <div class="container-registerPage">
    <div id="background4"></div>
    
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset" class="container-register">
      <h1 class="title">Register</h1>
      <!-- Username -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username">
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name -->
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName">
        <b-form-input
          id="firstName"
          type="text"
          v-model="$v.form.firstName.$model"
          :state="validateState('firstName')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          First Name alpha
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
          First Name length should be at least 2 characters long
        </b-form-invalid-feedback>
      </b-form-group>
      
      <!-- Last Name -->
      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName">
        <b-form-input
          id="lastName"
          type="text"
          v-model="$v.form.lastName.$model"
          :state="validateState('lastName')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          Last Name alpha
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
          Last Name length should be at least 2 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country">
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')">
        </b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.valid">
          Your password need at least one number and one special letter
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirmed Password -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword">
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword">
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email">
        <b-form-input
          id="email"
          type="text"
          v-model="$v.form.email.$model"
          :state="validateState('email')">
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.length">
          email length should be at least 2 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.email">
          email is not valid
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75" >Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div> -->

      <div class="actions">
        <b-button type="reset" variant="outline-danger">Reset</b-button>
        <b-button type="submit" variant="success">Register</b-button>
      </div>

      <div class="login-link">
        <span>Already have an account?</span>
        <router-link to="/login">Log in here</router-link>
      </div>

    <!-- end form Register -->
    </b-form>

    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Register failed: {{ form.submitError }}
    </b-alert>

    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        length: (f) => minLength(2)(f),
        alpha
      },
      lastName: {
        required,
        length: (l) => minLength(2)(l),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        valid: function(value) {
          const isNumberInclude = /[0-9]/.test(value);
          const isSpecialIncule = /[!@#$%^&*]/.test(value);
          return isNumberInclude && isSpecialIncule;
        },
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        length: (e) => minLength(2)(e),
        email
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/Register",
          {
            username: this.form.username,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email
          },
          { withCredentials: true }
        );
        this.$root.toast("Success", "A new user has been added", "success");
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        this.$root.toast("Input Error", err.response.data.message, "danger");
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../scss/form-style.scss";

.container-register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-image: url("../assets/register.png");
  background-size: cover;
  background-position: 200%;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #1253b4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Add text shadow */
}

.b-form-group {
  margin-bottom: 20px;
}

/* Customize the validation feedback color */
.b-form-invalid-feedback {
  color: #dc3545;
}

.actions {
  display: flex;
  justify-content: space-between;
}

/* Style the Register button */
.b-button[type="submit"] {
  width: 48%;
  background-color: #28a745;
  border-color: #28a745; /* Apply the same color to the border */
  font-weight: bold; /* Add font weight */
  text-transform: uppercase; /* Convert text to uppercase */
}

/* Style the Reset button */
.b-button[type="reset"] {
  width: 48%;
  background-color: #dc3545;
  border-color: #dc3545; /* Apply the same color to the border */
  font-weight: bold; /* Add font weight */
  text-transform: uppercase; /* Convert text to uppercase */
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 1.1rem;
  color: #888;
}

.login-link span {
  margin-right: 5px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-link a:hover {
  color: #0056b3;
}

</style>
