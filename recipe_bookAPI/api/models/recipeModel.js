'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
    name: {
        type: String,
        //required: 'Enter the name of your recipe'
    },
    img_url: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: {
        type: Array,
        //required: 'Add the ingerdients required to make the dish'
    },
    category: {
        type: Array,
        //required: 'Choose from the list of categories'
    },
    directions: {
        type: String,
        //required: 'Enter the instructions for the dish preparation'
    },
    prepTime: {
        type: Number,
        //required: 'enter the time needed for the dish preparation'
    },
    author: {
        type: Array
    }
},
{collection : 'recipes'} 
);

module.exports = mongoose.model('Recipe', RecipeSchema);