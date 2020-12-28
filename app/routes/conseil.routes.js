module.exports = app => {
	const conseils = require("../controllers/conseil.controller.js");

	var router = require("express").Router();

	//Creation conseil
	router.post("/", conseils.create);

	//Get all conseils
	router.get("/", conseils.findAll);

	//Get single conseil
	router.get("/:id", conseils.findOne);

	//Update single conseil
	router.put("/:id", conseils.update);

	//Delete single conseil
	router.delete("/:id", conseils.delete);

	//Delete all conseils
	router.delete("/", conseils.deleteAll);

	app.use('/api/conseils', router);

};