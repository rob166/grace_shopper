<<<<<<< HEAD
const getAllItemsInCart = async (cartId) => {
    try {
        const { rows: cart } = await client.query(`
        SELECT * FROM products
        WHERE cart_id=$1;`, [cartId]);
        return cart
    } catch (error) {
        console.error(error)
    }
};

const updateCart = async 
=======
const client = require("./client");
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;


const createCartItem = async ({ user_id, quantity, total, purchased }) => {
      try {
            const { rows: [cart] } = await client.query(`
          INSERT
          INTO
          cart(user_id, quantity, total, purchased)
          VALUES($1,$2,$3,$4)  
          RETURNING *;`, [user_id, quantity, total, purchased]);
            return cart;
      } catch (error) { console.warn(error) }
}


module.exports = {
      createCartItem
}
>>>>>>> 1da2e8d38dbcd50f7a92cebece3df0a059cb4096
