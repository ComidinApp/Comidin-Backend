// routes/publication.js
const express = require('express');
const { validationResult } = require('express-validator');
const Publication = require('../controllers/publication');
const {
  createPublicationValidation,
  updatePublicationValidation,
  commerceIdValidation,
} = require('../validators/publicationValidation');

const router = express.Router();

// Middleware genérico de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors || errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

// ⚠️ IMPORTANTE: rutas más específicas SIEMPRE primero

// Publicaciones por comercio
router.get(
  '/commerce/:commerceId',
  commerceIdValidation,
  validate,
  Publication.findPublicationsByCommerceId
);

// Crear publicación
router.post(
  '/',
  createPublicationValidation,
  validate,
  Publication.createPublication
);

// Listar todas
router.get('/', Publication.findAllPublications);

// Obtener por ID
router.get('/:id', Publication.findPublicationById);

// Actualizar
router.put(
  '/:id',
  updatePublicationValidation,
  validate,
  Publication.updatePublication
);

// Eliminar
router.delete('/:id', Publication.deletePublication);

module.exports = router;
