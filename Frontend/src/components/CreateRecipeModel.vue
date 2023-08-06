<template>
  <div class="container">
    <div id="background3">
    <!-- left side model -->
    <div class="left">
      <b-form @submit.prevent="createRecipeForm" @reset.prevent="resetForm">
        <!-- Title Recipe -->
        <b-form-group id="input-group-title" label-cols-sm="3" label="Recipe Name:" label-for="title">
          <b-form-input id="title" v-model.trim="$v.form.title.$model" type="text" :state="validateState('title')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.title.required">Name is required</b-form-invalid-feedback>
        </b-form-group>

        <!-- Preperation Time -->
        <b-form-group id="input-group-readyInMinutes" label-cols-sm="3" label="Preparation Time [Min]:" label-for="readyInMinutes">
          <b-form-input id="readyInMinutes" v-model.trim="$v.form.readyInMinutes.$model" type="text" :state="validateState('readyInMinutes')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">Preparation time is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.integer">Preparation time must be a number</b-form-invalid-feedback>
        </b-form-group>

        <!-- Serving Amount -->
        <b-form-group id="input-group-servings" label-cols-sm="3" label="Serving amount:" label-for="servings">
          <b-form-input id="servings" v-model.trim="$v.form.servings.$model" type="text" :state="validateState('servings')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.servings.required">Serving amount is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.servings.integer">Serving amount must be a number</b-form-invalid-feedback>
        </b-form-group>

        <!-- Gluten -->
        <b-form-group id="input-group-glutenFree" label-cols-sm="3" label="Gluten free:" label-for="glutenFree">
          <b-form-select id="glutenFree" v-model.trim="$v.form.glutenFree.$model" :options="[false, true]" :state="validateState('glutenFree')"></b-form-select>
          <small v-if="$v.form.glutenFree.$model" style="color: rgb(201, 98, 98);">Please make sure your recipe is indeed gluten-free</small>
        </b-form-group>

        <!-- Vegetarian -->
        <b-form-group id="input-group-vegetarian" label-cols-sm="3" label="Vegetarian:" label-for="vegetarian">
          <b-form-select id="vegetarian" v-model.trim="$v.form.vegetarian.$model" :options="[false, true]" :state="validateState('vegetarian')"></b-form-select>
          <small v-if="$v.form.vegetarian.$model" style="color: rgb(201, 98, 98);">Please make sure your recipe is indeed vegetarian</small>
        </b-form-group>

        <!-- Vegan -->
        <b-form-group id="input-group-vegan" label-cols-sm="3" label="Vegan:" label-for="vegan">
          <b-form-select id="vegan" v-model.trim="$v.form.vegan.$model" :options="[false, true]" :state="validateState('vegan')"></b-form-select>
          <small v-if="$v.form.vegan.$model" style="color: rgb(201, 98, 98);">Please make sure your recipe is indeed vegan</small>
        </b-form-group>

      <!-- Instructions -->
      <b-form-group id="input-group-instructions" label-cols-sm="3" label="Instructions:" label-for="instructions">
        <b-form-textarea id="instructions" v-model.trim="$v.form.instructions.$model" placeholder="Recipe Instructions" rows="3" :state="validateState('instructions')"></b-form-textarea>
      </b-form-group>

        <!-- Ingredients -->
        <b-form-group id="input-group-ingredients" label-cols-sm="3" label="Ingredients:" label-for="ingredients">
          <div style="display: inline-flex;">
            <b-form-input placeholder="ingredient name" id="ingredient-name" v-model.trim="ingredientName" :state="validateState('ingredientName')"></b-form-input>
            <b-form-input placeholder="ingredient amount" id="ingredient-amount" v-model.trim="ingredientAmount" :state="validateState('ingredientAmount')"></b-form-input>
            <b-button v-b-tooltip.hover.top="'Your ingredients successfully added to the list!'" class="mt-2" variant="primary" small @click="insertIngredient">➕ Ingredient</b-button>
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary" style="width: 250px;" class="ml-5 w-75">➕ Recipe</b-button>
        <b-button type="reset" variant="danger" @click="resetForm">Reset</b-button>
      </b-form>
    </div>

    <!-- right side model -->
    <div class="right">
        
        <!-- Ingredients list -->
        <div class="ingredients">
            <h5>Added ingredients:</h5>
            <ul v-if="form.ingredients.length > 0">
                <li class="list-group-item borderless" v-for="(ingredient, index) in form.ingredients" :key="index">
                <div class="ingredient">
                    <img :src="getIngredientImage(ingredient)" class="ingredient-image" />
                    <span class="ingredient-name">{{ ingredient.name }}</span>
                </div>
                <b-button @click="removeIngredient(index)" size="sm" class="ml-2" variant="outline-light">❌</b-button>
                </li>
            </ul>
            <small v-else>You haven't added any ingredients yet</small>
        </div>

      <!-- Photo -->
      <div class="photo" style="display: inline-flex; align-items: center;">
        <h3 style="margin-right: 10px;">Photo <span style="font-size: 14px; color: #ff9900;">[hyperlink]</span></h3>
        <input v-model.trim="$v.form.image.$model" placeholder="https://www.exampleImage.com" style="border: 1px solid #ccc; border-radius: 4px; padding: 6px 10px;">
      </div>
      
      <br><br>

        <!-- Family -->
        <!-- CheckBox if true show the another labels -->
        <div class="family" style="align-items: center;">
            <h5 style="margin-right: 10px;">Family Recipe</h5>
            <b-checkbox v-model.trim="form.familyRecipe" switch></b-checkbox>

            <!-- Creator By -->
            <div class="creator" v-if="form.familyRecipe" style="display: inline-flex; align-items: center;">
                <b-form-group id="input-group-creatorBy" label-cols-sm="3" label="Creator By:" label-for="creatorBy">
                <b-form-input id="creatorBy" v-model.trim="form.creatorBy" type="text"></b-form-input>
                </b-form-group>
            </div>

            <!-- Usual Time -->
            <div class="usualTime" v-if="form.familyRecipe" style="display: inline-flex; align-items: center;">
                <b-form-group id="input-group-usualTime" label-cols-sm="3" label="Usual Time:" label-for="usualTime">
                <b-form-input id="usualTime" v-model.trim="form.usualTime" type="text"></b-form-input>
                </b-form-group>
            </div>
        </div>
      </div>

    <!-- end right div -->
    </div>

    <!-- Success Message -->
    <!-- <div v-if="showSuccessMessage" class="success-message">
      {{ successMessage }}
    </div> -->

  </div>
</template>

<script>
import { required, integer } from "vuelidate/lib/validators";
//   import { Tooltip } from 'bootstrap-vue';
export default {
  // directives: {
  //   'b-tooltip': Tooltip,
  // },
  data() {
    return {
      form: {
        id: null,
        title: "",
        readyInMinutes: "",
        servings: "",
        glutenFree: false,
        vegetarian: false,
        vegan: false,
        instructions: "",
        ingredients: [],
        image: "",

        popularity: 0,
        isWatched: null,
        inFavorites: null,

        familyRecipe: false,
        creatorBy: "",
        usualTime: "",

        submitError: undefined,
      },
      ingredientName: "",
      ingredientAmount: "",
      submitted: false,
      successMessage: "",
      showSuccessMessage: false,
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      readyInMinutes: {
        required,
        integer,
      },
      servings: {
        required,
        integer,
      },
      glutenFree: {},
      vegetarian: {},
      vegan: {},
      instructions: {},
      ingredientName: {},
      ingredientAmount: {},
      ingredients: {},
      image: {},
      familyRecipe: {},
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async createRecipeForm() {
      this.pressed = true;

      // Validate form data
      if (
        this.form.title === "" ||
        this.form.readyInMinutes === "" ||
        this.form.vegetarian === "" ||
        this.form.vegan === "" ||
        this.form.glutenFree === "" ||
        this.form.image === "" ||
        this.form.servings === "" ||
        this.form.instructions === "" ||
        this.form.ingredients === ""
      ) {
        // Show popup message or take any necessary action
        alert("Please fill in all the required fields.");
      } else {
        if (this.form.familyRecipe === false) {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/recipes/create",
            {
              "title": this.form.title,
              "readyInMinutes": this.form.readyInMinutes,
              "vegetarian": this.form.vegetarian,
              "vegan": this.form.vegan,
              "glutenFree": this.form.glutenFree,
              "image": this.form.image,
              "servings": this.form.servings,
              "instructions": this.form.instructions,
              "ingredients": this.form.ingredients
            },
            { withCredentials: true },
          );
        } else {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/recipes/familyRecipes",
            {
              "title": this.form.title,
              "readyInMinutes": this.form.readyInMinutes,
              "vegetarian": this.form.vegetarian,
              "vegan": this.form.vegan,
              "glutenFree": this.form.glutenFree,
              "image": this.form.image,
              "servings": this.form.servings,
              "instructions": this.form.instructions,
              "ingredients": this.form.ingredients,
              "creatorBy": this.form.creatorBy,
              "usualTime": this.form.usualTime,
            },
            { withCredentials: true },
          );
        }
        alert("Recipe created successfully!");
        this.$refs["recipe-modal"].hide();
      }

      // Set success message and show success message div
      this.successMessage = "Recipe created successfully!";
      this.showSuccessMessage = true;

    },

    resetForm() {
      this.form = {
        id: null,
        title: "",
        readyInMinutes: "",
        servings: "",
        glutenFree: false,
        vegetarian: false,
        vegan: false,
        instructions: "",
        ingredients: [],
        image: "",

        popularity: 0,
        isWatched: null,
        inFavorites: null,

        familyRecipe: false,
        creatorBy: "",

        submitError: undefined,
      };
      this.ingredientName = "";
      this.ingredientAmount = "";
      this.submitted = false;
    },


    insertIngredient() {
      if (this.ingredientName === "" || this.ingredientAmount === "") return;
      const newIngredient = {
        id: 1,
        image: 1,
        name: `${this.ingredientName}`,
        amount: `${this.ingredientAmount}`,
      };
      this.form.ingredients.push(newIngredient);
      this.ingredientName = "";
      this.ingredientAmount = "";
    },
    removeIngredient(index) {
      this.form.ingredients.splice(index, 1);
    },
    getIngredientImage(ingredient) {
      return `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
    },

    closeSuccessMessage() {
      // Reset success message and hide success message div
      this.successMessage = "";
      this.showSuccessMessage = false;
    },

  },
};
</script>


<style scoped>
/* Add your custom CSS styles here */

.recipe-form {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin: 20px;
}

.left {
width: 60%;
float: left;
}

.right {
width: 40%;
float: right;
}

.ingredient {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.ingredient-image {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.ingredient-name {
  font-weight: bold;
}

.photo {
margin-top: 20px;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  margin-bottom: 10px;
}

#background3 {
  background-image: url(../assets/modelImage.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

}
</style>