'use strict';
require('dotenv').config({path:__dirname+'/./../../.env'})
let db = require('../db/config/db');
let userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


/*  @route POST /register
    @desc Register user
    @access Public
*/
module.exports.register = async function(req, res) {
    const userData = req.body;

  // Simple validation
  if(!userData.name || !userData.email || !userData.password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  let email = userData.email;
  console.log(req.body.email);
  userQueries.findEmail( db, email )
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userData.password, salt, (err, hash) => {
          if(err) throw err;
          userData.password = hash;
          db.User.create(userData)
            .then(user => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      password: user.password,
                      image: user.image,
                      isAdmin: user.isAdmin
                    }
                  });
                }
              )
            });
        })
      })
    })
}
    

/*  @route POST /login
    @desc Authenticate user
    @access Public
*/
module.exports.login = function(req, res) {
  const userData = req.body;

    if (!userData.email || !userData.password) {
        return res.status(400).json({ msg: 'Please enter all the fields' });
    }

    //check if the email exists
    let email = userData.email;
    userQueries.findEmail( db, email )
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User does not exist' });

            //validate password
            bcrypt.compare(userData.password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credidentials' });

                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn : 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user
                            });
                        }    
                    )
                })
    });


}

/*  @route GET /user
    @desc Auth user
    @access Public
*/
module.exports.userAuth = function(req, res) {
    User.findById(req.user.id)
    .select('-password')
    .then( user => res.json(user));
} 


