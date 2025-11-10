// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, sequelize } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Parsers con límites amplios (antes de las rutas) =====
const JSON_LIMIT = process.env.JSON_LIMIT || '5mb';
const FORM_LIMIT = process.env.FORM_LIMIT || '5mb';
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || 5 * 1024 * 1024); // 5 MB

app.use(express.json({
  limit: JSON_LIMIT,
  type: ['application/json', 'application/*+json'],
}));

app.use(express.urlencoded({
  limit: FORM_LIMIT,
  extended: true,
  parameterLimit: 10000,
}));

// Guard opcional por Content-Length (defensa extra)
app.use((req, res, next) => {
  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength && contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({
      error: 'PayloadTooLargeError',
      message: `Request entity too large (${contentLength} bytes). Max allowed: ${MAX_BODY_BYTES} bytes.`,
    });
  }
  return next();
});

// ===== CORS =====
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ===== DB =====
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
const analyticsRouter = require('./routes/analytics');

// Healthcheck
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
app.use('/api/analytics', analyticsRouter);

// ---- 404 y error handler ----
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  const status = err.status || 500;
  res.status(status).json({ error: 'Internal Server Error', message: err?.message });
});

// ===== Init DB sync =====
const init = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};
init();

// ===== Start =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`);
});
