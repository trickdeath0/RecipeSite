<template>
    <div style="width: 80rem;">
      <b-row v-for="(recipeLine, index) in recipeLines" :key="index" class="recipe-line">
          <b-col v-for="recipe in recipeLine" :key="recipe.id">
              <br>
                  <InternalRecipeCard class="recipePreview" :recipe="recipe"  />
          </b-col>
      </b-row>
    </div>
  </template>

<script>
import InternalRecipeCard from '../components/InternalRecipeCard.vue';
export default {
  name: "InternalRecipeGridCards",
  components: {
    InternalRecipeCard
  },
    props: {
      recipesArray: {
        type: Array,
        required: true
      }
    },
    computed: {
      recipeLines() {
        const recipesPerLine = 4;
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
