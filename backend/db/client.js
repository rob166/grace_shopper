const { Pool } = require('pg');

const connectionString = process.env.RENDERDATABASE_URL || 'postgres://grace_shopper_buzzed_db_user:d8GKR9pCEKN6kEWCT6wQFZ39njuuQNde@dpg-cgfq65ceoogqfc6om7ig-a/grace_shopper_buzzed_db';
// 'https://localhost:5432/grace-shopper';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;