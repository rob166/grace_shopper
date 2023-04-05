const { Pool } = require('pg');
require('dotenv').config()
const connectionString = process.env.EXTDATABASE_URL || 'postgres://danny:R7EnHA3Gs4BB4sZysnsNuUOyalXocjmm@dpg-cgmbk4g7osl9vto83130-a.ohio-postgres.render.com/grace_shopper_z0l9?ssl=true';
// 'https://localhost:5432/grace-shopper';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;