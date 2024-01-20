import mysql from "mysql2/promise";
import "../../env.js";

// sample mysql db | https://github.com/datacharmer/test_db
let connection;
try {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
  });
} catch (err) {
  console.log(err);
}

if (!connection) {
  console.log("Error connecting to DB");
} else {
  console.log("DB connected");
}
// single instance | can only handle a single user request
export default connection;
