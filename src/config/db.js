/* eslint-disable indent */
const { Pool } = require('pg');

module.exports = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: '5433',
    database: 'PostgreSQL 15',
});
