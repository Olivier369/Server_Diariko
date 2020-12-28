const db = require("../models");
const Pays = db.pays;
const Region = db.region;
const Commune = db.commune;


exports.createPays = (pays, res) => {
	Pays.create({
		nom: pays.body.nom,
		code: pays.body.code,
	})
		.then((pays) => {
			res.send(pays);
		})
		.catch((err) => {
			console.log("Erreur lors de la creation du pays: ", err);
		});
};

exports.createRegion = (region, res) => {
	Region.create({
		nom: region.body.nom,
		code: region.body.code,
		paysId: region.body.paysId,
	})
		.then((region) => {
			res.send(region);
		})
		.catch((err) => {
			console.log("Erreur lors de la creation du region: ", err);
		});
};

exports.createCommune = (commune, res) => {
	Commune.create({
		nom: commune.body.nom,
		code: commune.body.code,
		regionId: commune.body.regionId,
	})
		.then((commune) => {
			res.send(commune);
		})
		.catch((err) => {
			console.log("Erreur lors de la creation du region: ", err);
		});
};

// get all pays 
exports.getAllPays = (req, res) => {
	Pays.findAll()
		.then((pays) => {
			res.send(pays);
		})
		.catch((err) => {
			console.log("Pas de pays: ", err);
		});
};

// Get all region by pays

exports.getRegionByPays = (req, res) => {
	const paysId = req.params.id;
	Region.findAll({ 
		where: { paysId: paysId }
	})
		.then((region) => {
			res.send(region);
		})
		.catch((err) => {
			console.log("Erreur lors de la recherche du region: ", err);
		});
};

//get region for a given region id
exports.getCommuneByRegion = (req, res) => {
	const regionId = req.params.id;
	Commune.findAll({ 
		where: { regionId: regionId }
	})
		.then((commune) => {
			res.send(commune);
		})
		.catch((err) => {
			console.log("Erreur lors de la recherche du region: ", err);
		});
};

exports.getPays = (req, res) => {
	const id = req.params.id;
	Pays.findByPk(id)
		.then(pays => {
			res.send(pays);
		})
		.catch(err => {
			res.status(500).send({
				message: err,
			});
			console.log(err);
		});
}
exports.getRegion = (req, res) => {
	const id = req.params.id;
	Region.findByPk(id)
		.then(region => {
			res.send(region);
		})
		.catch(err => {
			res.status(500).send({
				message: "Region not found"
			});
		});
}
exports.getCommune = (req, res) => {
	const id = req.params.id;
	Commune.findByPk(id)
		.then(commune => {
			res.send(commune);
		})
		.catch(err => {
			res.status(500).send({
				message: "Commune not found"
			});
		});
}