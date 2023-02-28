
const { createUser,
  createProduct,
  createCartItem,
  getAllProducts,
  getProductById,
  addProductToCart,
  getAllItemsInCart,
  getUserByUsername,
  getUser,
  removeProductsFromCart
} = require('./');
const client = require("./client")

async function dropTables() {
  console.log("Dropping All Tables...")

  try {

    await client.query(`
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS users;
       
       
        `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }

}

async function createTables() {
  console.log("Starting to build tables...")
  // create all tables, in the correct order
  try {

    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            address_line1 VARCHAR(255),
            address_line2 VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            zipcode INTEGER,
            phone VARCHAR(255),
            is_admin BOOLEAN DEFAULT false
          );

          CREATE TABLE cart (
            cart_id serial PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            quantity INTEGER NOT NULL,
            total DECIMAL,
            purchased BOOLEAN DEFAULT false
          );

          CREATE TABLE products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL NOT NULL,
            quantity INTEGER DEFAULT 0,
            image VARCHAR(255),
            cart_id INTEGER DEFAULT 0
          );
                   
    `);

    console.log("Finished building tables!");

  } catch (error) {
    console.error("Error building tables!");

    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { email: "danny@hotmail.com", username: "dannyNYC", password: "sandra123", first_name: "danny", last_name: "bonaduci", address_line1: "1 Broadway", address_line2: "Penthouse", city: "NYC", state: "NY", zipcode: 10001, phone: "8675309", is_admin: "true" },
      { email: "caroline@hotmail.com", username: "carolineVA", password: "bertie99", first_name: "caroline", last_name: "burnett", address_line1: "1600 Pennsylvania Ave", address_line2: "Oval Office", city: "Washington", state: "DC", zipcode: 65432, phone: "4018887453", is_admin: "false" },
      { email: "jessica@hotmail.com", username: "jessicaCHICAGO", password: "glamgal123", first_name: "jessica", last_name: "Alvarado", address_line1: "Bears Stadium", address_line2: "Near the water", city: "Chicago", state: "IL", zipcode: 12345, phone: "18006785544", is_admin: "true" },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

async function createInitialCart() {
  try {
    console.log("Starting to create cart...")

    const cartToCreate = [
      {
        user_id: 1,
        quantity: 3,
        total: 26.50,
        purchased: "false"
      },
      {
        user_id: 1,
        quantity: 6,
        total: 75.46,
        purchased: "false"
      },
    ]
    const cart = await Promise.all(cartToCreate.map(createCartItem))

    console.log("cart created:")
    console.log(cart)

    console.log("Finished creating cart!")
  } catch (error) {
    console.error("Error creating cart!")
    throw error
  }
}

async function createInitialProduct() {
  try {
    console.log("Starting to create product...")

    const productToCreate = [
      {
        name: "Margarita",
        description: "Wonderful blend of hard liquors takes you to the sun",
        price: 29.95,
        image: "margarita.png"

      },
      {
        name: "Vodka Sode",
        description: "Strong",
        price: 29.95,
        image: 'vodkaSoda.png'

      },
      {
        name:"Moscow Mule",
        description:"Refreshing citrus with a spicey finish",
        price:29.95,
        image:'moscowMule.png'
      }
    ]
    const product = await Promise.all(productToCreate.map(createProduct))

    console.log("product created:")
    console.log(product)

    console.log("Finished creating product!")
  } catch (error) {
    console.error("Error creating product!")
    throw error
  }
}

const testProductFuncs = async () => {
  try {
    console.log("getting all products")
    const products = await getAllProducts()
    console.log(products)
    console.log('tests over')

    console.log("testing get product by id")
    const product = await getProductById(2)
    console.log(product)
    console.log('get product by id test over')

    console.log('adding products to cart');
    const cartProd = await addProductToCart(2, 4, 1);
    const cartProd2 = await addProductToCart(2, 1, 2);
    console.log(cartProd, cartProd2);
    console.log('finished adding product to cart ');

    console.log('getting all items in cart');
    const cart = await getAllItemsInCart(2)
    console.log(cart);
    console.log('finished getting all items in cart');

    console.log('getting ready to remove items')
    const updatedItems1 = await removeProductsFromCart(2, 2, 1)
    const updatedItems2 = await removeProductsFromCart(2, 0, 2)
    console.log(updatedItems1, updatedItems2)
    console.log('finished removing items')

    console.log('getting updated cart');
    const cart2 = await getAllItemsInCart(2)
    console.log(cart2);
    console.log('finished getting updated cart');

  } catch (error) {
    console.error(error)
  }
}

const testUserFuncs = async () => {
  try {
    console.log("get user by username")
    const userName = await getUserByUsername('carolineVA');
    console.log(userName)
    console.log('finished getting user by username')

    console.log("get user")
    const getUserTest = await getUser("dannyNYC", "sandra123");
    console.log(getUserTest)
    console.log('finished getting user')

  } catch (error) {
    console.error(error)
  }
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialCart()
    await createInitialProduct()
    await testProductFuncs()
    await testUserFuncs()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}