const express = require('express');
const { connectDatabase, sequelize } = require('./database');
const app = express();
const PORT = 3000;
//Routers
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');
const subscriptionRouter = require('./routes/subscription');
const commerceRouter = require('./routes/commerce');
const addressRouter = require('./routes/address');
//Models
const Address = require('./models/address');
const Commerce = require('./models/commerce');
const CommerceCategory = require('./models/commerceCategory');
const CustomerComplain = require('./models/customerComplain');
const Employee = require('./models/employee');
const Order = require('./models/order');
const OrderDetail = require('./models/orderDetail');
const Plan = require('./models/plan');
const Product = require('./models/product');
const ProductCategory = require('./models/productCategory');
const Publication = require('./models/publication');
const Rating = require('./models/rating');
const Role = require('./models/role');
const Subscription = require('./models/subscription');
const User = require('./models/user');


app.use(express.json());

connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello World!');
  });  
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/commerces', commerceRouter);
app.use('/addresses', addressRouter);

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