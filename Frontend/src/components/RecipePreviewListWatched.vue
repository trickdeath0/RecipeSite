<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div v-for="r in recipes" :key="r.id" >
        <!-- <RecipePreview class="recipePreview" :recipe="r" :favorites="favoritesRecipes" :watched="watchedRecipes"/> -->
        <RecipePreview class="recipePreview" :recipe="r" />
    </div>
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
      },

    //   favorites: {
    //   type: Array,
    //   required: true
    // },

    // watched: {
    //   type: Array,
    //   required: true
    // },

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
            this.$root.store.server_domain + "/users/lastWatched",
            { withCredentials: true }
          );

        // sessionStorage.setItem(
        //   "watchedRecipes",
        //   JSON.stringify(response.data)
        // );
  
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

    //   async getFavorites() {
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
  </style>
  
  