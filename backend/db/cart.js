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

const createCartItem = async ({ user_id, quantity, total, purchased }) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          INSERT
          INTO
          cart(quantity, total, purchased)
          VALUES($2,$3,$4)  
          RETURNING *;`,
      [user_id, quantity, total, purchased]
    );
    return cart;
  } catch (error) {
    console.warn(error);
  }
};

const newCart = async(sessionId)=>{
  try{
    const {rows:[cart]} = await client.query(`
    INSERT INTO cart(session_id)
    VALUES($1)
    RETURNING *`,[sessionId])

    return cart
  }catch(error){

  }
}

module.exports = {
  getAllItemsInCart,
  createCartItem,
  newCart
};
