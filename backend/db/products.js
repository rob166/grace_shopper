const client = require("./client");


const createProduct = async ({ name, description, price, image}) => {
      try {
            const { rows: [product] } = await client.query(`
          INSERT
          INTO
          products(name, description, price, image)
          VALUES($1,$2,$3,$4)  
          RETURNING *;`, [name, description, price, image]);
            return product;
      } catch (error) { console.warn(error) }
}

const getAllProducts = async()=>{
      try{
            const {rows:products} = await client.query(`
                  SELECT * 
                  FROM products;`
                  );

            return products

      }catch(error){
            console.error(error)
      }
};

const getProductById = async(id)=>{
      try{
            const {rows : [product]} = await client.query(`
            SELECT * 
            FROM products
            WHERE product_id = $1`,[id]);
            return product
      }catch(error){
            console.error(error);
      };
};

const addProductToCart = async (cartId,productId)=>{
      try{
            const {rows:[product]} = await client.query(`
            UPDATE products
            SET cart_id = $1
            WHERE product_id=$2
            RETURNING *;`,[cartId,productId]);

            return product

      }catch(error){
            console.error(error)
      }
};

const getAllItemsInCart = async(cartId)=>{
      const {rows:cart} = await client.query(`
      SELECT * 
      FROM products 
      WHERE cart_id=$1;
      `,[cartId]);

      return cart
}

module.exports={
      createProduct,
      getAllProducts,
      getProductById,
      addProductToCart,
      getAllItemsInCart
}