const { Pool } = require('pg');

const PIGGY_URI = process.env.PIGGY_URI;

const pool = new Pool({
  connectionString: PIGGY_URI
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};