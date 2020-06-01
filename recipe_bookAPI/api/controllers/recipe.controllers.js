'use strict';

let db = require('../db/config/db');
let recipeQueries = require('../db/queries/recipes');


//GET all recipes
module.exports.recipesGetAll = async function (req, res) {
    try{
        const response = await recipeQueries.find(db)
        res.json(response);
    } catch (err) {
        console.log(err)
      }
     
 };


// GET recipe by ID
module.exports.recipesGetOne = function (req, res) {
    const recipeId = req.params.recipeId;
    recipeQueries.find(db, recipeId).then(
        recipe => {
            res.json({ recipe })
        })
        .catch(err => {
            console.log(err);
        })
};

//SEARCH recipe
module.exports.recipesSearch = async function (req, res) {
    try{
        const name = req.params.name;
        const response = await recipeQueries.search(db, name);
        res.json(response);
    } catch (err) {
        console.log(err)
      }

};

//POST recipe
module.exports.recipesCreate = async function (req, res) {
    const recipeData = req.body;
    recipeData.isActive = true;
    console.log(recipeData);


    try {
        const recipe = await db.Recipe.create(recipeData);
        res.status(201)
            .json({ recipe });
    } catch (err) {
        console.log(err);
    }
}

//DELETE recipe
module.exports.recipesDeleteOne = function (req, res) {
    const { id } = req.params;
    console.log("delete controller " + id)
    try {
        recipeQueries.softDelete(db, id)
            .then(() => {
                res.status(202)
                    .end();
            });
    } catch (err) {
        res.status(500)
            .send(`The following error was thrown while trying to soft delte the recipe with id: ${id} from the db: ${err.message}`)
            .end();
    }
};


//PATCH recipe
module.exports.recipesPatchOne = async function (req, res) {
    
    const recipeData = req.body;
    const id = req.params.recipeId;
    try {
        let recipe = await recipeQueries.find(db, id);
        recipe.name = recipeData.name ? recipeData.name : recipe.name;
        recipe.description = recipeData.description ? recipeData.description : recipe.description;
        recipe.directions = recipeData.directions ? recipeData.directions : recipe.directions;
        recipe.img_url = recipeData.img_url ? recipeData.img_url : recipe.img_url;
        recipe.prep_time = recipeData.prep_time ? recipeData.prep_time : recipe.prep_time;
        await recipe.save();
        res.status(202)
            .json({ recipe });
    } catch (err) {
        const errCode = errHandling(err);
        res.status(errCode)
            .send(`The following error was thrown while trying to update the recipe which has id: ${id}: ${err.message}`)
            .end();
    }


};