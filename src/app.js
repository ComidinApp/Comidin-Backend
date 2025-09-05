// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, sequelize } = require('./database');

const app = express();

// ---- Configuración por entorno ----
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:5173,https://comidin.com.ar')
  .split(',')
  .map(s => s.trim());

// ---- Middlewares ----
app.use(express.json());

// Log simple para ver qué llega
app.use((req, _res, next) => {
  if (req.method !== 'GET') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Endpoint de diagnóstico para ver si se esta levantando todo ok
app.get('/__whereami', (req, res) => {
  res.json({
    file: __filename,
    cwd: process.cwd(),
    main: require.main && require.main.filename,
    time: new Date().toISOString(),
  });
});

// CORS
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ---- DB ----
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
const subscriptionRouter = require('./routes/subscription'); // ← /subscriptions/crear
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

// Fallback directo /crear (por si el proxy recorta prefijos)
const { normalizeBody, createSubscription } = require('./controllers/subscription');
const { createSubscriptionValidation } = require('./validators/subscriptionValidation');
const { validationResult } = require('express-validator');
const validateInline = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};
app.post('/crear', normalizeBody, createSubscriptionValidation, validateInline, createSubscription);

// ---- Rutas base / health ----
app.get('/', (_req, res) => res.send('OK'));
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

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

// Lo que usa el front
app.use('/subscriptions', subscriptionRouter);
app.use('/subscription', subscriptionRouter); // alias opcional

app.use('/user', userRouter);
app.use('/auth', authRouter);

// ---- 404 handler ----
app.use((req, res, next) => {
  if (res.headersSent) return next();
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// ---- Error handler ----
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Internal Server Error', message: err?.message });
});

// ---- Init DB y Start ----
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
 