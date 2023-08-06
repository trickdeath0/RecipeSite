

<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>

    <div v-for="r in recipes" :key="r.id" >
        <RecipePreview class="recipePreview" :recipe="r"/>
    </div>

    <b-button class="getThreeRandom_btn" @click="updateRecipes" variant="secondary">More Recipe</b-button>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      // favoritesRecipes: [],
      // watchedRecipes: [],
    };
  },
  mounted() {
    // this.getFavorites();
    // this.getWatched();
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          { withCredentials: true }
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        this.recipes = [];
        const recipes = response.data;
        console.log(recipes);
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    // async getFavorites() {
    //   try {
    //     const response = await this.axios.get(
    //       this.$root.store.server_domain + "/users/favorites"
    //     );
    //     const recipes = response.data;
    //     this.favoritesRecipes.push(...recipes.recipes);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // async getWatched() {
    //   try {
    //     const response = await this.axios.get(
    //       this.$root.store.server_domain + "/users/watchedAll"
    //     );
    //     const recipes = response.data;
    //     this.watchedRecipes.push(...recipes.recipes);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}

.recipe-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.recipe-table th,
.recipe-table td {
  padding: 10px;
  text-align: left;
}

.recipe-table th {
  background-color: #f2f2f2;
}

.recipe-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.recipe-name {
  width: 40%;
}

.getThreeRandom_btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
