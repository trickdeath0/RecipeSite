<template>
    <div class="container">
      <div id="background2"></div>
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1 class="text-center">{{ recipe.title }}</h1>
          <img :src="recipe.image" class="img-fluid rounded mx-auto d-block" alt="Recipe Image" />
        </div>
        <div class="recipe-body">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-4">


              <!-- Like -->
              <img v-if="!like" class="button" src="../assets/before_like.png" width="30" height="30" @click="addLike(recipe.id)">
              <img v-if="like" src="../assets/like.png" width="30" height="30">

              <!-- favorite -->
              <img v-if="!favorites" class="button" src="../assets/before_favorite.png" width="40" height="40" @click="addFavorite(recipe.id)">
              <img v-if="favorites" src="../assets/favorites.png" width="40" height="40">


                <h3>Recipe Details</h3>
                <hr />
                <template v-if="recipe.vegetarian">
                  <img src="@/assets/vegetarian.png" width="60" height="60" id="icon" />
                </template>
                <template v-if="recipe.glutenFree">
                  <img src="@/assets/glutenFree.jpg" width="60" height="60" id="icon" />
                </template>
                <template v-if="recipe.vegan">
                  <img src="@/assets/vegan.jpg" width="60" height="60" id="icon" />
                </template>
     
                <div >
                  <div class="me-4">
                    <strong>Ready in: </strong>
                    <span class="text-muted">{{ recipe.ready_in_minutes }} minutes </span>
                  </div>
                  <div>
                    <strong>Servings: </strong>
                    <span class="text-muted">{{ recipe.servings }} servings</span>
                  </div>
                  
                  <div v-if="recipe.isFamily">
                    <strong>Who is the genius: </strong>
                    <span class="text-muted">{{ recipe.creatorBy }}</span>
                  </div>
                  <div v-if="recipe.isFamily">
                    <strong>Usual time to prepared: </strong>
                    <span class="text-muted">{{ recipe.usualTime }} </span>
                  </div>


                </div>
              </div>
              <div class="mb-4">
                <h3>Ingredients</h3>
                <hr />
                <ul>
                  <!-- <li v-for="(r, index) in recipe.ingredients" :key="index + '_' + r.id">{{ r.original }}</li> -->
                  <li v-for="(r, index) in recipe.ingredients" :key="index + '_' + r.id">{{ r.name }}</li>

                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-4">
                <h3>Instructions</h3>
                <hr />
                <ol>
                  <div v-html="formattedInstructions"></div>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  <script>
    export default {
      name: "MyRecipeViewPage",
      data() {
        return {
          recipe: null,
          favorites: false,
          like: false,
        };
      },
      computed: {
        formattedInstructions() {
          return this.recipe.instructions;
        }
      },
      async created() {
        try {
          let response;
          let isRecipeFamily = this.$route.query.recipeFamily;
          // response = this.$route.params.response;
          console.log("#############################################################");
          console.log("this.$route.params.recipeId", this.$route.params.recipeId);
          console.log("this.$route.query.recipeFamily", this.$route.query.recipeFamily );
          console.log("isRecipeFamily", isRecipeFamily);
          console.log("#############################################################");

          try {
            
            response = await this.axios.get(
              this.$root.store.server_domain + "/users/myRecipes/" + this.$route.params.recipeId,
              {
                withCredentials: true,
                params: {
                  recipeFamily: isRecipeFamily
                }
              }
            );
              console.log("response", response);

              // console.log("response.status", response.status);
              if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
              console.log("error.response.status", error.response.status);
              this.$router.replace("/NotFound");
              return;
            }


          this.recipe = response.data[0];
          console.log("this.recipe", this.recipe);
        } catch (error) {
          console.log(error); 
        }
      },

    methods: {

        addLike(id) {
          if (this.$root.store.username) {
            this.$root.toast("Add Like", "Like was added successfully", "success");
            this.like = !this.like;
            this.$emit("like", this.like);
          }
          else
            this.$root.toast("Add to favorites", "Must login to like this recipe", "danger");
        },


        addFavorite(id) {
          if (this.$root.store.username) {
            this.$root.toast("Add to favorites", "Recipe was added successfully", "success");
              this.favorites = !this.favorites;
              this.$emit("like", this.favorites);
          }
          else
            this.$root.toast("Add to favorites", "Must login to add favorites", "danger");
        },

        },


    };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .button
{
  cursor: pointer;
  margin: 20px;
}

#background2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/inside\ food.jpg);
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
}
  </style>
  