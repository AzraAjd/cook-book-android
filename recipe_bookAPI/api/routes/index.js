var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipe.controllers');
var ctrlUsers = require('../controllers/user.controllers');
var ctrlAuthentication = require('../controllers/authentication.controllers');
const auth = require('../../middleware/auth');

//recipes routes
router
  .route('/recipes')
  .get(ctrlRecipes.recipesGetAll);  

router
  .route('/recipes/search/:name')
  .get(ctrlRecipes.recipesSearch);

router
  .route('/recipes/:recipeId')
  .get(ctrlRecipes.recipesGetOne);

router
  .route('recipes/:recipeId')
  .delete(ctrlRecipes.recipesDeleteOne);

//create new recipe
router 
  .route('/recipes')
  .post(auth, ctrlRecipes.recipesCreate);

//delete
router
  .route('/recipes/:recipeId')
  .delete(auth, ctrlRecipes.recipesDeleteOne);

//patch
router
.route('/recipes/:recipeId')
.patch(auth, ctrlRecipes.recipesPatchOne);

//authentication
router
  .route('/register')
  .post(ctrlAuthentication.register);

router
  .route('/login')
  .post(ctrlAuthentication.login);

/*router
  .route('/user')
  .get(auth, ctrlAuthentication.userAuth)*/

router
  .route('/users')
  .get(ctrlUsers.usersGetAll)

router
  .route('/users/:userId')
  .get(ctrlUsers.usersGetOne)

router
  .route('/users/:userId')
  .delete(ctrlUsers.usersDeleteOne)

router
  .route('/users/:userId')
  .patch(ctrlUsers.usersPatchOne)

module.exports = router;