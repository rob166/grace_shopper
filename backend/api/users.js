const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.JWT_SECRET;
const { getUserByUsername,
      createUser,
      getUser,
      getUserByEmail,
} = require("../db");

router.post('/register', async (req, res, next) => {
      const { email, username, password, first_name, last_name, address_line1, city, state, zipcode, phone } = req.body;

      const is_admin = false;

      if (!email || !username || !password || !first_name || !last_name || !address_line1 || !city || !state || !zipcode || !phone) {
            res.send({
                  name: 'MissingInfo',
                  message: 'Must fill out all fields',
                  error: 'error'
            });
      }

      try {
            //Check to see if username or email already exists 
            const _user = await getUserByUsername(username);

            const user_ = await getUserByEmail(email);

            if (user_ || _user) {
                  res.send({
                        error: 'EmailUsernameExistsError',
                        message: 'Email ' + email + ' or user ' + username + ' is already taken.',
                        name: 'EmailUsernameExistsError'
                  });
            } else {
                  //If check passed, create user
                  const user = await createUser({
                        email,
                        username,
                        password,
                        first_name,
                        last_name,
                        address_line1,
                        city,
                        state,
                        zipcode,
                        phone,
                        is_admin,
                  });
                  //Add token, attaching id and username
                  const token = jwt.sign({
                        id: user.id,
                        username
                  }, SECRET, {
                        expiresIn: '4w'
                  });
                  res.send({ message: "Thank you for signing up", token, user });
            }
      } catch (err) {
            console.log('err', err)
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
            //Check if user exists
            const _user = await getUserByUsername(username);
            if (!_user) {
                  res.send({
                        name: 'IncorrectCredentialsError',
                        message: 'Username is incorrect'
                  });
            }
            //If user exists check if password correct, if so login
            const user = await getUser(username, password);
            if (!user) {
                  res.send({
                        name: 'IncorrectCredentialsError',
                        message: 'Password is incorrect'
                  });
            } else {
                  const token = jwt.sign({
                        id: user.id,
                        username
                  }, SECRET, {
                        expiresIn: '4w'
                  });

                  res.send({ user, message: "you're logged in!", token });
            }
      } catch (err) {
            console.log('err', err)
      }
});




module.exports = router;