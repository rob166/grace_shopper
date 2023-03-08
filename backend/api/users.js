const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const {
  getUserByUsername,
  createUser,
  getUser,
  getUserByEmail,
  updateUser,
} = require('../db');

router.post('/register', async (req, res, next) => {
  const {
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
  } = req.body;

  const is_admin = false;

  if (
    !email ||
    !username ||
    !password ||
    !first_name ||
    !last_name ||
    !address_line1 ||
    !city ||
    !state ||
    !zipcode ||
    !phone
  ) {
    res.send({
      name: 'MissingInfo',
      message: 'Must fill out all fields',
      error: 'error',
    });
    return;
  }

  try {
    //Check to see if username or email already exists
    const _user = await getUserByUsername(username);

    const user_ = await getUserByEmail(email);

    if (user_ || _user) {
      res.send({
        error: 'EmailUsernameExistsError',
        message:
          'Email ' + email + ' or user ' + username + ' is already taken.',
        name: 'EmailUsernameExistsError',
      });
      return;
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
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        SECRET,
        {
          expiresIn: '4w',
        }
      );
      res.send({ message: 'Thank you for signing up', token, user });
    }
  } catch (err) {
    console.log('err', err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.send({
      name: 'MissingUserOrPassword',
      message: 'Must enter username and password',
      error: 'error',
    });
    return;
  }
  try {
    const _user = await getUserByUsername(username);
    //console.log(_user);
    if (_user) {
      const user = await getUser(username, password);
      //console.log(user);
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            username,
          },
          SECRET,
          {
            expiresIn: '4w',
          }
        );
        res.send({ user, message: "you're logged in!", token });
      } else {
        res.send({
          name: 'IncorrectCredentialsError',
          message: 'Password is incorrect',
        });
      }
    } else {
      res.send({
        name: 'IncorrectCredentialsError',
        message: 'Username is incorrect',
      });
    }
  } catch (err) {
    console.log('err', err);
  }
});

router.get('/user', async (req, res, next) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], SECRET);
    const user = await getUserByUsername(decoded.username);

    res.send(user);
  } catch (err) {
    console.log('err', err);
  }
});

router.patch('/user/edit', async (req, res, next) => {
  const {
    email,
    first_name,
    last_name,
    address_line1,
    city,
    state,
    zipcode,
    phone,
  } = req.body;

  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], SECRET);
    const id = decoded.id;
    const updatedUser = await updateUser({
      id,
      email,
      first_name,
      last_name,
      address_line1,
      city,
      state,
      zipcode,
      phone,
    });

    res.send(updatedUser);
  } catch (err) {
    console.log('err', err);
  }
});

module.exports = router;
