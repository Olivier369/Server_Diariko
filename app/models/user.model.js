module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    nom: {
      	type: Sequelize.STRING
    },
    prenom: {
      	type: Sequelize.STRING
    },
    dateNais: {
    	type: Sequelize.DATE
    },
    email: {
    	type: Sequelize.STRING
    },
    password: {
    	type: Sequelize.STRING
    },
    tel: {
    	type: Sequelize.STRING
    },
    adresse: {
    	type: Sequelize.STRING
    },
    pays: {
    	type: Sequelize.INTEGER
    },
    region: {
    	type: Sequelize.INTEGER
    },
    commune: {
    	type: Sequelize.INTEGER
    },
    username: {
    	type: Sequelize.STRING
    },
    sexe: {
        type: Sequelize.STRING
    },
    isActivate: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    activeToken: {
        type: Sequelize.STRING
    }
  });

  return User;
};