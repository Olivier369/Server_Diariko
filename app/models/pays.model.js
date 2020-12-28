module.exports = (sequelize, Sequelize) => {
  const Pays = sequelize.define("pays", {
    nom: {
      	type: Sequelize.STRING
    },
    code: {
      	type: Sequelize.STRING
    }
  });

  return Pays;
};