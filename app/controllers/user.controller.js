// Pour testet l'autorisation

exports.allAccess = (req, res) => {
	res.status(200).send("Contenu public.");
};
exports.userBoard = (req, res) => {
	res.status(200).send("Contenu utilisateur.");
};
exports.adminBoard = (req, res) => {
	res.status(200).send("Contenu admin.");
};
exports.moderatorBoard = (req, res) => {
	res.status(200).send("Contenu des moderator.");
};