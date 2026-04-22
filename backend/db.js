const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'gamer_registry',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_USER || 5432,
});

module.exports = pool;