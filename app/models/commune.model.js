module.exports = (sequelize, Sequelize) => {
  const Commune = sequelize.define("commune", {
    nom: {
      	type: Sequelize.STRING
    },
    regionId: {
      	type: Sequelize.INTEGER
    }
  });

  return Commune;
};