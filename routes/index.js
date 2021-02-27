const express = require("express");
const router = express.Router();
const jwt = require('express-jwt');

const isAdmin = require('../configs/checkRole');
const signupController = require("../controller/signup");
const loginController = require("../controller/login");
const productController = require("../controller/product");
const saleController = require("../controller/sale");

//Test route
router.get('/test', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), isAdmin, (req, res) => {
  res.json({ message: "SUCCESS" });
});

//Root route
router.get("/", (req, res) => {
  res.json({ message: "API Running", status: "SUCCESS" });
});

//Signup Route
router.post('/signup', signupController);

//Login Route
router.post('/login', loginController);

//get Products Route
router.get('/product', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), productController.readProducts);

//Add Products Route
router.post('/product', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), isAdmin, productController.addProduct);

//Update Products Route
router.put('/product', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), isAdmin, productController.updateProduct);

//Delete Products Route
router.delete('/product', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), isAdmin, productController.deleteProduct);

//Create a Sale Route
router.post("/sale", jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), saleController.createSale);

module.exports = router;