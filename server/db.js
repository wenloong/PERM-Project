const Pool = require("pg").Pool;

const pool = new Pool({
   "user": "postgres",
   "password": "wng016",
   "host": "localhost",
   "port": "5432",
   "database": "wng016_db"
});

module.exports = pool;