'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
  }, {timestamps: false});
  return Ingredient;
};