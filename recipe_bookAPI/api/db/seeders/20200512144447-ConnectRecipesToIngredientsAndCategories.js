'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const recipes = await queryInterface.sequelize.query(
      `SELECT id FROM Recipes`
    );
    const recipesRow = recipes[0];

    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM Categories`
    )
    const categoriesRow = categories[0];

    const ingredients = await queryInterface.sequelize.query(
      `SELECT id FROM Ingredients`
    )
    const ingredientsRow = ingredients[0];

    await queryInterface.bulkInsert('Recipes_Categories', [
      { recipeId: recipesRow[0].id, categoryId: categoriesRow[8].id },
      { recipeId: recipesRow[1].id, categoryId: categoriesRow[8].id },
      { recipeId: recipesRow[2].id, categoryId: categoriesRow[3].id },
      { recipeId: recipesRow[2].id, categoryId: categoriesRow[4].id },
      { recipeId: recipesRow[2].id, categoryId: categoriesRow[8].id },
      { recipeId: recipesRow[3].id, categoryId: categoriesRow[4].id },
      { recipeId: recipesRow[3].id, categoryId: categoriesRow[8].id },
      { recipeId: recipesRow[3].id, categoryId: categoriesRow[15].id },
      { recipeId: recipesRow[3].id, categoryId: categoriesRow[16].id }
    ], {});

    await queryInterface.bulkInsert('Recipes_Ingredients', [
      { recipeId: recipesRow[0].id, ingredientId: ingredientsRow[4].id },
      { recipeId: recipesRow[0].id, ingredientId: ingredientsRow[6].id },
      { recipeId: recipesRow[0].id, ingredientId: ingredientsRow[11].id },
      { recipeId: recipesRow[0].id, ingredientId: ingredientsRow[12].id },
      { recipeId: recipesRow[0].id, ingredientId: ingredientsRow[17].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[2].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[4].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[6].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[9].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[13].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[14].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[16].id },
      { recipeId: recipesRow[1].id, ingredientId: ingredientsRow[17].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[2].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[3].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[5].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[7].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[9].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[10].id },
      { recipeId: recipesRow[2].id, ingredientId: ingredientsRow[16].id },
      { recipeId: recipesRow[3].id, ingredientId: ingredientsRow[3].id },
      { recipeId: recipesRow[3].id, ingredientId: ingredientsRow[5].id },
      { recipeId: recipesRow[3].id, ingredientId: ingredientsRow[8].id }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipes_Categories', null, {});
  }
};
