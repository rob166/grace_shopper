
const { createUser,
  createProduct,
  createCartItem,
  getAllProducts,
  getProductById,
  addProductToCart,
  getAllItemsInCart,
  getUserByUsername,
  getUser,
  removeProductsFromCart,
  createNewCart,
  getUserByEmail,
  getAllUsers
} = require('./');
const client = require("./client")

async function dropTables() {
  console.log("Dropping All Tables...")

  try {

    await client.query(`
      
        DROP TABLE IF EXISTS previous_products;
        DROP TABLE IF EXISTS previous_orders;
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
            email VARCHAR(255),
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            address_line1 VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            zipcode VARCHAR(255),
            phone VARCHAR(255),
            is_admin BOOLEAN DEFAULT false
          );

          CREATE TABLE cart (
            cart_id serial PRIMARY KEY,
            user_id INTEGER,
            quantity INTEGER,
            session_id TEXT,
            total VARCHAR(255),
            purchased BOOLEAN DEFAULT false
          );

          CREATE TABLE products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL NOT NULL,
            quantity INTEGER DEFAULT 0,
            image VARCHAR(255),
            cart_id INTEGER DEFAULT 0,
            category VARCHAR(255)
          );

          CREATE TABLE previous_orders(
            user_id INTEGER,
            cart_id INTEGER,
            date VARCHAR(255),
            total DECIMAL

          );

         CREATE TABLE previous_products(
           product_id INTEGER,
           name VARCHAR(255),
           quantity INTEGER,
           cart_id INTEGER,
           image VARCHAR(255)
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
      { email: "admin@hotmail.com", username: "admin098", password: "admin890", first_name: "admin", last_name: "superuser", address_line1: "1 run the site", city: "Provo", state: "UT", zipcode: 12345, phone: "6789012", is_admin: "true" },
      { email: "danny@hotmail.com", username: "dannyNYC", password: "sandra123", first_name: "danny", last_name: "bonaduci", address_line1: "1 Broadway", address_line2: "Penthouse", city: "NYC", state: "NY", zipcode: 10001, phone: "8675309", is_admin: "true" },
      { email: "caroline@hotmail.com", username: "carolineVA", password: "bertie99", first_name: "caroline", last_name: "burnett", address_line1: "1600 Pennsylvania Ave", address_line2: "Oval Office", city: "Washington", state: "DC", zipcode: 65432, phone: "4018887453", is_admin: "true" },
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
        description: "A tantalizing blend of fresh citrus, sweet agave nectar and bold tequila, this ready-to-pour margarita is the perfect companion for a night of adventure. Take a sip and prepare yourself to be captivated by an unexpectedly robust flavor that will make you feel like you just stepped into a Mexican cantina. The unique combination is sure to satisfy your palate and leave you wanting more. This canned margarita has been expertly crafted with carefully sourced ingredients to give it an unexpected depth, so loosen up and let its sugary essence take over!",
        price: 29.95,
        image: "margarita.png",
        category: "tequila"
      },
      {
        name: "Vodka Sode",
        description: "The \"BOLD\" premium vodka soda in a can is an unbeatable flavour combination. Crafted from the finest quality premium vodka blended with the perfect mix of carbonated water, natural citrus flavours and low calories, this canned vodka-soda delivers unparalleled refreshment with a smooth finish. With its light aroma and sturdy 330ml can design, it will quickly become your go-to for vibes you wouldn't ordinarily get from a canned drink - each sip is flavourful, vibrant and unexpectedly bold. Perfect for enjoying on the move or when stocking up for an intimate gathering - BOLD provides all you need to enjoy an effortless night any time of the day.",
        price: 29.95,
        image: 'vodkaSoda.png',
        category: "vodka"
      },
      {
        name: "Moscow Mule",
        description: "This delectable \"Canned Moscow Mule\" is the perfect companion for your next wild adventure! Finest quality vodka from Russia's heartland and ginger beer are combined to create a light, zesty flavor profile that will keep you coming back for more. It's bold and refreshing, with a hint of lime and spearmint adding an extra level of complexity to each sip. No gathering is complete without one of these chilled mules in hand - bring it everywhere you go and you'll be living life in full force!",
        price: 29.95,
        image: 'moscowMule.png',
        category: "vodka"
      },
      {
        name:"Pina Colada",
        description:"The pinnacle of fruity perfection, Canned Pina Colada is a bold and intense experience like no other. Fragrant undertones of pineapple and coconut swirl together to create a wholly unique beverage that is delicately crisp yet sublimely sweet. It has an exceptional scent with hints of tart citrus and tropical fruits combined with traditional rum flavors that are both complex and delightful in nature. The naturally creamy texture results in the perfect cocktail companion for any pool party or summer get-together. Don't miss out on trying this one-of-a-kind potion - it's like drinking a piece of paradise made up of only the most tantalizing ingredients!",
        price:29.95,
        image:'pinaColada.png',
        category: "rum"
      },
      {
        name:"Old Fashioned",
        description:"A canned old-fashioned—secretly tucked away in a shadowy corner of the counter and known only to those who seek it—is a delightful surprise. Crafted with the utmost care, this unique experience is made with premium ingredients resulted in an incomparable flavor profile. Rich sweetness and tartness meld together to tantalize the senses and balance out both aromas and taste. Those who try it will enjoy its complexity, warmth, and smooth finish that truly evokes the classic old-fashioned cocktail.",
        price:29.95,
        image:"oldFashioned.png",
        category: "whiskey"
      },
      {
        name:"Bloody Mary",
        description:"This canned Bloody Mary is the least exciting thing imaginable. The ingredients list reads like something that could be found in a vending machine, and you'd think that someone would have put some more effort into making it taste better than lukewarm tomato juice with an extra pinch of salt. Despite its name, there's no real hint of anything remotely sweet or spicy, so don't let yourself get your hopes up. To top it off, the texture is watery and thick at the same time - it's really hard to stomach! Don't waste your hard-earned money on this canned disappointment; make one from scratch instead.",
        price:29.95,
        image:"bloodyMary.png",
        category: "vodka"
      },
      {
        name:"Bahama Mama",
        description:"Ah, the sublime nectar of a Bahama Mama! This tropical tropicana is a combination of pineapple juice, orange juice, coconut cream, grenadine syrup, and rum. There's nothing more refreshing or delicious to enjoy after a long day in the sun! If you're looking for that taste of paradise without going on a getaway, this canned version provides all the same goodness. Perfect for a barbecue or pool party-just chill and enjoy! The sweetness and lightness of this refresher will have you hooked and begging for more. Sip it straight or as an ingredient in one of your favorite cocktails-it'll bring instant relaxation while leaving behind lots of fruity flavor! So go ahead-indulge yourself with this paradise-in-a-can beverage!",
        price:29.95,
        image:"bahamaMama.png",
        category: "rum"
      },
      {
        name:"Colt 45",
        description:"The delicious, bitter taste of Colt 45 Malt Liquor lingers for what feels like an eternity on your tongue. Accompanied by a robust bouquet of distinctive fresh scents, it is pleasure unlike any other. Its deep, dark and velvety texture is the perfect compliment to its smooth and silky sensation in beer form. As you savour each sip and let the liquid slide down your throat, you know that this particular malt liquor will remain ingrained in your mind forever. Drink as a guilty pleasure or indulge in an evening alone - if only all beverages could deliver such joy!",
        price:29.95,
        image:"colt45.png",
        category: "malt liquor"
      },
      {
        name:"Shirley Temple",
        description:"Ah, the Shirley Temple, the perfect drink for those who want to feel like they're sipping on a fancy cocktail, but still need to wake up for their 9am meeting tomorrow. It's like the non-alcoholic version of a fancy ball gown - sure, you could go to the party in sweats, but where's the fun in that? So take a sip, close your eyes, and let the grenadine transport you to a world of class and sophistication, without any of the pesky hangovers. Who needs champagne when you have a Shirley Temple, am I right?",
        price:29.95,
        image:"shirleyTemple.png",
        category: "non alcoholic"
      },
      {
        name:"Mickey's Fine Malt Liquor",
        description:"Oh my goodness, let me tell you about Mickey's Malt Liquor - it is a total game-changer. From the first sip, you are hit with a bold and flavorful profile that just screams satisfaction. It has this intense maltiness that mixes perfectly with just the right amount of sweetness and hoppy bitterness. The aroma alone is enough to make your mouth water and your taste buds dance with anticipation. What I love most about this brew is its smooth texture that goes down easy but leaves behind an enjoyable lingering kick. It's perfect for parties or chilling out with friends, and it pairs oh-so-well with favorite comfort foods like pizza or cheeseburgers. Mickey's Malt Liquor is definitely one of my go-to choices whenever I'm in need of some liquid excitement!",
        price:13.59,
        image:"mickeys.png",
        category: "malt liquor"
      },
      {
        name:"Whiskey Highball",
        description:"Whiskey Highball is the perfect drink for anyone who likes to unwind with a classic cocktail that packs a punch. It's a simple yet elegant concoction that consists of whiskey, soda water, and lots of ice. Imagine sipping on this tall glass of deliciousness after a long day at work or during happy hour with friends - the smoothness of the whiskey coupled with the refreshing carbonation of soda water will leave you feeling invigorated and energized. The best thing about Whiskey Highball is how versatile it is - you can customize it to your liking by using different types of whiskeys, adding flavored syrups or bitters, or even a squeeze of citrus juice. So go ahead and indulge in a timeless classic that never goes out of style - cheers to Whiskey Highball!",
        price:18.63,
        image:"cutwaterHighball.jpeg",
        category: "whiskey"
      },
      {
        name:"Whiskey Lemon Tea",
        description:"Oh my goodness, have you ever heard of Whiskey Lemon Tea? This drink is absolutely amazing! Imagine the smooth, rich flavor of whiskey blended with the tart tang of fresh lemon juice and the comforting warmth of hot tea. It's a match made in heaven! The aroma alone is enough to make your mouth water. And let me tell you, one sip will transport you to a cozy spot by the fire on a chilly evening. The whiskey blends perfectly with the bitter tea and zesty lemon, creating a warm and inviting flavor that simply melts away any stress or worries you may have had before taking that first sip. Honestly, if you haven't tried Whiskey Lemon Tea yet, then you're missing out on one of life's greatest pleasures!",
        price:18.63,
        image:"cutwaterWhiskeyTea.jpeg",
        category: "whiskey"
      },
      {
        name:"Classic Margarita",
        description:"Oh wow, have you ever tried a classic margarita? It's seriously an explosion of flavors in your mouth! I mean, this iconic cocktail is made with top-shelf tequila, citrusy lime juice, and a hint of orange liqueur. The rim of the glass is typically salted to balance out the acidity of the drink which adds a whole new dimension of savory taste to it. Whether you like yours on the rocks or blended with ice, this quintessential Mexican cocktail never disappoints! The refreshing taste and tangy sourness make it perfect for sipping on hot summer days or pairing with spicy food. It's no wonder why margaritas are a crowd pleaser at every party or bar. Honestly, nothing beats the classic margarita recipe when it comes to cocktails that pack a punch and quench your thirst at once. Cheers to enjoying life one sip at a time!",
        price:12.47,
        image:"juneShinesMargarita.jpeg",
        category: "tequila"
      },
      {
        name:"Ranch Water",
        description:"Ah, Tequila Ranch Water - the ultimate refresher for parched throats and not-so-parched personalities. This tantalizing cocktail truly personifies the wild, untamed spirit of its namesake. A frosty glass adorned with a sliver of lime, filled to the brim with smooth tequila and sparkling soda water, is all it takes to experience a sudden rush of pure joy mixed with a hint of recklessness. Sip on this zesty mixture and let the invigorating blend of citrusy tang and fiery spice awaken your senses in no time at all. If you're looking for something that embodies excitement, spontaneity, and merriment - look no further than Tequila Ranch Water!",
        price:12.47,
        image:"juneShinesRanchWater.jpeg",
        category: "tequila"
      },
      {
        name:"Schlitz Malt Liquor",
        description:"Oh boy, let's talk about Schlitz Malt Liquor. This beverage is truly exceptional - if by exceptional you mean \"it tastes like pancake syrup mixed with rubbing alcohol.\" With its lovely golden color and thick, syrupy texture, you'll feel like you're drinking a breakfast waffle in liquid form. And don't worry about the alcohol content - at 5.9%, it's just strong enough to make you forget how bad it tastes without completely knocking you out. But hey, at least the can looks cool with its bold red, black, and gold design. Who needs good taste when you've got flashy packaging? Bottoms up!",
        price:4.99,
        image:"shlitzMaltLiquor.jpeg",
        category: "malt liquor"
      },
      {
        name:"Steel Malt Liquor",
        description:"Steel malt liquor is a premium, high-quality beverage that boasts a rich and full-bodied flavor profile. It is crafted using only the finest ingredients, including top-quality malted barley, hops, and yeast. The result is a product that delivers an unparalleled combination of smoothness, complexity, and robustness. Steel malt liquor is also notable for its distinctive aroma and bold character - traits that make it an excellent accompaniment to grilled meats, seafood dishes or spicy cuisine. Whether enjoyed alone or with friends, steel malt liquor embodies sophistication and class in every sip - making it the ultimate choice for those who demand nothing less than the best from their beverages.",
        price:32.53,
        image:"steelMaltLiquor.jpeg",
        category: "malt liquor"
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

    console.log("get user by email")
    const getUserEmailTest = await getUserByEmail("jessica@hotmail.com");
    console.log(getUserEmailTest)
    console.log('finished getting user by email')

    console.log("get all users")
    const getUsers = await getAllUsers();
    console.log(getUsers)
    console.log('finished getting all users')

  } catch (error) {
    console.error(error)
  }
}

testCartFuncs = async () => {
  try {
    console.log('creating new cart')
    const newCar = await createNewCart(3)
    console.log('this the new cart', newCar)
    console.log('finished creating new cart')
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
    await testCartFuncs()
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