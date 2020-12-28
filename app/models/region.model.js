module.exports = (sequelize, Sequelize) => {
  const Region = sequelize.define("region", {
    nom: {
      	type: Sequelize.STRING
    },
    paysId: {
      	type: Sequelize.INTEGER
    }
  });

  return Region;
};