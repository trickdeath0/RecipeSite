import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/myFavorite",
    name: "myFavorite",
    component: () => import("./pages/MyFavoritePage"),
  },
  {
    path: "/myRecipe",
    name: "myRecipe",
    component: () => import("./pages/MyRecipePage"),
  },
  {
    path: "/myRecipe/:recipeId",
    name: "myRecipeView",
    component: () => import("./pages/MyRecipeViewPage"),
  },
  {
    path: "/myFamily",
    name: "myFamily",
    component: () => import("./pages/MyFamilyPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
