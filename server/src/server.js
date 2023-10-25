const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerAuthModel = require('./models/customer/customer-auth-model');
const executiveAuthModel = require('./models/executive/executive-auth-model'); 
const sellerAuthModel = require('./models/seller/seller-auth-model');

const app = express();

const PORT = 8009;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { fullName, phoneNumber, password } = req.body;

  customerAuthModel.login(fullName, phoneNumber, password, (result) => {
    res.status(result.status).json(result);
  });
});

app.post('/register', (req, res) => {
  const { fullName, phoneNumber, password } = req.body;

  customerAuthModel.register(fullName, phoneNumber, password, (result) => {
    res.status(result.status).json(result);
  });
});

// Add routes for Executive login and registration
app.post('/executive_login', (req, res) => {
  const { phoneNumber, password } = req.body;

  executiveAuthModel.executiveLogin(phoneNumber, password, (result) => {
    res.status(result.status).json(result);
  });
});

app.post('/executive_register', (req, res) => {
  const { ExFullname, ExPhoneNo, ExAdhaarNo, ExPassword } = req.body;

  executiveAuthModel.executiveRegister(
    ExFullname,
    ExPhoneNo,
    ExAdhaarNo,
    ExPassword,
    (result) => {
      res.status(result.status).json(result);
    }
  );
});

// Add routes for Seller login and registration
app.post('/seller_login', (req, res) => {
  const { phoneNumber, password } = req.body;

  sellerAuthModel.sellerLogin(phoneNumber, password, (result) => {
    res.status(result.status).json(result);
  });
});

app.post('/seller_register', (req, res) => {
  const { SellerFullname, SellerPhoneNo, SellerAdhaarNo, SellerGst, SellerPassword } = req.body;

  sellerAuthModel.sellerRegister(
    SellerFullname,
    SellerPhoneNo,
    SellerAdhaarNo,
    SellerGst,
    SellerPassword,
    (result) => {
      res.status(result.status).json(result);
    }
  );
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is now listening to port ${PORT}`);
});
