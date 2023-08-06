import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
// axios.defaults.withCredentials = true;
import VueScrollFixedNavbar from "vue-scroll-fixed-navbar";
import VueCookies from 'vue-cookies'
Vue.use(VueScrollFixedNavbar);

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.use(VueCookies);
const router = new VueRouter({
  routes,
});





import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormRadioPlugin,
  ModalPlugin,
  FormCheckboxPlugin,
  FormTextareaPlugin,
  ListGroupPlugin,



} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormRadioPlugin,
  FormCheckboxPlugin,
  ModalPlugin,
  FormTextareaPlugin,
  ListGroupPlugin,


  

].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  // user_
  search_url_: localStorage.search_url_,
  server_domain: "http://localhost:3000" || "http://127.0.0.1:3000",
  // server_domain:  "https://oran-shay.cs.bgu.ac.il",
  // server_domain: store.state.server_domain, // make this code without duplicate
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
    // VueCookies.set(this.username, this.username);
  },
  logout() {
    console.log("logout");
    // VueCookies.remove(this.username);
    localStorage.removeItem("username");
    this.username = undefined;
    localStorage.removeItem("search_url_");
    this.search_url_ = undefined;
    
  },
  last_search(search_url){
    localStorage.setItem("search_url_", search_url);
    this.search_url_ = search_url;
    console.log("last search");
  },
};
console.log(shared_data);

// Add a navigation guard to detect home page route and set the homePage data property
router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    const app = document.getElementById("app");
    app.__vue__.homePage = to.name === "main";
  });
  next();
});

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");