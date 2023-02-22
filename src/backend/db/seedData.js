const client = require("./client")

async function dropTables() {
    try {
        console.log("Dropping All Tables...")
        await client.query(`DROP TABLE IF EXISTS routine_activities;`)
        await client.query(`DROP TABLE IF EXISTS routines;`)
        await client.query(`DROP TABLE IF EXISTS activities;`)
        await client.query(`DROP TABLE IF EXISTS users;`)
    } catch (error) {
        throw new Error(error)
    }
}
// drop all tables, in the correct order


async function createTables() {
    console.log("Starting to build tables...")
    try {
        // create all tables, in the correct order
        await client.query(`
    CREATE TABLE users(
   );`);

        await client.query(`
  CREATE TABLE activities(
   );`);

        await client.query(`
  CREATE TABLE routines(
);`);

        await client.query(`
  CREATE TABLE routine_activities(
  
  );`)
    } catch (error) {
        throw new Error(error)
    }

}

