const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const PaymentController = require('./controllers/PaymentController');

// User routes
app.get('/api/users', UserController.getAll);
app.get('/api/users/:id', UserController.getById);
app.post('/api/users', UserController.create);
app.put('/api/users/:id', UserController.update);
app.delete('/api/users/:id', UserController.remove);
app.post('/api/login', UserController.login);
app.post('/api/recover-password', UserController.recoverPassword);

// Category routes
app.get('/api/categories', CategoryController.getAll);
app.get('/api/categories/:id', CategoryController.getById);
app.post('/api/categories', CategoryController.create);
app.put('/api/categories/:id', CategoryController.update);
app.delete('/api/categories/:id', CategoryController.remove);

// Product routes
app.get('/api/products', ProductController.getAll);
app.get('/api/products/:id', ProductController.getById);
app.post('/api/products', ProductController.create);
app.put('/api/products/:id', ProductController.update);
app.delete('/api/products/:id', ProductController.remove);

// Order routes
app.get('/api/orders', OrderController.getAll);
app.get('/api/orders/:id', OrderController.getById);
app.post('/api/orders', OrderController.create);
app.put('/api/orders/:id', OrderController.update);
app.delete('/api/orders/:id', OrderController.remove);

// Payment routes
app.get('/api/payments', PaymentController.getAll);
app.get('/api/payments/:id', PaymentController.getById);
app.post('/api/payments', PaymentController.create);
app.put('/api/payments/:id', PaymentController.update);
app.delete('/api/payments/:id', PaymentController.remove);

module.exports = app; 