const { Pool } = require('pg');

const PG_URI =
  'postgres://jceunbjy:qo_WElXFAUOa_y2waQ8GLwcBwEu8lhyQ@raja.db.elephantsql.com:5432/jceunbjy';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  connectionLimit: 300,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query is: ', text);
    return pool.query(text, params, callback);
  },
};
