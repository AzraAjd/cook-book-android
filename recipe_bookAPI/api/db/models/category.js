'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    name: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
  }, {timestamps: false});
  return Category;
};
