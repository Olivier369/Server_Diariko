const multer = require("multer");

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("Image not found.", false);
	}
};

var storage= multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "resources/static/assets/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, `diariko-${file.originalname}`);
	},
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter});
module.exports = uploadFile;