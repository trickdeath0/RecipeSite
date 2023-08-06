<template>
  <div id="app">
    <header>
      <div class="header-container">
        <div class="header-left">
          <!-- left bar nav -->
          
          <router-link :to="{ name: 'main' }"><img src="@/assets/logoMain.png" width="85" height="85" id="icon" />Home Page</router-link>|
          <router-link :to="{ name: 'search' }">Search 🔎</router-link>|
          <router-link :to="{ name: 'about' }">About</router-link>|

          <!-- when user log in create recipe & presonal show -->
          <button v-if="$root.store.username" class="created-recipe" @click="showRecipeModal">Create Recipe📝</button>
          <div v-if="!!$root.store.username" class="dropdown">
            <button class="dropdown-button">Personal</button>
            <div class="dropdown-content">
              <tr><router-link :to="{ name: 'myFavorite' }"> Favorites</router-link></tr>
              <tr><router-link :to="{ name: 'myRecipe' }"> My Recipes</router-link></tr>
              <tr><router-link :to="{ name: 'myFamily' }"> Family Recipes</router-link></tr>
            </div>
          </div>
        </div>

        <!-- right bar nav -->
        <div v-if="!$root.store.username" class="guest">
          <span>hello guest:</span>
          <router-link :to="{ name: 'register' }">Register</router-link>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </div>

        <div v-if="!!$root.store.username" class="dropdown">
          <button class="dropdown-button"><span>{{ $root.store.username }}</span></button>
          <div class="dropdown-content">
            <!-- <tr><router-link :to="{ name: 'account' }">Account⚙️</router-link></tr> -->
            <tr><button class="logout-btn" @click="Logout">Logout😥</button></tr>
          </div>
        </div>

      </div>
    </header>

    <!-- Main page -->
    <main>
      <div v-if="isHomePage" class="main-section home-page-main">
        <h1 class="main-title">Grandma's recipes and others</h1>
        <p class="main-description">Unlock the Secrets of Flavor</p>
      </div>
      <router-view />
    </main>

    <!-- Video section -->
    <!-- <div class="video-container">
      <video controls autoplay>
        <source src="@/assets/main.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div> -->

    <!-- Model for create recipe -->
    <b-modal ref="recipe-modal" hide-footer title="Create new recipe" size="xl">
      <div class="d-block text-center">
        <CreateRecipeModel></CreateRecipeModel>
      </div>
      <!-- <b-button class="mt-3" variant="outline-info" block @click="hideRecipeModal">Close Me</b-button>       -->
    </b-modal>


    <!-- footer -->
    <footer :class="{ 'home-page-footer': isHomePage }">
      <div class="footer-container">
        <p>&copy; 2023 All rights reserved to Oran-Shay.</p>
      </div>
    </footer>

  </div>
</template>

<script>
import CreateRecipeModel from './components/CreateRecipeModel.vue';
export default {
    name: "App",
    data() {
        return {
            showCreateRecipe: false,
        };
    },

    computed: {
      isHomePage() {
        return this.$route.name === "main";
      },
      isRegisterPage(){
        return this.$route.name === "register";
      },
      isLoginPage(){
        return this.$route.name === "login";
      }
    },

    methods: {
        Logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");
            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });
        },
        showRecipeModal() {
            this.$refs["recipe-modal"].show();
        },
        // hideRecipeModal() {
        //     this.$refs["recipe-modal"].hide();
        // }
    },
    components: { CreateRecipeModel }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // min-height: 200vh;
  display: flex;
  flex-direction: column;
  min-height: -webkit-min-content; /* Safari/Chrome */
  min-height: -moz-min-content; /* Firefox */
  min-height: min-content;
}

// #nav {
//   padding: 30px;
// }

// #nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }


body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
header {
  background-color: #494949;
  padding: 10px 20px;
  border-bottom: 2px solid #f2f2f2;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  align-items: center;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  margin-right: 20px;
}
.search {
  background-color: #ff4081;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.about {
  background-color: #ff4081;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
header a {
  color: #ffffff;
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
  transition: color 0.3s ease;
}
header a:hover {
  color: #d5004e;
  text-decoration: underline;
}
.header-middle {
  display: flex;
  align-items: center;
}

//~~~~~~~~~~~~~~~~~~~~ create ~~~~~~~~~~~~~~~~~~~~
.created-recipe {
  background: linear-gradient(45deg, #ff4081, #d5004e);
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  margin-right: 10px;
}

.created-recipe:hover {
  background: linear-gradient(45deg, #d5004e, #ff4081);
}

//~~~~~~~~~~~~~~~~~~~~ DROPDOWN ~~~~~~~~~~~~~~~~~~~~
.dropdown {
  position: relative;
  margin-right: 5px;
}
.dropdown-button {
  background-color: #ff4081;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-weight: bold;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.dropdown-button:hover {
  background-color: #d5004e;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #b982c4;
  min-width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  padding: 10px;
  left: -10px;
}
.dropdown:hover .dropdown-content {
  display: block;
}

//~~~~~~~~~~~~~~~~~~~~ GUEST|USER ~~~~~~~~~~~~~~~~~~~~
.guest span {
  margin-right: 10px;
  font-weight: bold;
  color: white;
}
.user-login span {
  // margin-right: 20px;
  font-weight: bold;
  color: #ffffff;
  background-color: #f3e5f5;
  border: 2px solid #ff4081;
  border-radius: 20px;
  // padding: 8px 15px;
  transition: background-color 0.3s ease;
}
.user-login span:hover {
  background-color: #ff4081;
  color: white;
}

.register-section{
  height: 200px;
}
.login-section{
  height: 200px;
}

//~~~~~~~~~~~~~~~~~~~~ MAIN ~~~~~~~~~~~~~~~~~~~~
main {
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;

}

.home-page-main{
  display: none;
}


.main-section {
  background-image: linear-gradient(to bottom right, #ff8c00, #ff0080);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}
.main-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.main-description {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-style: italic;
}
.logout-btn {
  background: transparent;
  border: none;
  padding: 0;
  font: inherit;
  color: transparent;
  cursor: pointer;
  color: #fffefe;
  font-weight: bold;
  margin-right: 10px;
}
.logout-btn:hover {
  color: #0056b3;
  text-decoration: underline;
}

//~~~~~~~~~~~~~~~~~~~~ MODEL ~~~~~~~~~~~~~~~~~~~~
.recipe-modal {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.modal-title {
  color: #f2f2f2;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.modal-content {
  text-align: center;
}

//~~~~~~~~~~~~~~~~~~~~ FOOTER ~~~~~~~~~~~~~~~~~~~~
footer {
  margin-top: auto; /* Push the footer to the bottom */
  background-color: #333;
  color: white;
  width: 100%;
  text-align: center;
}

/* For the home page (200vh) */
.home-page-footer {
  width: 100%;
  text-align: center;
  position: relative;
  top: 700px;
}


.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 460px;
  margin: 0 auto;
}
.footer-left p {
  font-size: 18px;
}


//~~~~~~~~~~~~~~~~~~~~ RECIPE VIEDO ~~~~~~~~~~~~~~~~~~~~
// .video-container {
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// }

</style>
