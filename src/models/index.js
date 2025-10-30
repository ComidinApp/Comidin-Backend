// src/models/index.js
// Carga todos los modelos de esta carpeta y exporta sequelize.models
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../database');

// Descubre y requiere todos los archivos .js de ./models (menos este index.js)
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith('.js') && d.name !== 'index.js')
  .forEach((d) => {
    // Cada archivo de modelo debe hacer su propio `module.exports = sequelize.define(...)`
    // o registrar el modelo al ser requerido.
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(path.join(__dirname, d.name));
  });

// Exporta los modelos registrados en la instancia de Sequelize
module.exports = sequelize.models;
