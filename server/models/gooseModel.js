const { Pool } = require('pg');

// const { datedLog } = require('../utilities');

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    // datedLog(`Executing query: ${text}`);
    return pool.query(text, params, callback);
  }
};
