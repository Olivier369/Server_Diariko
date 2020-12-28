const fs = require("fs");

const db = require("../models");
const Image = db.images;

const uploadFiles = async (req, res) => {
	try {
		console.log(req.file);

		if (req.file === undefined) {
			return res.send(`Vous devez selectionner une image.`);
		}

		Image.create({
			type: req.file.mimetype,
			name: req.file.originalname,
			data: fs.readFileSync("../resources/static/assets/uploads" + req.file.filname
			),
			userId: req.id,
		}).then((image) => {
			fs.writeFileSync("../resources/static/assets/tmp" + image.name,
				image.data
			);

			console.log('File has been uploaded.');
		})
		.catch(err => {
			console.log("erreour fatal");
		});
	}
	catch(err) {
		
	};
}
const findImage = (req, res) => {
	const id = req.params.id;
	Image.findOne({
		where: {
			userId: id
		}
	})
		.then(image => {
			res.send(image);
		})
		.catch(err => {
			res.status(500).send({
				message: "Erreur, image introuvable"
			});
		});
}

module.exports = {
	uploadFiles, findImage
}