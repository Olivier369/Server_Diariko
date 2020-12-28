const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Creation du database via models
//Conseil db
db.conseils = require("./conseil.model.js")(sequelize, Sequelize);

//User db
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

//Pays, region, commune DB
db.pays = require("./pays.model.js")(sequelize, Sequelize);
db.region = require("./region.model.js")(sequelize, Sequelize);
db.commune = require("./commune.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
	through: "user_roles",
	foreignKey: "roleId",
	otherKey: "userId"
});
db.user.belongsToMany(db.role, {
	through: "user_roles",
	foreignKey: "userId",
	otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

db.images = require("./image.model.js")(sequelize, Sequelize);

db.actualites = require("./actualite.model.js")(sequelize, Sequelize);

module.exports = db;
