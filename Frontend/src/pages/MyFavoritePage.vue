<template>
    <div>
        <div id="background"></div>
        <h1 class="title">My Favorite</h1>
        <div class="grid" >
            <ExternalRecipesGridCards :recipesArray="this.recipes" />
        </div>
    </div>
</template>

<script>
import ExternalRecipesGridCards from '../components/ExternalRecipesGridCards.vue';
export default {
  name: 'MyFavoritePage',
    components: {
      ExternalRecipesGridCards,        
    },
    data() {
        return {
            recipes: [],
        }
    },
    async created() {
        try {
          this.recipes = [];
          const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          { withCredentials: true }
        );
        console.log("MyFavorite response");
        console.log(response);
        this.recipes.push(...response.data);

        console.log("MyFavorite recipes");
        console.log(this.recipes);
        } catch (e) {
          console.log(e);
        } 
    }
}
</script>

<style>
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

.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .title {
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;
  color: #000000;
  position: relative;
}

.title::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 4px;
  background-color: #ff5722;
}
</style>