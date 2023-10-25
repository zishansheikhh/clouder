const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Xperia!2#4',
  database: 'clouder_db',
  // user: 'u391245239_clouder',
  // password: '8YT+GE@*xVb/',
  // database: 'u391245239_clouder_demodb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

function sellerLogin(phoneNumber, password, callback) {
  if (!phoneNumber || !password) {
    return callback({ status: 400, message: 'Please provide all required fields.' });
  }

  const query = 'SELECT * FROM seller_users WHERE SellerPhoneNo = ? AND SellerPassword = ?';
  db.query(query, [phoneNumber, password], (err, results) => {
    if (err) {
      return callback({ status: 500, message: 'Internal server error' });
    }

    if (results.length === 1) {
      const token = jwt.sign({ user: phoneNumber }, 'ZbaXmGX44neDUj', { expiresIn: '1h' });
      callback({ status: 200, token });
    } else {
      callback({ status: 401, message: 'Login failed' });
    }
  });
}

function sellerRegister(SellerFullname, SellerPhoneNo, SellerAdhaarNo, SellerGst, SellerPassword, callback) {
    if (!SellerFullname || !SellerPhoneNo || !SellerAdhaarNo || !SellerGst || !SellerPassword) {
      return callback({ status: 400, message: 'Please provide all required fields.' });
    }
  
    const query = 'INSERT INTO seller_users (SellerFullname, SellerPhoneNo, SellerAdhaarNo, SellerGst, SellerPassword) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [SellerFullname, SellerPhoneNo, SellerAdhaarNo, SellerGst, SellerPassword], (err) => {
      if (err) {
        return callback({ status: 500, message: 'Internal server error' });
      } else {
        // Generate a token upon successful registration
        const token = jwt.sign({ user: SellerPhoneNo }, 'ZbaXmGX44neDUj', { expiresIn: '1h' });
        callback({ status: 201, token });
      }
    });
  }
  

module.exports = {
  sellerLogin,
  sellerRegister,
};
