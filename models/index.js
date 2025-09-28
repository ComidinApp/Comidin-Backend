'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// 1) Usamos la misma instancia de Sequelize que usa tu app
//    (ajustá la ruta si tu archivo no es exactamente src/database.js)
let sequelize;
try {
  // Debe exportar la instancia de Sequelize que usa el resto del código
  sequelize = require(path.join(__dirname, '..', 'src', 'database'));
} catch (e) {
  // Fallback: si no existe/ no exporta la instancia, inicializamos desde config.json (prod)
  const env = process.env.NODE_ENV || 'production';
  const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
  sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);
}

// 2) Requerimos TODOS los archivos de modelos para que hagan su `sequelize.define(...)`
const modelsDir = path.join(__dirname, '..', 'src', 'models');
if (fs.existsSync(modelsDir)) {
  fs.readdirSync(modelsDir)
    .filter((file) =>
      file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file.slice(-3) === '.js' &&
      !file.endsWith('.test.js')
    )
    .forEach((file) => {
      // Importamos el archivo para que se ejecute y registre el modelo sobre *la misma* instancia
      require(path.join(modelsDir, file));
    });
}

// 3) Armamos el objeto db desde sequelize.models
const db = {};
Object.keys(sequelize.models).forEach((name) => {
  db[name] = sequelize.models[name];
});

// 4) Asociaciones (si los modelos exponen associate)
Object.keys(db).forEach((name) => {
  if (typeof db[name].associate === 'function') {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
