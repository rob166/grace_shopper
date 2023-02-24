const client = require("./client");
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;


const createUser = async ({ email, username, password, first_name, last_name, address_line1, address_line2, city, state, zipcode, phone, is_admin }) => {
      try {
            const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
            const { rows: [user] } = await client.query(`
          INSERT
          INTO
          users(
            email,
            username,
            password,
            first_name,
            last_name,
            address_line1,
            address_line2,
            city,
            state,
            zipcode,
            phone,
            is_admin
            )
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;`, 
          [
            email, 
            username, 
            hashedPassword, 
            first_name, 
            last_name, 
            address_line1, 
            address_line2, 
            city, 
            state, 
            zipcode, 
            phone, 
            is_admin]);
            if (user) {
                  delete user.password
                  return user;
            } else {
                  console.error('name aleady used')
            }
      } catch (error) { console.warn(error) }
}

async function getUserByUsername(username) {
      try {
        const { rows: [user] } = await client.query(`
    SELECT * FROM users WHERE username=$1
    `, [username]);
    
        return user;
      } catch (error) {
        throw error;
      }
    }


module.exports = {
      createUser,
      getUserByUsername
}