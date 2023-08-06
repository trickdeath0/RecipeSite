<template>
  <div class="card" style="width: 18rem;">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
      <img :src="recipe.image" class="recipe-image" alt="image from spooncalor"/>

      <!-- <img v-if="image_load" :src="recipe.image" class="recipe-image" alt="image from spooncalor"/>
      <img v-else class="recipe-image" src="https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png" width="250" height="250"/> -->
    </router-link>
    <div class="card-body">
        <h5 class="recipe-title">{{ recipe.title }}</h5>
    </div>

    <ul class="recipe-overview">
      <li>⏳ {{ recipe.readyInMinutes }} minutes</li>
      <li>
        {{ recipe.popularity }} {{ recipe.aggregateLikes }} likes
        <!-- Like -->
        <img v-if="!like" class="button" src="../assets/before_like.png" width="30" height="30" @click="addLike(recipe.id)">
        <img v-if="like" src="../assets/like.png" width="30" height="30">
      </li>
      <template v-if="recipe.vegetarian">
        <img src="@/assets/vegetarian.png" width="60" height="60" id="icon" />
      </template>
      <template v-if="recipe.glutenFree">
        <img src="@/assets/glutenFree.jpg" width="60" height="60" id="icon" />
      </template>
      <template v-if="recipe.vegan">
        <img src="@/assets/vegan.jpg" width="60" height="60" id="icon" />
      </template>

      <!-- favorite -->
      <img v-if="!favorites" class="button" src="../assets/before_favorite.png" width="40" height="40" @click="addFavorite(recipe.id)">
      <img v-if="favorites" src="../assets/favorites.png" width="40" height="40">


      <!-- Watch -->
      <!-- <img v-if="!isWatch" class="button" src="../assets/before_watch.png" width="40" height="40"> -->
      <img v-if="isWatch" src="../assets/watch.png" width="40" height="40">
    </ul>
  </div>
</template>


<script>
export default {
  name: "RecipePreview",

  mounted() {
    // this.axios.get(this.recipe.image).then((i) => {
    //   this.image_load = true;
    // });
    if (this.recipe.image == null)
      // this.recipe.image = "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png";
      this.recipe.image = "../assets/ImageNF.png";

    // this.axios
    //   .get(this.recipe.image, {
    //     headers: { "Access-Control-Allow-Origin": "*" },
    //   })
    //   .then((res) => {
    //     this.image_load = true;
    //   })
    //   .catch((err) => console.log(err));
  },
  data() {
    return {
      image_load: false,
      favorites: false,
      like: false,
      isWatch: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
  },
  
  async created() {
        console.log("this.recipe @@ ", this.recipe);
        console.log("Get favorites items created ");
        try {
          const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites/"+ this.recipe.id,
          { withCredentials: true }
        );
        console.log("favorites items response");
        console.log(response);
        console.log("data response");
        console.log(response.data);
        this.favorites = response.data;  
        // let recipes = response.data;  
        // for (let i = 0; i < recipes.length; i++) {
        //   if (recipes[i].id == this.recipe.id)
        //     this.favorites = true;
        // }
        } catch (e) {
          console.log(e);
        } 

        try {
          const response = await this.axios.get(
          this.$root.store.server_domain + "/users/checkWatched/"+ this.recipe.id,
          { withCredentials: true }
        );
        console.log("isWatch response");
        console.log(response);
        console.log("isWatch response");
        console.log(response.data);
        this.isWatch = response.data;

        } catch (e) {
          console.log(e);
        } 


        try {
          const response = await this.axios.get(
          this.$root.store.server_domain + "/users/Like/"+ this.recipe.id,
          { withCredentials: true }
        );
        console.log("like response");
        console.log(response);
        console.log("like response");
        console.log(response.data);
        this.like = response.data;

        } catch (e) {
          console.log(e);
        } 
        console.clear();
    },

    

  methods: {

    addLike(id) {
      if (this.$root.store.username) {
        this.axios
          .post(
            this.$root.store.server_domain + "/users/Like",
            {
              recipeId: id,
            },
            { withCredentials: true }
          )
          .then((response) => {
            this.$root.toast("Add Like", "Like was added successfully", "success");
            this.like = !this.like;
            this.$emit("like", this.like);
          })
          .catch((error) => {
            this.$root.toast("Add Like", "Like was not added", "danger");
          });
      }
      else
        this.$root.toast("Add to favorites", "Must login to like this recipe", "danger");
    },


    addFavorite(id) {
      if (this.$root.store.username) {
        this.axios
          .post(
            this.$root.store.server_domain + "/users/favorites",
            {
              recipeId: id,
            },
            { withCredentials: true }
          )
          .then((response) => {
            this.$root.toast("Add to favorites", "Recipe was added successfully", "success");
            this.favorites = !this.favorites;
            this.$emit("like", this.favorites);
          })
          .catch((error) => {
            this.$root.toast("Add to favorites", "Recipe was not added", "danger");
          });
      }
      else
        this.$root.toast("Add to favorites", "Must login to add favorites", "danger");
    },

  },

};
</script>

<style scoped>
.card {
  width: 18rem;
}

.recipe-image:hover {
  opacity: 0.5;
  cursor: pointer;
}

.card .recipe-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-body {
  padding: 0.5rem;
  background-color: #f9f9f9;
  text-align: center;
}


.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}


.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  /* font-size: 12pt; */
  font-size: 18px;
  color: #333;
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.button
{
  cursor: pointer;
  margin: 20px;
}
</style>
