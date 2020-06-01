
require('dotenv').config({path:__dirname+'/./../../.env'})
const Sequelize = require('sequelize');
const UserModel = require('../models/user');
const RecipeModel = require('../models/recipe');
const CategoryModel = require('../models/category');
const IngredientModel = require('../models/ingredient');
const RecipeCategoryModel = require('../models/recipeCategory');
const RecipeIngredientModel = require('../models/recipeIngredient');

console.log(process.env.DB_USERNAME);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        logging: console.log,
        dialect: 'mysql',
        host: process.env.HOST,
    }
);

//Create Models
const User = UserModel(sequelize);
const Recipe = RecipeModel(sequelize);
const Category = CategoryModel(sequelize);
const Ingredient = IngredientModel(sequelize);
const RecipeCategory = RecipeCategoryModel(sequelize);
const RecipeIngredient = RecipeIngredientModel(sequelize);

User.hasMany(Recipe);
Recipe.hasMany(Ingredient);
Recipe.hasMany(Category);
Recipe.belongsTo(User);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {
    Sequelize,
    sequelize,
    Recipe,
    User,
    Category,
    Ingredient,
    RecipeCategory,
    RecipeIngredient
};