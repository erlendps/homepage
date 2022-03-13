const mariadb = require("mariadb");

// create db pool
const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "db_user",
  password: "password",
  database: "db_name"
  }
);

module.exports = {
  db: pool
};

