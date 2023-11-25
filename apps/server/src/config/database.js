// src/database/db.js

require('dotenv').config();
const knexConstructor = require('knex');
const knexConfig = require('../../knexfile');
// import updateTypes from 'knex-types';

// const environment = process.env.NODE_ENV || 'development';
const environment = process.env.NODE_ENV || 'production';

const config = knexConfig[environment];

const knex = knexConstructor(config);

// export default knex;
module.exports = knex;
