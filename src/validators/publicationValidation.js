// validators/publicationValidation.js
const { check } = require('express-validator');

// Validaciones para crear una publicación
const createPublicationValidation = [
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('El ID de comercio debe ser un número entero positivo'),

  check('product_id')
    .isInt({ min: 1 })
    .withMessage('El ID de producto debe ser un número entero positivo'),

  check('price')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('El precio debe ser un número decimal con hasta 2 decimales'),

  // ⬇️ Cambiado de isDate() a isISO8601() + toDate()
  check('expiration_date')
    .isISO8601()
    .withMessage('La fecha de vencimiento debe ser una fecha válida')
    .toDate(),
];

// Validaciones para actualizar una publicación
const updatePublicationValidation = [
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de comercio debe ser un número entero positivo'),

  check('product_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de producto debe ser un número entero positivo'),

  check('price')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('El precio debe ser un número decimal con hasta 2 decimales'),

  // ⬇️ Igual cambio aquí
  check('expiration_date')
    .optional()
    .isISO8601()
    .withMessage('La fecha de vencimiento debe ser una fecha válida')
    .toDate(),
];

// Validaciones para los parámetros de la ruta
const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('El ID de comercio debe ser un número entero positivo'),
];

module.exports = {
  createPublicationValidation,
  updatePublicationValidation,
  commerceIdValidation,
};
