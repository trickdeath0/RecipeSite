<template>
  <div id="main-container">
    <div id="background"></div>

    <!-- <h1 class="title">Grandma's recipes and others</h1> -->
      <b-row>
        <b-col cols="3" class="left-column">
          <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" :recipes="randomRecipes || []" /> 
        </b-col>
        <b-col cols="5">
              <!-- Video section -->
          <div class="video-container">
            <video controls autoplay loop>
              <source src="@/assets/main.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </b-col>
        <b-col cols="3" class="right-column">
          <Login v-if="!$root.store.username"></Login>

          <RecipePreviewListWatched v-else title="Last watched recipes" :recipes="lastWatchedRecipes || []" />
          
          <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to view this</router-link> -->
          <!-- <RecipePreviewListWatched title="Last Viewed Recipes" :class="{RandomRecipes: true, blur: !$root.store.username, center: true}" disabled>
          </RecipePreviewListWatched> -->
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
   
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipePreviewListWatched from "../components/RecipePreviewListWatched.vue";
import Login from "../pages/LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    RecipePreviewListWatched,
    Login
  },
  data() {
    return {
      randomRecipes: [],
      lastWatchedRecipes: []
    };
  },
};
</script>

<style lang="scss" scoped>
#main-container{
  height: 100vh;
  width: 100vw;
}
// .column-container {
//   display: flex;
//   justify-content: space-between;
//   height: 100vh;
//   width: 100vw;
// }

.left-column {
  padding-left: 50px;
}

.right-column {
  padding-top: 10px;
}
.title{
  margin-bottom: 20px;
}
.RandomRecipes {
  margin: 10px 0 10px;
  position: relative;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/food-background.jpg);
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
}

//~~~~~~~~~~~~~~~~~~~~ RECIPE VIEDO ~~~~~~~~~~~~~~~~~~~~
.video-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
