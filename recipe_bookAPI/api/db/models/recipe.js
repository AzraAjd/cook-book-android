'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Recipe = sequelize.define('Recipe', {
    name: Sequelize.STRING,
    img_url: Sequelize.STRING,
    description: Sequelize.STRING,
    directions: Sequelize.STRING,
    prep_time: Sequelize.INTEGER,
    authorId: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
  }, {
    timestamps: true
  });
  return Recipe;
};
