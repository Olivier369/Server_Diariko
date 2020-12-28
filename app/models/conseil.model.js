module.exports = (sequelize, Sequelize) => {
  const Conseil = sequelize.define("conseil", {
    titre: {
      type: Sequelize.STRING
    },
    contenu: {
      type: Sequelize.STRING
    }
  });

  return Conseil;
};