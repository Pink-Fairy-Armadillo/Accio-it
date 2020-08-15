const { Pool } = require('pg');

const PG_URI = 'postgres://ordddiou:g5OjOyAIFxf-tsLk1uwu4ZOfbJfiCFbh@ruby.db.elephantsql.com:5432/ordddiou';

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
