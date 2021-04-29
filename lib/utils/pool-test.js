const { Pool } = require('pg');

const poolTest = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

poolTest.on('connect', () => console.log('Postgres connected'));

module.exports = poolTest;
