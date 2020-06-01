'use strict';

let db = require('../db/config/db');
let userQueries = require('../db/queries/users');

//GET all users
module.exports.usersGetAll = async function (req, res) {
    try{
        const response = await userQueries.find(db)
        res.json(response);
    } catch (err) {
        console.log(err)
      }
     
 };


// GET users by ID
module.exports.usersGetOne = function (req, res) {
    const userId = req.params.userId;
    userQueries.find(db, userId).then(
        user => {
            res.json({ user })
        })
        .catch(err => {
            console.log(err);
        })
};

//POST user
module.exports.usersCreate = async function (req, res) {
    const userData = req.body;
    userData.isActive = true;
    try {
        const user = await db.User.create(userData);
        res.status(201)
            .json({ user });
    } catch (err) {
        console.log(err);
    }
}

//DELETE user
module.exports.usersDeleteOne = function (req, res) {
    const { id } = req.params;
    try {
        userQueries.softDelete(db, id)
            .then(() => {
                res.status(202)
                    .end();
            });
    } catch (err) {
        res.status(500)
            .send(`The following error was thrown while trying to soft delte the company with id: ${id} from the db: ${err.message}`)
            .end();
    }
};


//PATCH user
module.exports.usersPatchOne = async function (req, res) {
    
    const userData = req.body;
    console.log(userData);
    const id = req.params.userId;
    console.log(id);
    try {
        let user = await userQueries.find(db, id);
        user.name = userData.name ? userData.name : user.name;
        user.email = userData.email ? userData.email : user.email;
        user.image = userData.image ? userData.image : user.image;
        user.password = userData.password ? userData.password : user.password;
        await user.save();
        res.status(202)
            .json({ user });
    } catch (err) {
        const errCode = errHandling(err);
        res.status(errCode)
            .send(`The following error was thrown while trying to update the company record which has id: ${id}: ${err.message}`)
            .end();
    }


};








