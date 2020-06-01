'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
require ('mongoose-type-email');

/*need to add length limitations to all strings
================================================*/

var UserSchema = new Schema({
    name: {
        type: String, 
        required: 'Enter a username',
        unique: true,
        //required: 'A username is required'
    },
    email: {
        type: String, 
        required: 'Enter your email address',
        unique: true,
        //required: 'An email is required'
    },
    password: {
        type: String, 
        required: 'Enter password'
        //required: 'Enter a new password'
    },
    isAdmin: {
        type: Boolean
    },
    about: {
        type: String 
    },
    userPhoto: {
        type: String 
    }

},
{collection : 'users'} 
);

module.exports = mongoose.model('User', UserSchema);