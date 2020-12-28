const db = require("../models");
const Actualite = db.actualites;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.titre) {
		res.status(404).send({
			message: "Titre manquante!"
		});
		return;
	}
	if ( !req.body.contenu) {
		res.status(404).send({
			message: "Contenu manquant!"
		});
		return;
	}
	//creation du model
	const actualite = {
		titre: req.body.titre,
		contenu: req.body.contenu,
		userId: req.body.userId,
	}
	//Enregistrement dans la base
	Actualite.create(actualite)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Il y a un probleme"
			});
		});
};
exports.findAll = (req, res) => {
	const titre = req.query.titre;
	var condition = titre ? { titre: { [Op.like]: `%{titre}%`} } : null;

	Actualite.findAll({ order: [['createdAt', 'DESC']] } )
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Il y a un probleme"
			});
		});

};
exports.findOne = (req, res) => {
	const id = req.params.id;

	Actualite.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Pas d'actualite"
			});
		});
};
exports.update = (req, res) => {
	const id = req.params.id;

	Actualite.update(req.body, {
		where: { id: id }
	})
		.then(i => {
			if(i == 1 ){
				res.send({
					message: "Success"
				});
			} else {
				res.send({
					message: "Erreur lors de la modification de l'actualite"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Il y a un probleme"
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Actualite.destroy({
		where: { id: id}
	})
		.then(i => {
			if ( i==1 ) {
				res.send({
					message: "Actualite suprimee"
				});
			} else {
				res.send({
					message: "Erreur lors de la suppression de l'actualite"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Il y a un probleme"
			});
		});
};
exports.deleteAll = (req, res) => {
	Actualite.destroy({
		where: {},
		truncate: false
	})
		.then(i => {
			res.send({
				message: `${i} Conseil sont detruite`
			});
		})
		.catch(err => {
			res.status(500).send({
				message: 
					err.message || "Il y a un erreur"
			});
		});

};
exports.findAllPublished = (req, res) => {

};