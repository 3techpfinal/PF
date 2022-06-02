// config.js
const dotenv = require('dotenv').config();

module.exports = {

    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    JWT_SECRET : "secret",
    DB_USER : "3techpfinal",
    DB_PASS : "3techpfinal",
    DB_NAME : "test"

}