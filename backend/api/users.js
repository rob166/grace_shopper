const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserByUsername,
      createUser, 
} = require("../db");

router.post('/register', async (req, res, next) => {
      //Get parameters needed for the route from the client
      const { username, password } = req.body;

      try {

            //Check to see if user exists
            const _user = await getUserByUsername(username);

            if (_user) {
                  res.send({
                        error: 'UserExistsError',
                        message: 'User ' + username + ' is already taken.',
                        name: 'UserExistsError'
                  });
            }
            //Check to see if password too short
            if (password.length < 8) {
                  res.send({
                        error: 'PasswordTooShortError',
                        message: 'Password Too Short!',
                        name: 'Password Too Short!'
                  });
            }
            //If checks passed, create user
            const user = await createUser({ username, password });
            //Add token, attaching id and username
            const token = jwt.sign({
                  id: user.id,
                  username
            }, process.env.JWT_SECRET, {
                  expiresIn: '1w'
            });

            res.send({ message: "thank you for signing up", token, user });

      } catch ({ name, message }) {
            next({ name, message })
      }
});






module.exports = router;