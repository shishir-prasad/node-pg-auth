const pgp = require('pg-promise')();
const connectionString = 'postgresql://dev:aoeu@localhost:5432/auth';
const db = pgp(connectionString);
module.exports = db;
