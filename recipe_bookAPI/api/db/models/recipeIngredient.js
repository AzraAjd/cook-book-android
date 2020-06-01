'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    RecipeId: Sequelize.INTEGER,
    IngredientId: Sequelize.INTEGER
  }, {timestamps: false});
  return RecipeIngredient;
};