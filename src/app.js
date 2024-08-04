const express = require('express');
const { connectDatabase, sequelize } = require('./database');
const app = express();
const PORT = 11001;
//Routers
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');
const subscriptionRouter = require('./routes/subscription');
const commerceRouter = require('./routes/commerce');
const addressRouter = require('./routes/address');
//Models
const User = require('./models/user');
const Address = require('./models/address');

app.use(express.json());

connectDatabase();

app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/commerces', commerceRouter);
app.use('/addresses', addressRouter);


// Initialize database models #TODO Descomentar cuando tengamos todos los modelos y los importemos en app.js
const init = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

init();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});