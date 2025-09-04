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

// CORS: permite front local y prod (ajustable por env)
app.use(cors({
  origin(origin, callback) {
    // Permitir requests sin origin (p. ej. curl, health checks)
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
const subscriptionRouter = require('./routes/subscription'); // ← tiene /crear
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

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

// ✅ NUEVO: ruta plural y alias singular (para compatibilidad)
app.use('/subscriptions', subscriptionRouter); // /subscriptions/crear (lo que usa tu front)
app.use('/subscription', subscriptionRouter);  // alias opcional

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
    await sequelize.sync(); // si no querés sincronizar en prod, podés condicionar por NODE_ENV
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

init();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`);
});
