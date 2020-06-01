'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const RecipeCategory = sequelize.define('RecipeCategory', {
    RecipeId: Sequelize.INTEGER,
    CategoryId: Sequelize.INTEGER
  }, {timestamps: false});
  return RecipeCategory;
};