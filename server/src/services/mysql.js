const mysql = require("mysql");

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Xperia!2#4',
    database: 'clouder_db',
  });
  
// Connect to the database
db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("Connected to MySQL database");
    }
  });
  
  module.exports = db;