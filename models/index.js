"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

// 1) Intentar obtener la instancia desde src/database
let sequelize;
try {
  const dbMod = require(path.join(__dirname, "..", "src", "database"));
  // Soporta export default de la instancia o { sequelize }
  sequelize = dbMod && dbMod.sequelize ? dbMod.sequelize : dbMod;
} catch (e) {
  // Fallback a config.json
  const env = process.env.NODE_ENV || "production";
  const config = require(path.join(__dirname, "..", "config", "config.json"))[env];
  sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);
}

// Validación básica
if (!sequelize || typeof sequelize.define !== "function") {
  throw new Error("No se pudo obtener una instancia válida de Sequelize desde src/database ni desde config.");
}

// 2) Requerir TODOS los archivos de modelos (que hacen sequelize.define) en src/models
const modelsDir = path.join(__dirname, "..", "src", "models");
if (fs.existsSync(modelsDir)) {
  fs.readdirSync(modelsDir)
    .filter((file) =>
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.slice(-3) === ".js" &&
      !file.endsWith(".test.js")
    )
    .forEach((file) => {
      require(path.join(modelsDir, file));
    });
}

// 3) Construir db a partir de sequelize.models
const db = {};
if (!sequelize.models) {
  throw new Error("sequelize.models es undefined; revisá que los modelos llamen a sequelize.define en src/models/*");
}
Object.keys(sequelize.models).forEach((name) => {
  db[name] = sequelize.models[name];
});

// 4) Asociaciones si existen
Object.keys(db).forEach((name) => {
  if (typeof db[name].associate === "function") {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;