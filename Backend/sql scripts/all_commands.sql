-- SQLBook: Code
# Create DATABASE
CREATE DATABASE mydb
    DEFAULT CHARACTER SET = 'utf8mb4';

CREATE TABLE `mydb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL UNIQUE,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `country` VARCHAR(60) NOT NULL,
  `password` VARCHAR(120) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `profilePic` BLOB,
  PRIMARY KEY (`user_id`, `username`));


CREATE TABLE `mydb`.`FavoriteRecipes` (
  `user_id` INT NOT NULL,
  -- `username` VARCHAR(50) NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`),
  CONSTRAINT `favorites_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


  CREATE TABLE `mydb`.`viewed_recipes` (
  `user_id` INT NOT NULL,
  -- `username` VARCHAR(50) NOT NULL,
  `recipe_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`),
  CONSTRAINT `views_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


  CREATE TABLE `mydb`.`recipes` (
  `recipes_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  -- `username` VARCHAR(50) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `ready_in_minutes` INT NOT NULL,
  `vegetarian` TINYINT NOT NULL,
  `vegan` TINYINT NOT NULL,
  `gluten_free` TINYINT NOT NULL,
  `servings` INT NOT NULL,
  `instructions` TEXT NOT NULL,
  `ingredients` JSON NOT NULL,
  `image` TEXT NULL,
  PRIMARY KEY (`recipes_id`),
  CONSTRAINT `recipes_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  
CREATE TABLE `mydb`.`family_recipe` (
  `recipes_id` INT NOT NULL,
  `creatorBy` VARCHAR(100) NULL,
  `usualTime` VARCHAR(100) NULL,
  PRIMARY KEY (`recipes_id`),
  CONSTRAINT `recipe_recipe_id`
    FOREIGN KEY (`recipes_id`)
    REFERENCES `mydb`.`recipes` (`recipes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `mydb`.`LikeRecipes` (
  `recipe_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `popularity` INT NOT NULL,
  PRIMARY KEY (`recipe_id`)
);




# Bouns...
CREATE TABLE `mydb`.`analyzedInstructions` (
  `recipes_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `ready_in_minutes` INT NOT NULL,
  `vegetarian` TINYINT NOT NULL,
  `vegan` TINYINT NOT NULL,
  `gluten_free` TINYINT NOT NULL,
  `servings` INT NOT NULL,
  `steps` TEXT NOT NULL,
  `image` TEXT NULL,
  PRIMARY KEY (`recipes_id`),
  CONSTRAINT `recipes_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);





-- Insert to family recipes
#1/
INSERT INTO `mydb`.`recipes` (`user_id`, `title`, `ready_in_minutes`, `vegetarian`, `vegan`, `gluten_free`, `servings`, `instructions`, `ingredients`, `image`)
VALUES (2, 'Creamy Rigatoni Florentine', 50, 0, 0, 0, 8, '<ol> <li>Bring a large pot of lightly salted water to a boil. Cook rigatoni in the boiling water, stirring occasionally, until tender but firm to the bite, 8 to 10 minutes. Drain.</li> <li>While the pasta is cooking, heat oil in a large skillet over medium-high heat. Add chicken and sauté until no longer pink in the center, about 10 minutes; transfer to a plate.</li> <li>Add mushrooms to the skillet and sauté until tender, 5 to 10 minutes. Add garlic; sauté until fragrant and golden, 1 to 2 minutes.</li> <li>Stir spaghetti sauce, half-and-half, and Italian seasoning into the skillet. Reduce the heat to medium and cook, stirring occasionally, until sauce thickens, 10 to 15 minutes.</li> <li>Return cooked chicken to the skillet, then add spinach. Cook until spinach is wilted, about 5 minutes.</li> <li>Add cooked pasta and mozzarella cheese to the chicken and sauce; stir until melted. Garnish with Parmesan cheese and fresh basil.</li> </ol>', '[ { "id": 1, "name": "1 (16 ounce) package rigatoni pasta" }, { "id": 2, "name": "2 tablespoons olive oil" }, { "id": 3, "name": "2 pounds boneless chicken, cubed" }, { "id": 4, "name": "¼ cup sliced fresh mushrooms, or more to taste" }, { "id": 5, "name": "3 cloves garlic, chopped" }, { "id": 6, "name": "1 (26 ounce) jar spaghetti sauce" }, { "id": 7, "name": "1 pint half-and-half" }, { "id": 8, "name": "1 teaspoon Italian seasoning, or to taste (Optional)" }, { "id": 9, "name": "1 (10 ounce) package fresh spinach, chopped" }, { "id": 10, "name": "1 cup shredded mozzarella cheese (Optional)" }, { "id": 11, "name": "1 tablespoon shredded Parmesan cheese, or more to taste" }, { "id": 12, "name": "8 leaves fresh basil, or to taste" } ]', 'https://i.pinimg.com/originals/de/ca/27/deca273f881ee3f296c7c3782dee3fb2.jpg');
INSERT INTO `mydb`.`family_recipe` (`recipes_id`, `creatorBy`, `usualTime`)
VALUES (LAST_INSERT_ID(), 'Colleen', 'Shavohot');

#2/
INSERT INTO `mydb`.`recipes` (`user_id`, `title`, `ready_in_minutes`, `vegetarian`, `vegan`, `gluten_free`, `servings`, `instructions`, `ingredients`, `image`)
VALUES (1, 'Spaghetti Bolognese', 45, 0, 0, 0, 4, 'Cook the spaghetti according to package instructions. In a separate pan, brown ground beef with onions and garlic. Add tomato sauce, herbs, and simmer for 20 minutes. Serve the sauce over cooked spaghetti.', '{"pasta": "spaghetti", "meat": "ground beef", "sauce": "tomato sauce"}', 'https://example.com/spaghetti_bolognese.jpg');
INSERT INTO `mydb`.`family_recipe` (`recipes_id`, `creatorBy`, `usualTime`)
VALUES (LAST_INSERT_ID(), 'Jane Doe', '1 hour');

#3/
INSERT INTO `mydb`.`recipes` (`user_id`, `title`, `ready_in_minutes`, `vegetarian`, `vegan`, `gluten_free`, `servings`, `instructions`, `ingredients`, `image`)
VALUES (2, 'Grilled Salmon with Lemon Butter Sauce', 20, 1, 0, 1, 2, 'Preheat the grill. Season salmon fillets with salt and pepper. Grill the salmon until cooked through. In a small saucepan, melt butter and add lemon juice. Drizzle the lemon butter sauce over the grilled salmon fillets.', '{"fish": "salmon fillets", "seasonings": "salt, pepper", "sauce": "butter, lemon juice"}', 'https://example.com/grilled_salmon.jpg');
INSERT INTO `mydb`.`family_recipe` (`recipes_id`, `creatorBy`, `usualTime`)
VALUES (LAST_INSERT_ID(), 'John Smith', '30 minutes');

#4/
INSERT INTO `mydb`.`recipes` (`user_id`, `title`, `ready_in_minutes`, `vegetarian`, `vegan`, `gluten_free`, `servings`, `instructions`, `ingredients`, `image`)
VALUES (2, 'Vegetable Stir-Fry', 20, 1, 1, 1, 3, 'Heat oil in a wok or large skillet over high heat. Add chopped vegetables such as bell peppers, broccoli florets, sliced carrots, and snap peas. Stir-fry the vegetables for a few minutes until they are crisp-tender. In a small bowl, whisk together soy sauce, sesame oil, ginger, and garlic. Pour the sauce over the vegetables and toss to coat. Cook for an additional minute or until the sauce thickens. Serve the vegetable stir-fry over steamed rice or noodles.', '{"vegetables": "bell peppers, broccoli florets, carrots, snap peas", "sauce": "soy sauce, sesame oil, ginger, garlic"}', 'https://example.com/vegetable_stir_fry.jpg');
INSERT INTO `mydb`.`family_recipe` (`recipes_id`, `creatorBy`, `usualTime`)
VALUES (LAST_INSERT_ID(), 'Robert Davis', '30 minutes');

#5/
INSERT INTO `mydb`.`recipes` (`user_id`, `title`, `ready_in_minutes`, `vegetarian`, `vegan`, `gluten_free`, `servings`, `instructions`, `ingredients`, `image`)
VALUES (1, 'Chicken Fajitas', 30, 0, 0, 0, 4, 'In a large bowl, combine chicken, bell peppers, onion, olive oil, and seasonings. Toss to coat. Spread the chicken and vegetables on a large baking sheet. Bake for 20 minutes at 400°F. Serve the chicken fajitas with tortillas, salsa, and sour cream.', '{"meat": "chicken breast", "vegetables": "bell peppers, onion", "seasonings": "chili powder, cumin, garlic powder, salt, pepper"}', 'https://example.com/chicken_fajitas.jpg');
INSERT INTO `mydb`.`family_recipe` (`recipes_id`, `creatorBy`, `usualTime`)
VALUES (LAST_INSERT_ID(), 'Jane Doe', '45 minutes');
