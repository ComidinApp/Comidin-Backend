const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const Product = require('./product');
const ProductCategory = require('./productCategory');
const Commerce = require('./commerce');
const CommerceCategory = require('./commerceCategory'); // 👈 nuevo

const { Op } = Sequelize; // 👈 para BETWEEN, etc.

const Publication = sequelize.define('publication', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  is_active: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'active'
  },
  commerce_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce',
      key: 'id'
    }
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id'
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  discount_percentaje: {
    type: Sequelize.DECIMAL(10, ), // <- lo dejé como lo tenías
    allowNull: false,
  },
  discounted_price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  available_stock: {
    type: Sequelize.DECIMAL(10, 0),
    allowNull: false,
  },
  expiration_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Publication.belongsTo(Product, { foreignKey: 'product_id' });
Publication.belongsTo(Commerce, { foreignKey: 'commerce_id' });

Publication.findAllPublications = async function() {
  try {
    const employees = await Publication.findAll({
      include: [
        {
          model: Product,
          attributes: ['name','description','image_url', 'product_category_id'],
          include: [
            {
              model: ProductCategory,
              attributes: ['name']
            }
          ]
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Publication.findPublicationsByCommerceId = async function(commerceId) {
  try {
    const publications = await Publication.findAll({
      where: { commerce_id: commerceId },
      include: [
        {
          model: Product,
          attributes: ['name','description','image_url']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return publications;
  } catch (error) {
    console.error('Error finding Publications:', error);
    throw error;
  }
};

// 🔎 NUEVO: comercios con publicaciones activas que vencen HOY (hasta 23:59:59)
Publication.findCommercesWithExpiringPublications = async function({ postalCode }) {
  try {
    const now = new Date();
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const wherePublication = {
      is_active: 'active',
      expiration_date: {
        [Op.between]: [now, endOfToday],
      },
    };

    const whereCommerce = {};

    if (postalCode) {
      whereCommerce.postal_code = postalCode;
    }

    const publications = await Publication.findAll({
      where: wherePublication,
      include: [
        {
          model: Commerce,
          attributes: [
            'id',
            'name',
            'street_name',
            'number',
            'postal_code',
            'commerce_category_id',
            'status',
            'image_url',
            'open_at',
            'close_at',
            'available_days',
            'is_active',
          ],
          where: whereCommerce,
          include: [
            {
              model: CommerceCategory,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    // Devolver comercios únicos (sin repetir por cada publicación)
    const uniqueCommercesMap = new Map();

    publications.forEach((pub) => {
      if (pub.commerce && !uniqueCommercesMap.has(pub.commerce.id)) {
        uniqueCommercesMap.set(pub.commerce.id, pub.commerce);
      }
    });

    return Array.from(uniqueCommercesMap.values());
  } catch (error) {
    console.error('Error finding Commerces with expiring Publications:', error);
    throw error;
  }
};

module.exports = Publication;
