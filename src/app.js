const express = require('express');
const { connectDatabase, sequelize } = require('./database');
const userRouter = require('./API/user/router');
const orderRouter = require('./API/order/router');
const productRouter = require('./API/product/router');
const subscriptionRouter = require('./API/subscription/router');
const commerceRouter = require('./API/commerce/router');
const addressRouter = require('./API/address/router');

const app = express();
const PORT = 11001;

app.use(express.json());

connectDatabase();

app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/commerces', commerceRouter);
app.use('/addresses', addressRouter);


// Initialize database models #TODO Descomentar cuando tengamos todos los modelos y los importemos en app.js
/* const init = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

init(); */

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});