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
    console.error(error);
  }
};

const getCartBySessionId = async (sessionId) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    SELECT *
    FROM cart 
    WHERE session_id = $1`,
      [sessionId]
    );

    return cart;
  } catch (error) {
    console.error(error);
  }
};

const createNewCart = async (sessionId) => {
  console.log(sessionId);
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    INSERT INTO cart(session_id)
    VALUES($1)
    RETURNING *;`,
      [sessionId]
    );

    return cart;
  } catch (error) {
    console.error(error);
  }
};

const checkout = async (quantity, total, cartId) => {
  try {
    console.log('THIS BE THE CART STUFF', quantity, total, cartId)

    const { rows: [cart] } = await client.query(`
    UPDATE cart
    SET quantity =$1, total =$2, purchased= true
    WHERE cart_id = $3 
    RETURNING *;`, [quantity, total, cartId])
    console.log(cart)
    return cart
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  getAllItemsInCart,
  createCartItem,
  createNewCart,
  getCartBySessionId,
  checkout
};
