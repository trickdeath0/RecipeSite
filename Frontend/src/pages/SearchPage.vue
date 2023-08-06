<template>
  <div class="container">
    <div id="background"></div>
    
    <h1 class="title">Search Page</h1>

    <form class="search-form" @submit.prevent="Search">

      <div v-if="$root.store.username" class="form-group">
        <label class="search-url" for="search-url">Your last search was: {{ lastSearchUrl }}</label>
      </div>

      <div class="form-group">
        <label for="query">Query to cook:</label>
        <input class="form-control" type="search" placeholder="Enter search query" aria-label="Search" v-model="formData.query" id="query">
      </div>

      <div class="form-group">
        <label for="cuisine">Cuisine:</label>
        <select class="form-control" v-model="formData.cuisine" id="cuisine">
          <option v-for="option in options.cuisine" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="diet">Diet:</label>
        <select class="form-control" v-model="formData.diet" id="diet">
          <option v-for="option in options.diet" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="intolerance">Intolerance:</label>
        <select class="form-control" v-model="formData.intolerance" id="intolerance">
          <option v-for="option in options.intolerance" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="amount-of-results">Amount of results:</label>
        <select class="form-control" v-model="formData.AmountOfResults" id="amount-of-results">
          <option v-for="option in options.AmountOfResults" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="sort-form-group">
        <label>Sort results by:</label>
        <div class="sort-options">
          <b-form-radio v-for="option in sortOptions" :key="option.value" v-model="formData.sort" :name="'sort-radios-' + option.value" :value="option.value" >
            {{ option.label }}
          </b-form-radio>
        </div>
      </div>

      <button class="btn btn-primary" type="submit">Search</button>
    </form>
    
    <div class="grid">
      <ExternalRecipesGridCards :recipesArray="recipes" />
      <div v-if="noRecipesFound" class="no-recipes-message">
        <p class="message-text">Oops! No recipes found 😥</p>
        <p class="message-description">Please try adjusting your search criteria.</p>
      </div>
      <!-- <h2 v-else> Not found recipes 😥</h2> -->
    </div>
  </div>
</template>

<script>
import ExternalRecipesGridCards from '../components/ExternalRecipesGridCards.vue';

export default {
  components: {
    ExternalRecipesGridCards
  },
  name: 'SearchPage',
  data() {
    return {
      formData: {
        query: '',
        cuisine: undefined,
        diet: undefined,
        intolerance: undefined,
        fillIngredients: false,
        addRecipeInformation: false,
        AmountOfResults: 5,
        sort: '',
      },
      recipes: [],
      options: {
        cuisine: ["", "African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"],
        diet: ["", "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"],
        intolerance: ["", "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"],
        AmountOfResults: [5, 10, 15],
      },
      lastSearchUrl: '',
      noRecipesFound: false,
    };
  },
  mounted() {
    if (this.$root.store.username) {
      // this.$root.store.last_search(this.lastSearchUrl);
      const myDataFromLastSearch = localStorage.getItem('search_url_');
      this.lastSearchUrl = myDataFromLastSearch;
    } else {
      this.lastSearchUrl = '';
      this.$root.store.search_url_ = '';
    }
  },
  computed: {
    sortOptions() {
      return [
        { label: 'Popularity', value: 'popularity' },
        { label: 'Time', value: 'time' },
      ];
    },
    recipeLines() {
      const recipesPerLine = 3;
      const lines = [];
      let currentLine = [];

      // Iterate over the recipes and split them into lines
      this.recipes.forEach((recipe, index) => {
        currentLine.push(recipe);

        // Check if the current line is full or if it's the last recipe
        if (currentLine.length === recipesPerLine || index === this.recipes.length - 1) {
          lines.push(currentLine);
          currentLine = [];
        }
      });

      return lines;
    },
  },
  methods: {
    async getURLElement() {
      let searchUrl = '';

      if (this.formData.query !== undefined && this.formData.query !== '') {
        searchUrl += 'query=' + this.formData.query;
      }
      if (this.formData.AmountOfResults !== '') {
        searchUrl += ' AmountOfResults=' + this.formData.AmountOfResults;
      }
      if (this.formData.cuisine !== undefined && this.formData.cuisine !== '') {
        searchUrl += ' cuisine=' + this.formData.cuisine;
      }
      if (this.formData.diet !== undefined && this.formData.diet !== '') {
        searchUrl += ' diet=' + this.formData.diet;
      }
      if (this.formData.intolerance !== undefined && this.formData.intolerance !== '') {
        searchUrl += ' intolerance=' + this.formData.intolerance;
      }
      if (this.formData.sort !== '') {
        searchUrl += ' sort=' + this.formData.sort;
      }

      return searchUrl;
    },
    async Search() {
      try {
        this.recipes = [];
        const response = await this.axios.post(
          this.$root.store.server_domain + '/recipes/search',
          {
            query: this.formData.query,
            number: this.formData.AmountOfResults,
            cuisine: this.formData.cuisine,
            diet: this.formData.diet,
            intolerance: this.formData.intolerance,
            fillIngredients: this.formData.fillIngredients,
            addRecipeInformation: this.formData.addRecipeInformation,
            sort: this.formData.sort,
          },
          { withCredentials: true }
        );

        if (response.data.length === 0){
          this.noRecipesFound = true;
        }
        else{
          this.recipes.push(...response.data);
          this.noRecipesFound = false;
        }

        this.lastSearchUrl = await this.getURLElement();

        if (this.$root.store.username) {
          this.$root.store.last_search(this.lastSearchUrl);
        } else {
          this.lastSearchUrl = '';
          this.$root.store.search_url_ = '';
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  padding: 20px;
  transition: transform 0.3s ease;
}

.container.clicked {
  transform: translateY(50px);
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

.search-form {
  margin-bottom: 20px;
}

.search-form .form-group {
  margin-bottom: 10px;
}

.search-form .label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  display: block;
  overflow-wrap: break-word; /* Added property */
}

.search-form .form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid rgb(66, 66, 194);
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  height: 40px; /* Increased height */
}

.search-form .select-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  height: 40px; /* Increased height */
}

.search-form label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  overflow-wrap: break-word; /* Added property */
}

.search-form .select-control option {
  color: #333;
}

.search-form .search-field {
  margin-bottom: 10px;
}

.search-form .btn-primary {
  display: block;
  margin: 0 auto;
  padding: 12px 40px;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-form .btn-primary:hover {
  background-color: #45a049;
}

/* Additional styles */

.search-form {
  background-color: rgba(240, 208, 208, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.search-form .title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
}

.search-form .form-group {
  display: flex;
  flex-direction: column;
}

.search-form .form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  height: 45px;
}

.search-form .btn-primary {
  margin-top: 20px;
  width: 100%;
}

.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.grid .card {
  width: 250px;
  margin: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.grid .card:hover {
  transform: scale(1.05);
}

.grid .card img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .form-group {
    width: 100%;
    margin: 10px 0;
  }

  .form-control {
    width: 100%;
  }
}

.no-recipes-message {
  text-align: center;
  margin-top: 20px;
}

.message-text {
  font-size: 35px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 10px;
}

.message-description {
  font-size: 20px;
  color: #720808;
}

.search-url {
  text-align: center;
  margin-bottom: 20px;
  border-radius: 20%;
  border: 2px solid rgb(92, 52, 1);
  padding: 10px;
  color: rgb(238, 163, 65);
  font-weight: bold;
  font-size: 18px;
  background-color: #ccc;
}
</style>
