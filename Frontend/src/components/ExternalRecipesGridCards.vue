<template>
    <div class="external-recipes-grid-cards" style="width: 80rem;">
      <b-row v-for="(recipeLine, index) in recipeLines" :key="index" class="recipe-line">
          <b-col v-for="recipe in recipeLine" :key="recipe.id">
              <br>
                  <RecipePreview class="recipePreview" :recipe="recipe" />
          </b-col>
      </b-row>
    </div>
  </template>

<script>
import RecipePreview from '../components/RecipePreview.vue';
export default {
  name: "ExternalRecipesGridCards",
  components: {
    RecipePreview
  },
    props: {
      recipesArray: {
        type: Array,
        required: true
      }
    },
    computed: {
      recipeLines() {
        const recipesPerLine = 3;
        const lines = [];
        let currentLine = [];

        // Iterate over the recipes and split them into lines
        this.recipesArray.forEach((recipe, index) => {
          currentLine.push(recipe);

          // Check if the current line is full or if it's the last recipe
          if (currentLine.length === recipesPerLine || index === this.recipesArray.length - 1) {
            lines.push(currentLine);
            currentLine = [];
          }
        });
        console.log("recipeLines");
        console.log(lines);
        return lines;
      }
    },
};
</script>

<style scoped>



</style>
