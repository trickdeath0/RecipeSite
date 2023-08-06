var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const user_utils = require("./utils/user_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a 3 random recipes with full details
 */
router.get("/random", async (req, res, next) => {
  try {
    // console.log(req.headers.cookie)
    const random3_recipes = await recipes_utils.getRandomThreeRecipes();
    res.send(random3_recipes);
  } catch (error) {
    next(error);
  }
});


router.post("/search", async (req, res, next) => {
  try {
    let searchQuery = (req.body.query);
    let searchNumber = (req.body.number);
    let searchCuisine = (req.body.cuisine);
    let searchDiet = (req.body.diet);
    let searchIntolerance = (req.body.intolerance);
    let searchSort = (req.body.sort);
    console.log(searchQuery, searchNumber, searchCuisine, searchDiet, searchIntolerance);

    if (searchQuery) {
          const recipes = await recipes_utils.searchRecipes(searchQuery, searchNumber, searchCuisine, searchDiet, searchIntolerance, searchSort);
          res.send(recipes);
        }
    else {
      const emptyRecipes = []
      res.send(emptyRecipes);
    }
  } catch (error) {
    next(error);
  }
})



/**
 * This path create new recipe with full details
 */
router.post("/create", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Must login before" };
    }

    const { title, readyInMinutes, vegetarian, vegan, glutenFree, image, servings, instructions, ingredients} = req.body;
    const defaultImage = "https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900";
    const imageUrl = image || defaultImage;
    if (!title || !readyInMinutes || vegetarian === undefined || vegan === undefined || glutenFree === undefined ||
         !imageUrl || !servings || !instructions || !ingredients) {
      throw { status: 400, message: "Invalid recipe data" };
    }

    let recipe = {
      title: title,
      readyInMinutes: readyInMinutes,
      vegetarian: vegetarian ? 1 : 0,
      vegan: vegan ? 1 : 0,
      glutenFree: glutenFree ? 1 : 0,
      image: imageUrl,
      servings: servings,
      instructions: instructions,
      ingredients: ingredients
    };

    await recipes_utils.addRecipe(user_id, recipe);

    res.status(201).send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path add family recipe to DB
 */
router.post('/familyRecipes', async (req,res,next) => {
  try {
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Must login before" };
    }

    const { title, readyInMinutes, vegetarian, vegan, glutenFree, image, creatorBy, usualTime, servings, instructions, ingredients } = req.body;
    const defaultImage = "https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900";
    const imageUrl = image || defaultImage;
    if (!title || !readyInMinutes || vegetarian === undefined || vegan === undefined || glutenFree === undefined ||
         !imageUrl || !creatorBy || !usualTime || !servings || !instructions || !ingredients) {
      throw { status: 400, message: "Invalid recipe data" };
    }

    let recipe = {
      title: title,
      readyInMinutes: readyInMinutes,
      vegetarian: vegetarian ? 1 : 0,
      vegan: vegan ? 1 : 0,
      glutenFree: glutenFree ? 1 : 0,
      image: imageUrl,
      creatorBy: creatorBy,
      usualTime: usualTime,
      servings: servings,
      instructions: instructions,
      ingredients: ingredients
    };

    await recipes_utils.addRecipe(user_id, recipe);

    res.status(201).send(recipe);
  } catch (error) {
    next(error);
  }
});


/**
 * This path, the user will be shown the preparation steps of the recipe, and the ingredients needed for each recipe
 * Bonus function
 */
router.post("/prepareRecipe", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Must login before" };
    }

    let recipe_id  = (req.body.recipeId)

    if (!recipe_id ) {
      throw { status: 400, message: "Invalid recipe data" };
    }

    let analyzedInstructions = await recipes_utils.getAnalyzedInstructions(recipe_id);
    console.log(analyzedInstructions);
    //let extendedData = await recipes_utils.getExtendedIngredients(analyzedInstructions);

    res.status(201).send(analyzedInstructions);
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    if (user_id) await user_utils.markAsViewed(user_id, req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});






module.exports = router;
