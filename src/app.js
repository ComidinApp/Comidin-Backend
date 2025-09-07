// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, sequelize } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


connectDatabase();

// ---- Routers ----
const addressRouter = require('./routes/address');
const commerceRouter = require('./routes/commerce');
const commerceCategoryRouter = require('./routes/commerceCategory');
const customerComplainRouter = require('./routes/customerComplain');
const employeeRouter = require('./routes/employee');
const orderRouter = require('./routes/order');
const orderDetailRouter = require('./routes/orderDetail');
const planRouter = require('./routes/plan');
const productRouter = require('./routes/product');
const productCategoryRouter = require('./routes/productCategory');
const publicationRouter = require('./routes/publication');
const ratingRouter = require('./routes/rating');
const roleRouter = require('./routes/role');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const subscriptionRouter = require('./routes/subscription');

app.get('/', (_req, res) => res.send('OK'));

// ---- Montaje de rutas ----
app.use('/address', addressRouter);
app.use('/commerce', commerceRouter);
app.use('/commerceCategory', commerceCategoryRouter);
app.use('/customerComplain', customerComplainRouter);
app.use('/employee', employeeRouter);
app.use('/order', orderRouter);
app.use('/orderDetail', orderDetailRouter);
app.use('/plan', planRouter);
app.use('/product', productRouter);
app.use('/productCategory', productCategoryRouter);
app.use('/publication', publicationRouter);
app.use('/rating', ratingRouter);
app.use('/role', roleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/subscriptions', subscriptionRouter);

// ---- 404 y error handler ----
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Internal Server Error', message: err?.message });
});


const init = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};
init();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`);
});
