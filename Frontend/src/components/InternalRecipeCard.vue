<template>
    <div class="card" style="width: 18rem;">
      <router-link :to="{ name: 'myRecipeView', params: { recipeId: recipe.recipes_id }, query: { recipeFamily : recipe.isFamily } }" class="recipe-preview">
        <!-- <router-link :to="{ name: 'myRecipeView', params: { recipeId: recipe.recipes_id, isFamily: recipe.isFamily} }" class="recipe-preview"> -->
      <!-- <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview"> -->
        <img :src="recipe.image" class="recipe-image" alt="image from spooncalor"/>
      </router-link>
      <div class="card-body">
          <h5 class="recipe-title">{{ recipe.title }}</h5>
      </div>
      <ul class="recipe-overview">
        <li>⏳ {{ recipe.ready_in_minutes }} minutes</li>
        <li>
        0 likes
          <!-- Like -->
          <img v-if="!like" class="button" src="../assets/before_like.png" width="30" height="30" @click="addLike(recipe.id)">
          <img v-if="like" src="../assets/like.png" width="30" height="30">
        </li>

        <div v-if="recipe.isFamily">
          <li v-if="recipe.creatorBy">            Who is the genius? {{ recipe.creatorBy }}         </li>
          <li v-if="recipe.usualTime">           Usual time to prepared: {{ recipe.usualTime }}         </li>
        </div>

        <template v-if="recipe.vegetarian">
          <img src="@/assets/vegetarian.png" width="60" height="60" id="icon" />
        </template>
        <template v-if="recipe.glutenFree">
          <img src="@/assets/glutenFree.jpg" width="60" height="60" id="icon" />
        </template>
        <template v-if="recipe.vegan">
          <img src="@/assets/vegan.jpg" width="60" height="60" id="icon" />
        </template>
      </ul>

        <!-- favorite -->
        <img v-if="!favorites" class="button" src="../assets/before_favorite.png" width="40" height="40" @click="addFavorite(recipe.id)">
        <img v-if="favorites" src="../assets/favorites.png" width="40" height="40">
    </div>
</template>


<script>
export default {
  mounted() {
    if (this.recipe.image == null)
      // this.recipe.image = "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png";
      this.recipe.image = "../assets/ImageNF.png";

    // this.axios.get(this.recipe.image).then((i) => {
    //   this.image_load = true;
    // });
  },
  data() {
    return {
      image_load: false,
      like: false,
      favorites: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
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
.card {
  width: 18rem;
}

.card .recipe-image {
  width: 100%;
  height: auto;
  object-fit: cover;
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
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
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
.recipe-image:hover {
  opacity: 0.5;
  cursor: pointer;
}

.button
{
  cursor: pointer;
  margin: 20px;
}
</style>
