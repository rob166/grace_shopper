const client = require("./client");
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;



// const updateCart = async 




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
