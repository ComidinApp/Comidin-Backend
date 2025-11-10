// src/validators/commerce.js
const { check, param } = require('express-validator');
const Commerce = require('../models/commerce');
const CommerceCategory = require('../models/commerceCategory');

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/; // HH:mm
const DAYS_CSV_REGEX = /^(0|1|2|3|4|5|6)(,(0|1|2|3|4|5|6))*$/; // 0-dom ... 6-sáb

// --- helpers ---
const categoryExists = async (id) => {
  const cat = await CommerceCategory.findByPk(id);
  if (!cat) throw new Error('Commerce category not found');
  return true;
};

const nationalIdUnique = async (value, { req }) => {
  const existing = await Commerce.findOne({ where: { commerce_national_id: value } });
  if (existing && (!req.params?.id || Number(existing.id) !== Number(req.params.id))) {
    throw new Error('Commerce national ID already in use');
  }
  return true;
};

// (Opcional) formato CUIT AR muy laxo: 2 dígitos, 8 dígitos, 1 dígito con guiones opcionales
const CUIT_REGEX = /^\d{2}-?\d{8}-?\d$/;

// --- comunes ---
const logicalHours = (req) => {
  const { open_at, close_at } = req.body;
  if (!open_at || !close_at) return true; // ya se validan obligatorios en create
  if (!TIME_REGEX.test(open_at) || !TIME_REGEX.test(close_at)) return true;
  const [oh, om] = open_at.split(':').map(Number);
  const [ch, cm] = close_at.split(':').map(Number);
  const o = oh * 60 + om;
  const c = ch * 60 + cm;
  if (c <= o) throw new Error('close_at must be later than open_at');
  return true;
};

// --- CREATE ---
const createCommerceValidation = [
  check('name').isString().trim().notEmpty().isLength({ max: 120 }),

  check('commerce_category_id')
    .isInt({ min: 1 }).withMessage('Commerce category ID must be a positive integer')
    .bail()
    .custom(categoryExists),

  check('street_name').isString().trim().notEmpty().isLength({ max: 120 }),
  check('number').isString().trim().notEmpty().isLength({ max: 20 }),
  check('postal_code').isString().trim().notEmpty().isLength({ max: 20 }),

  check('commerce_national_id')
    .isString().trim().notEmpty().isLength({ max: 20 })
    .bail()
    .matches(CUIT_REGEX).withMessage('Invalid national ID format (CUIT expected)')
    .bail()
    .custom(nationalIdUnique),

  check('is_active').optional().isBoolean().toBoolean(),

  check('open_at').isString().matches(TIME_REGEX).withMessage('open_at must be HH:mm'),
  check('close_at').isString().matches(TIME_REGEX).withMessage('close_at must be HH:mm'),

  check('available_days')
    .custom((v) => {
      if (Array.isArray(v)) {
        const ok = v.every((t) => String(t).match(/^[0-6]$/));
        if (!ok) throw new Error('available_days must be array of 0-6');
        return true;
      }
      if (typeof v === 'string' && DAYS_CSV_REGEX.test(v.trim())) return true;
      throw new Error('available_days must be CSV "0..6" or array of numbers 0..6');
    }),

check('image_url')
  .optional()
  .custom((value) => {
    // Permitir http/https o dataURL base64
    const isHttp = /^https?:\/\//.test(value);
    const isBase64 = /^data:image\/(png|jpeg|jpg|webp);base64,/.test(value);
    if (!isHttp && !isBase64) {
      throw new Error('Image URL must be a valid URL or Base64 image');
    }
    return true;
  }),
  // chequeo lógico de horarios
  check().custom((_v, { req }) => logicalHours(req)),
];

// --- UPDATE ---
const updateCommerceValidation = [
  check('name').optional().isString().trim().notEmpty().isLength({ max: 120 }),

  check('commerce_category_id')
    .optional()
    .isInt({ min: 1 })
    .bail()
    .custom(categoryExists),

  check('street_name').optional().isString().trim().notEmpty().isLength({ max: 120 }),
  check('number').optional().isString().trim().notEmpty().isLength({ max: 20 }),
  check('postal_code').optional().isString().trim().notEmpty().isLength({ max: 20 }),

  check('commerce_national_id')
    .optional()
    .isString().trim().notEmpty().isLength({ max: 20 })
    .bail()
    .matches(CUIT_REGEX).withMessage('Invalid national ID format (CUIT expected)')
    .bail()
    .custom(nationalIdUnique),

  check('is_active').optional().isBoolean().toBoolean(),

check('image_url')
  .optional()
  .custom((value) => {
    // Permitir http/https o dataURL base64
    const isHttp = /^https?:\/\//.test(value);
    const isBase64 = /^data:image\/(png|jpeg|jpg|webp);base64,/.test(value);
    if (!isHttp && !isBase64) {
      throw new Error('Image URL must be a valid URL or Base64 image');
    }
    return true;
  }),
  check('open_at').optional().isString().matches(TIME_REGEX).withMessage('open_at must be HH:mm'),
  check('close_at').optional().isString().matches(TIME_REGEX).withMessage('close_at must be HH:mm'),

  check('available_days').optional().custom((v) => {
    if (Array.isArray(v)) return v.every((t) => String(t).match(/^[0-6]$/)) || (() => { throw new Error('available_days must be array of 0-6'); })();
    if (typeof v === 'string' && DAYS_CSV_REGEX.test(v.trim())) return true;
    throw new Error('available_days must be CSV "0..6" or array of numbers 0..6');
  }),

  // chequeo lógico de horarios
  check().custom((_v, { req }) => logicalHours(req)),
];

// --- route params ---
const commerceIdValidation = [
  param('id').isInt({ min: 1 }).withMessage('Commerce ID must be a positive integer'),
];

module.exports = {
  createCommerceValidation,
  updateCommerceValidation,
  commerceIdValidation,
};
