const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserByUsername,
      createUser,
      getUser,
} = require("../db");

router.post('/register', async (req, res, next) => {
      //Get parameters needed for the route from the client
      const { email, username, password, first_name, last_name, address_line1, address_line2, city, state, zipcode, phone } = req.body;

      //const is_admin = false;

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

            //If check passed, create user
            const user = await createUser({
                  email,
                  username,
                  password,
                  first_name,
                  last_name,
                  address_line1,
                  address_line2,
                  city, state,
                  zipcode,
                  phone,
                  is_admin,
            });

            //Add token, attaching id and username
            const token = jwt.sign({
                  id: user.user_id,
                  username
            }, process.env.JWT_SECRET, {
                  expiresIn: '4w'
            });
            res.send({ message: "Thank you for signing up", token, user });
      } catch ({ name, message }) {
            next({ name, message })
      }
});

router.post('/login', async (req, res, next) => {
      const { username, password } = req.body;

      if (!username || !password) {
            res.send({
                  name: 'MissingUserOrPassword',
                  message: 'Must enter username and password',
                  error: 'error'
            });
      }
      try {
            //Get the user
            const user = await getUser(username, password);
            //Check to see if user exists
            if (user) {
                  //Add token, attaching id and username
                  const token = jwt.sign({
                        id: user.user_id,
                        username
                  }, process.env.JWT_SECRET, {
                        expiresIn: '4w'
                  });

                  res.send({ user, message: "you're logged in!", token, user });
            } else {
                  next({
                        name: 'IncorrectCredentialsError',
                        message: 'Username or password is incorrect'
                  });
            }

      } catch ({ name, message }) {
            next({ name, message })
      }
});




module.exports = router;