const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const CommerceCategory = require('./commerceCategory');

const Commerce = sequelize.define('commerce', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  commerce_category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce_category',
      key: 'id'
    }
  },
  street_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postal_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  commerce_national_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  open_at: {
    type: Sequelize.TIME,
    allowNull: false
  },
  close_at: {
    type: Sequelize.TIME,
    allowNull: false
  },
  available_days: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Commerce.belongsTo(CommerceCategory, { foreignKey: 'commerce_category_id' });

Commerce.findAllCommerces = async function() {
  try {
    const commerces = await Commerce.findAll({
      where: {
        name: { [Sequelize.Op.ne]: 'Equipo Comidin' }
      },
      include: [
        {
          model: CommerceCategory,
          attributes: ['name']
        },
      ]
    });

    return commerces;
  } catch (error) {
    console.error('Error finding commerces with Role and Commerce:', error);
    throw error;
  }
};

Commerce.findCommercesByCategoryId = async function(categoryId) {
  try {
    const commerces = await Commerce.findAll({
      where: { commerce_category_id: categoryId }
    });

    return commerces;
  } catch (error) {
    console.error('Error finding Commerces:', error);
    throw error;
  }
};

// 🔎 NUEVO: buscar comercios por código postal (incluyendo categoría)
Commerce.findCommercesByPostalCode = async function(postalCode) {
  try {
    const commerces = await Commerce.findAll({
      where: { postal_code: postalCode },
      include: [
        {
          model: CommerceCategory,
          attributes: ['name'],
        },
      ],
    });

    return commerces;
  } catch (error) {
    console.error('Error finding Commerces by postal code:', error);
    throw error;
  }
};

module.exports = Commerce;
