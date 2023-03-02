const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const getAllItemsInCart = async (cartId) => {
  try {
    const { rows: cart } = await client.query(
      `
        SELECT * FROM products
        WHERE cart_id=$1;`,
      [cartId]
    );
    return cart;
  } catch (error) {
    console.error(error);
  }
};

// const updateCart = async

const createCartItem = async ({ quantity, total, purchased }) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          INSERT
          INTO
          cart(quantity, total, purchased)
          VALUES($1,$2,$3)  
          RETURNING *;`,
      [quantity, total, purchased]
    );
    return cart;
  } catch (error) {
    console.warn(error);
  }
};

module.exports = {
  getAllItemsInCart,
  createCartItem,
};
