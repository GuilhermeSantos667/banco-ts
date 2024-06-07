"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
require('dotenv').config();
exports.knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE
    }
});
