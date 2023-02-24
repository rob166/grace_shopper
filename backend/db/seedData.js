const { createUser,
      createProduct,
      createCartItem
       } = require('./');
const client = require("./client")

async function dropTables() {
      console.log("Dropping All Tables...")
     
      try {
    
        await client.query(`
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS product CASCADE;
        DROP TABLE IF EXISTS cart;
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
        CREATE TABLE "users" (
            "user_id" serial PRIMARY KEY,
            "email" varchar UNIQUE,
            "username" varchar UNIQUE,
            "password" varchar NOT NULL,
            "first_name" varchar,
            "last_name" varchar,
            "address_line1" varchar,
            "address_line2" varchar,
            "city" varchar,
            "state" varchar,
            "zipcode" integer,
            "phone" varchar,
            "is_admin" boolean DEFAULT false
          );

          CREATE TABLE "cart" (
            "cart_id" serial PRIMARY KEY,
            "user_id" integer,
            "quantity" integer NOT NULL,
            "total" decimal,
            "purchased" boolean DEFAULT false
          );

          CREATE TABLE "product" (
            "product_id" serial PRIMARY KEY,
            "name" varchar NOT NULL,
            "description" text,
            "price" decimal UNIQUE NOT NULL,
            "image" varchar,
            "cart_id" integer
          );
          
          ALTER TABLE "cart" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
          
          ALTER TABLE "product" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("cart_id");
                   
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
            image: "../../client/images/photo.jpg",
            cart_id: 1
          },
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

    async function rebuildDB() {
      try {
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialCart()
        await createInitialProduct()
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