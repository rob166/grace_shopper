const client = require('./client');

const createProduct = async ({ name, description, price, image, category }) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT
          INTO
          products(name, description, price, image, category)
          VALUES($1,$2,$3,$4,$5)  
          RETURNING *;`,
      [name, description, price, image, category]
    );
    return product;
  } catch (error) {
    console.warn(error);
  }
};

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`
                  SELECT * 
                  FROM products;`);

    return products;
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (id) => {
  try {
    // const { rows: [product] } = await client.query(`
    // SELECT *
    // FROM products
    // WHERE product_id = $1`, [id]);
    const product = await getAllProducts();
    const productWeGetting = product.filter((p) => p.product_id == id);
    console.log('THIS THE PRODUCT WE GETTING', productWeGetting);
    return productWeGetting[0];
  } catch (error) {
    console.error(error);
  }
};

const addProductToCart = async (cartId, quantity, productId) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET cart_id = $1, quantity=$2
            WHERE product_id=$3
            RETURNING *;`,
      [cartId, quantity, productId]
    );

    return product;
  } catch (error) {
    console.error(error);
  }
};

const removeProductsFromCart = async () => {
  try {
    const {
      rows: products,
    } = await client.query(
      `UPDATE products
      SET quantity = 0
      RETURNING *;`
      );
    return products ;
  } catch (error) {
    console.error(error);
  }
};

const getAllItemsInCart = async (cartId) => {
  try {
    const { rows: cart } = await client.query(
      `
      SELECT * 
      FROM products 
      WHERE cart_id=$1;
      `,
      [cartId]
    );

    return cart;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  addProductToCart,
  getAllItemsInCart,
  removeProductsFromCart,
};
