const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const User = require('./user');
const Commerce = require('./commerce');
const OrderDetail = require('./orderDetail');
const Publication = require('./publication');
const Product = require('./product');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  commerce_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce',
      key: 'id'
    }
  },
  address_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'address',
      key: 'id'
    }
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  total_amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  items_quantity: {
    type: Sequelize.DECIMAL(10, 0),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  delivery_type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Commerce, { foreignKey: 'commerce_id' });
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });

Order.findOrdersByUserId = async function(userId) {
  try {
    const orders = await Order.findAll({
      where: { user_id: userId }
    });

    return orders;
  } catch (error) {
    console.error('Error finding Orders:', error);
    throw error;
  }
};

Order.findAllOrders = async function() {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name','last_name','email']
        },
        {
          model: Commerce,
          attributes: ['name']
        },
        {
          model: OrderDetail,
          attributes: ['publication_id', 'quantity', 'amount'],
          include: [
            {
              model: Publication,
              attributes: ['id','price'],
              include: [
                {
                  model: Product,
                  attributes: ['name', 'image_url']
                }
              ]
            }
          ]
        }
      ]
    });

    return orders;
  } catch (error) {
    console.error('Error finding Orders:', error);
    throw error;
  }
};

Order.findOrdersByCommerceId = async function(commerceId) {
  try {
    const orders = await Order.findAll({
      where: { commerce_id: commerceId },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        },
        {
          model: OrderDetail,
          attributes: ['publication_id', 'quantity', 'amount'],
          include: [
            {
              model: Publication,
              attributes: ['id','price'],
              include: [
                {
                  model: Product,
                  attributes: ['name', 'image_url']
                }
              ]
            }
          ]
        }
      ]
    });

    return orders;
  } catch (error) {
    console.error('Error finding Orders:', error);
    throw error;
  }
};

module.exports = Order;
