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
    SET quantity=$1, total=$2, purchased=true
    WHERE cart_id =$3 
    RETURNING *;`, [quantity, total, cartId])
    console.log(cart)
    return cart
  } catch (error) {
    console.error(error)
  }
}

const userCheckOut = async (cartId, userId) => {
  try {
    console.log(cartId)
    await addBoughtItems(cartId)
    const { rows: [cart] } = await client.query(`
    SELECT * 
    FROM cart 
    WHERE cart_id = $1;`, [cartId]);
    console.log('this is the cart!!!', cart);
    const date = new Date();
    const total = cart.total;

    const { rows: [userCart] } = await client.query(`
    INSERT INTO 
    previous_orders(user_id,cart_id,date,total)
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `, [userId, cartId, date, total])

    console.log(userCart)
    return userCart

  } catch (error) {
    console.error(error)
  }
};

const addBoughtItems = async (cartId) => {
  try {
    const items = await getAllItemsInCart(cartId);
    await Promise.all(items.map(i => inserIntoBoughtItems(i)));
  } catch (error) {
    console.error(error);
  }
};

const inserIntoBoughtItems = async (item) => {
  try {
    const { rows: [product] } = await client.query(`
  INSERT INTO previous_products(name,quantity,cart_id,image)
  VAlUES($1,$2,$3,$4)
  RETURNING *;`, [item.name, item.quantity, item["cart_id"], item.image])
    console.log("INSTER IN TO BROUGHT ITEMS", product)
  } catch (error) {
    console.error(error)
  }
}

const getAllPreviousUserCarts = async (userId) => {
  try {
    const { rows: carts } = await client.query(`
    SELECT * 
    FROM previous_products 
    WHERE user_id=$1`, [userId])

    for (let cart of carts) {
      cart.products = await attachPprodToPorder(cart.id)
    }
    console.log(carts)
    return carts
  } catch (error) {
    console.error(error)
  }
};

const attachPprodToPorder = async (cartId) => {
  try {
    const { rows: products } = await client.query(`
      SELECT * 
      FROM previous_products 
      WHERE cart_id=$1;
      `, [cartId])

    return products
  } catch (error) {
    console.error(error)
  }
}

// const getAllPreviousOrders = async()=>{

// }


module.exports = {
  getAllItemsInCart,
  createCartItem,
  createNewCart,
  getCartBySessionId,
  checkout,
  userCheckOut,
  getAllPreviousUserCarts

};
