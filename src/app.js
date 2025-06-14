require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, sequelize } = require('./database');
const app = express();
const PORT = 3000;
//Routers
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
const subscriptionRouter = require('./routes/subscription');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
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

app.use(cors({
    origin: '*', // Replace in other environments jiji
    methods: 'GET, POST, PUT, DELETE',
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectDatabase();

app.get('/', (req, res) => {res.send('Hello World!!');});  
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
app.use('/subscription', subscriptionRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

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
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
