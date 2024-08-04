const Sequelize = require('sequelize');
const db = require('./config'); // Import database connection

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdOn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  totalAmount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deliveryType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  commerceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce',
      key: 'id'
    }
  }
}, {});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Commerce, { foreignKey: 'commerceId' });
Order.hasMany(Publication, { foreignKey: 'orderId' });

module.exports = Order;
