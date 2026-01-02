const Rating = require('../models/rating');
const User = require('../models/user');
const Product = require('../models/product');
const { sequelize } = require('../database');

// Crear un rating individual
exports.createRating = async (req, res) => {
  try {
    const { body } = req;
    const rating = await Rating.create(body);
    res.status(201).json(rating);
  } catch (error) {
    console.error('Error creating Rating:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};

// Crear ratings en bulk (varios productos de la misma orden)
exports.createBulkRatings = async (req, res) => {
  const { user_id, commerce_id, order_id, ratings } = req.body;

  if (!Array.isArray(ratings) || ratings.length === 0) {
    return res
      .status(400)
      .json({ error: 'ratings must be a non-empty array' });
  }

  // Validación mínima
  for (const r of ratings) {
    if (!r.product_id || !r.rate_order) {
      return res.status(400).json({
        error:
          'Each rating must include product_id and rate_order (1 to 5, ideally)',
      });
    }
  }

  const t = await sequelize.transaction();

  try {
    const created = [];

    for (const r of ratings) {
      const newRating = await Rating.create(
        {
          user_id,
          commerce_id,
          order_id,
          product_id: r.product_id,
          rate_order: r.rate_order,
          comment: r.comment || null,
        },
        { transaction: t }
      );

      created.push(newRating);
    }

    await t.commit();

    return res.status(201).json({
      message: 'Ratings created successfully',
      count: created.length,
      ratings: created,
    });
  } catch (error) {
    console.error('Error creating bulk ratings:', error);
    await t.rollback();
    return res
      .status(500)
      .json({ error: 'Internal error', message: error.message });
  }
};

// Obtener todos los ratings
exports.findAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching Ratings:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};

// Obtener rating por ID
exports.findRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ error: `Rating not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching Rating by ID:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};

// Actualizar rating
exports.updateRating = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (rating) {
      await rating.update(body);
      res.status(200).json(rating);
    } else {
      res.status(404).json({ error: `Rating not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating Rating:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};

// Eliminar rating
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (rating) {
      await rating.destroy();
      res.status(200).json({ message: 'Rating successfully deleted' });
    } else {
      res.status(404).json({ error: `Rating not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting Rating:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};

// Ratings por usuario
exports.findRatingByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.findRatingsByUserId(userId);
    if (ratings && ratings.length > 0) {
      res.status(200).json(ratings);
    } else {
      res.status(404).json({ message: 'No ratings found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching Ratings by User ID:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};


exports.findRatingComplainByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const ratings = await Rating.findRatingsByCommerceId(commerceId);

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({
        message: 'No ratings found for this commerce.',
      });
    }

    // Calcular promedio
    const totalRatings = ratings.length;
    const sum = ratings.reduce(
      (acc, r) => acc + Number(r.rate_order || 0),
      0
    );
    const average = sum / totalRatings;


    const userIds = [...new Set(ratings.map((r) => r.user_id))];
    const productIds = [...new Set(ratings.map((r) => r.product_id))];

    const users = await User.findAll({
      where: { id: userIds },
    });

    const products = await Product.findAll({
      where: { id: productIds },
    });

    const usersById = {};
    users.forEach((u) => {
      usersById[u.id] = u;
    });

    const productsById = {};
    products.forEach((p) => {
      productsById[p.id] = p;
    });

 
    const formattedRatings = ratings.map((r) => {
      const user = usersById[r.user_id];
      const product = productsById[r.product_id];

      return {
        id: r.id,
        user_name: user ? user.name : null, 
        product_image_url: product ? product.image_url : null, 
        product_name: product ? product.name : null, 
        rate_order: r.rate_order,
        comment: r.comment,
      };
    });

    res.status(200).json({
      commerceId: Number(commerceId),
      averageRating: Number(average.toFixed(2)),
      totalRatings,
      ratings: formattedRatings,
    });
  } catch (error) {
    console.error('Error fetching Ratings by Commerce ID:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};

// Rating por orden
exports.findRatingByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const rating = await Rating.findRatingByOrderId(orderId);
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: 'No rating found for this order.' });
    }
  } catch (error) {
    console.error('Error fetching Rating by Order ID:', error);
    res
      .status(409)
      .json({ error: 'Conflict', message: error.message || error });
  }
};
