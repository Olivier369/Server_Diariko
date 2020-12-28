const upload = require("../middleware/upload");
const controller  = require("../controllers/upload.controller");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post( "/api/image",upload.single("file"),controller.uploadFiles);

	app.get("/api/image/:id", controller.findImage);
}