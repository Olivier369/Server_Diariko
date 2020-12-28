module.exports = (sequelize, Sequelize) => {
  const Actualite = sequelize.define("actualites", {
    titre: {
      	type: Sequelize.STRING
    },
    contenu: {
      	type: Sequelize.STRING
    },
    userId: {
    	type: Sequelize.INTEGER
    }
  });

  return Actualite;
};