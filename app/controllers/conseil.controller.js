const db = require("../models");
const Conseil = db.conseils;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.titre || !req.body.contenu) {
		res.status(404).send({
			message: "Contenu vide, il faut le remplir"
		});
		return;
	}
	//creation du model
	const conseil = {
		titre: req.body.titre,
		contenu: req.body.contenu
	}
	//Enregistrement dans la base
	Conseil.create(conseil)
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

	Conseil.findAll({ where: condition })
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

	Conseil.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Cette conseil numero "+ id + " n'existe pas"
			});
		});
};
exports.update = (req, res) => {
	const id = req.params.id;

	Conseil.update(req.body, {
		where: { id: id }
	})
		.then(i => {
			if(i == 1 ){
				res.send({
					message: "Votre conseil est bien mis a jour"
				});
			} else {
				res.send({
					message: "Cette conseil ne peut pas etre modifie"
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

	Conseil.destroy({
		where: { id: id}
	})
		.then(i => {
			if ( i==1 ) {
				res.send({
					message: "Votre conseil est bien detruite"
				});
			} else {
				res.send({
					message: "Cette conseil ne peut pas etre detruit"
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
	Conseil.destroy({
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