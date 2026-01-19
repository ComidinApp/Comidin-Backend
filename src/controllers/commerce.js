// src/controllers/commerce.js
const Commerce = require('../models/commerce');
const Employee = require('../models/employee');
const Publication = require('../models/publication');
const Rating = require('../models/rating');

const emailSender = require('../services/emailSender');

const { uploadCommerceImage } = require('../services/s3Service');
const { processImage } = require('../helpers/imageHelper');

exports.createCommerce = async (req, res) => {
  try {
    const { image_url, image_name, ...commerceData } = req.body;

    if (image_url) {
      const { buffer, contentType, filename } = processImage(image_url, image_name);
      const imageUrl = await uploadCommerceImage(buffer, contentType, filename);
      commerceData.image_url = imageUrl;
    }

    const commerce = await Commerce.create(commerceData);

    // ✅ IMPORTANTE:
    // Ya NO enviamos el mail acá.
    // Porque el recipient real es el admin employee (role_id=6) y todavía no existe.
    // El mail se envía en el flujo de creación del employee/Cognito.

    return res.status(201).json(commerce);
  } catch (error) {
    console.error('Error creating Commerce:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllCommerces = async (req, res) => {
  try {
    const commerces = await Commerce.findAllCommerces();
    return res.status(200).json(commerces);
  } catch (error) {
    console.error('Error fetching Commerces:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findCommerceById = async (req, res) => {
  try {
    const { id } = req.params;
    const commerce = await Commerce.findByPk(id);

    if (!commerce) {
      return res.status(404).json({ error: 'Commerce not found with id: ' + id });
    }

    let ratingSummary = null;
    const ratings = await Rating.findRatingsByCommerceId(id);

    if (ratings && ratings.length > 0) {
      const totalRatings = ratings.length;
      const sum = ratings.reduce((acc, r) => acc + Number(r.rate_order || 0), 0);
      const average = sum / totalRatings;

      ratingSummary = {
        averageRating: Number(average.toFixed(2)),
        totalRatings,
      };
    }

    const commerceJson = commerce.toJSON();
    return res.status(200).json({
      ...commerceJson,
      rating: ratingSummary,
    });
  } catch (error) {
    console.error('Error fetching Commerce by ID:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateCommerce = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const commerce = await Commerce.findByPk(id);
    if (!commerce) {
      return res.status(404).json({ error: 'Commerce not found with id: ' + id });
    }

    await commerce.update(body);
    return res.status(200).json(commerce);
  } catch (error) {
    console.error('Error updating Commerce:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.changeCommerceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const commerce = await Commerce.findByPk(id);
    if (!commerce) {
      return res.status(404).json({ error: 'Commerce not found with id: ' + id });
    }

    commerce.status = status;
    await commerce.save();

    const employeeAdmin = await Employee.findAdminEmployeeByCommerceId(id);
    if (!employeeAdmin) {
      return res.status(404).json({ error: 'Employee not found with commerce id: ' + id });
    }

    switch (status) {
      case 'admitted':
        await emailSender.sendAdmittedNoticeCommerce(employeeAdmin);
        break;
      case 'rejected':
        await emailSender.sendRejectedNoticeCommerce(employeeAdmin);
        break;
      default:
        break;
    }

    return res.status(200).json(commerce);
  } catch (error) {
    console.error('Error updating Commerce:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.activateCommerce = async (req, res) => {
  try {
    const { id } = req.params;

    const commerce = await Commerce.findByPk(id);
    if (!commerce) {
      return res.status(404).json({ error: 'Commerce not found with id: ' + id });
    }

    commerce.is_active = !commerce.is_active;
    await commerce.save();

    return res.status(200).json(commerce);
  } catch (error) {
    console.error('Error updating Commerce:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteCommerce = async (req, res) => {
  try {
    const { id } = req.params;

    const commerce = await Commerce.findByPk(id);
    if (!commerce) {
      return res.status(404).json({ error: 'Commerce not found with id: ' + id });
    }

    await commerce.destroy();
    return res.status(200).json(commerce);
  } catch (error) {
    console.error('Error deleting Commerce:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findCommercesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const commerces = await Commerce.findCommercesByCategoryId(categoryId);
    if (!commerces) {
      return res.status(404).json({ message: 'No commerces found for this category.' });
    }

    return res.status(200).json(commerces);
  } catch (error) {
    console.error('Error fetching Commerces by Category ID:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.searchCommerces = async (req, res) => {
  try {
    const { postal_code, expiring_publications } = req.query;

    const hasPostalCode = !!postal_code;
    const hasExpiring = expiring_publications === 'true';

    if (!hasPostalCode && !hasExpiring) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'At least one filter must be provided: postal_code or expiring_publications=true',
      });
    }

    let commerces;

    if (hasExpiring) {
      commerces = await Publication.findCommercesWithExpiringPublications({
        postalCode: hasPostalCode ? postal_code : null,
      });
    } else if (hasPostalCode) {
      commerces = await Commerce.findCommercesByPostalCode(postal_code);
    }

    if (!commerces || commerces.length === 0) {
      return res.status(404).json({ message: 'No commerces found for given filters.' });
    }

    return res.status(200).json(commerces);
  } catch (error) {
    console.error('Error searching Commerces with filters:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
