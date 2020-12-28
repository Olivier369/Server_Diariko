// Pour l'autorisation

const { authJwt } = require("../middleware");
const controller = require("../controllers/pays.controller");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post("/api/pays", controller.createPays);
	app.post("/api/region", controller.createRegion);
	app.post("/api/commune", controller.createCommune);

	app.get("/api/pays", controller.getAllPays);
	app.get("/api/pays/region/:id", controller.getRegionByPays);
	app.get("/api/pays/commune/:id", controller.getCommuneByRegion);

	app.get("/api/pays/:id", controller.getPays);
	app.get("/api/pays/re/:id", controller.getRegion);
	app.get("/api/pays/co/:id", controller.getCommune);
};