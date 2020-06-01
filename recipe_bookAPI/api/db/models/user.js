'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    image: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN
  }, {});
  return User;
};
