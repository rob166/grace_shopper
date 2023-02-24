const client = require("./client");
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;


const createProduct = async ({ name, description, price, image, cart_id }) => {
      try {
            const { rows: [product] } = await client.query(`
          INSERT
          INTO
          product(name, description, price, image, cart_id)
          VALUES($1,$2,$3,$4,$5)  
          RETURNING *;`, [name, description, price, image, cart_id]);
            return product;
      }
      catch (error) {
            console.warn(error)
      }
};

const getAllProducts = async () => {
      try {
            const { rows: products } = await client.query(`
            SELECT *
            FROM products
            `);

            return products;
      }
      catch (error) {
            throw new Error("Cannot get all products")
      }
};

module.exports = {
      createProduct,
      getAllProducts,
}