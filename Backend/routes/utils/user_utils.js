const DButils = require("./DButils");

// Add recipes to favorite table in DB
async function markAsFavorite(user_id, recipe_id){
    // await DButils.execQuery(`REPLACE INTO FavoriteRecipes (user_id, recipe_id) VALUES ('${user_id}',${recipe_id})`);
    await DButils.execQuery("REPLACE INTO FavoriteRecipes (user_id, recipe_id) VALUES (?, ?)", [user_id, recipe_id]); // prepared statement (better against SQL injections)
}

// Get recipes favorite table in DB
async function getFavoriteRecipes(user_id){
    // const recipes_id = await DButils.execQuery(`SELECT recipe_id FROM FavoriteRecipes WHERE user_id='${user_id}'`);
    const recipes_id = await DButils.execQuery("SELECT recipe_id FROM FavoriteRecipes WHERE user_id = ?", [user_id]); // prepared statement (better against SQL injections)
    return recipes_id;
}

// Get recipes favorite table in DB for specipic user from users table
async function checkFavoriteRecipe(user_id, recipe_id) {
    const viewed_recipes = await DButils.execQuery("SELECT recipe_id FROM FavoriteRecipes WHERE user_id=? AND recipe_id = ?", [user_id, recipe_id]); // prepared statement (better against SQL injections)
    return viewed_recipes;
}

// Add recipes to view table in DB
async function markAsViewed(user_id, recipe_id) {
    // await DButils.execQuery(`REPLACE INTO viewed_recipes (user_id, recipe_id, date) VALUES (${user_id}, ${recipe_id}, NOW())`);
    await DButils.execQuery("REPLACE INTO viewed_recipes (user_id, recipe_id, date) VALUES (?, ?, NOW())", [user_id, recipe_id]); // prepared statement (better against SQL injections)
}

// Get view recipes from view table in DB
async function getViewedRecipes(user_id) {
    // const viewed_recipes = await DButils.execQuery(`SELECT recipe_id FROM viewed_recipes WHERE user_id='${user_id}'`);
    const viewed_recipes = await DButils.execQuery("SELECT recipe_id FROM viewed_recipes WHERE user_id=?", [user_id]); // prepared statement (better against SQL injections)
    return viewed_recipes;

}

// Get view recipes from view table in DB for specipc user from users table
async function checkViewedRecipe(user_id, recipe_id) {
    const viewed_recipes = await DButils.execQuery("SELECT recipe_id FROM viewed_recipes WHERE user_id=? AND recipe_id = ?", [user_id, recipe_id]); // prepared statement (better against SQL injections)
    return viewed_recipes;
}

// Get last 3 view recipes from view table in DB for specipc user from users table
async function getLastViewedRecipes(user_id, number) {
    // const last_viewed_recipes = await DButils.execQuery(`SELECT recipe_id FROM viewed_recipes WHERE user_id = ${user_id} ORDER BY date DESC LIMIT ${number}`);
    const last_viewed_recipes = await DButils.execQuery("SELECT recipe_id FROM viewed_recipes WHERE user_id = ? ORDER BY date DESC LIMIT ?", [user_id, number]); // prepared statement (better against SQL injections)
    return last_viewed_recipes;
}

// This function check if family exists. If not, get all the recepie's user from DB else make join with 2 tables.
async function getMyRecipes(user_id, family = false) {
    let query_select_my_recipes;
    let query_params = [user_id]; // Initialize the query parameters with the user_id

    if (family) {
        query_select_my_recipes = `
            SELECT *, ? AS isFamily
            FROM (SELECT * FROM recipes WHERE user_id = ?) a
            LEFT JOIN family_recipe b ON a.recipes_id = b.recipes_id
            WHERE b.recipes_id IS NOT NULL
        `;
        query_params.unshift(true); // Prepend `true` to the query_params array
    } else {
        query_select_my_recipes = `
            SELECT *, ? AS isFamily
            FROM recipes
            WHERE user_id = ?
        `;
        query_params.unshift(false); // Prepend `false` to the query_params array
    }

    return recipes = await DButils.execQuery(query_select_my_recipes, query_params);
}


// This function check if family exists. If not, get all the recepie's user from DB else make join with 2 tables.
async function extractMyRecipes(user_id, recipe_id, family = false) {
    let query_select_my_recipes;
    let query_params = [user_id, recipe_id]; // Initialize the query parameters with user_id and recipe_id

    if (family) {
        query_select_my_recipes = `
            SELECT *, ? AS isFamily 
            FROM (SELECT * FROM recipes WHERE user_id = ?) a
            LEFT JOIN family_recipe b ON a.recipes_id = b.recipes_id
            WHERE b.recipes_id = ?
        `;
        query_params.unshift(true); // Prepend `true` to the query_params array
    } else {
        query_select_my_recipes = `
            SELECT *, ? AS isFamily 
            FROM recipes 
            WHERE user_id = ? AND recipes_id = ?
        `;
        query_params.unshift(false); // Prepend `false` to the query_params array
    }

    return recipes = await DButils.execQuery(query_select_my_recipes, query_params);
}

/*
    This function check if the recipe exists in the LikeRecipes table.
*/
async function markAsLike(user_id, recipe) {
    const recipe_id = recipe.id;
  
    var isRecipesExists = await DButils.execQuery("SELECT popularity FROM LikeRecipes WHERE user_id = ? AND recipe_id = ?", [user_id, recipe_id]);

    // let isRecipesExists = await getLikeRecipes(recipe_id);
    console.log(isRecipesExists);
  
    if (isRecipesExists.length === 0) {
        const popularity = recipe.popularity || 0;
        console.log("before: "+popularity);
        await DButils.execQuery("INSERT INTO LikeRecipes (recipe_id, user_id, popularity) VALUES (?, ?, ?)", [recipe_id, user_id, popularity]);
    } else {
        popularity = isRecipesExists[0]["popularity"]
        popularity += 1;
        console.log("After: "+popularity);
        await DButils.execQuery("UPDATE LikeRecipes SET popularity = ? WHERE recipe_id = ?", [popularity, recipe_id]);
    }
  }
  
/*
    This function get the popularity of the recipe from the LikeRecipes table.
*/
async function getLikeRecipes(user_id, recipe_id){
    const popularity = await DButils.execQuery("SELECT popularity FROM LikeRecipes WHERE user_id=? AND recipe_id = ? ", [user_id, recipe_id]); // prepared statement (better against SQL injections)
    // console.log(popularity["popularity"]);
    // retPopularity = popularity["popularity"];
    //console.log(retPopularity);
    return popularity;
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsViewed = markAsViewed;
exports.getViewedRecipes = getViewedRecipes;
exports.getLastViewedRecipes = getLastViewedRecipes;
exports.getMyRecipes = getMyRecipes;
exports.markAsLike = markAsLike;
exports.getLikeRecipes = getLikeRecipes;
exports.extractMyRecipes = extractMyRecipes;
exports.checkViewedRecipe = checkViewedRecipe;
exports.checkFavoriteRecipe = checkFavoriteRecipe;