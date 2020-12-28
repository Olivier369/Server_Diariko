// Pour l'authentification

const nodemailer = require('nodemailer');

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require('crypto');

exports.signup = (req, res) => {
	// Enregistrer user dans la base
	const token = crypto.randomBytes(16).toString('hex');
	const us = {
		nom: req.body.nom,
		prenom: req.body.prenom,
		dateNais: req.body.dateNais,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		tel: req.body.tel,
		adresse: req.body.adresse,
		pays: req.body.pays,
		region: req.body.region,
		commune: req.body.commune,
		username: req.body.username,
		sexe: req.body.sexe,
		isActivate: false,
		activeToken: token
	}
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
	    port: 587,
	    secure: false,
	    requireTLS: true,
		auth: {
			user: "jojoboly369@gmail.com",
			pass: "samsungsght369"
		}
	})

	User.create(us)
		.then(user => {
			
			const message = {
			    from: "jojoboly369@gmail.com",
			    // to: toUser.email // in production uncomment this
			    to: req.body.email,
			    subject: 'Diariko - Activate Account',
			    html: `
			      <h3 style="color:#00a99d; font-size: 15px"> Hello ${user.prenom} </h3>
			      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
			      <p>To activate your account please follow this link: <a href="https://www.diariko.com/api/auth/activate/${user.email}/${user.activeToken}"> activate </a></p>
			      <p>Peace</p>
			      <p>Diariko Team</p>
			    `
			 };

			if (req.body.roles) {
				Role.findAll({
					where: {
						name: {
							[Op.or]: req.body.roles
						}
					}
				}).then(roles => {
					user.setRoles(roles).then(() => {
						res.send({
							message: "User bien enregistre"
						});

						transporter.sendMail(message, (err, info) => {
						    if (err){
						    	res.send("Email could not sent due to error: "+error);
						    };
						    //console.log(info.envelope);
						    //console.log(info.messageId);
						});
					});
				});
			} else {
				// Role user 1
				user.setRoles([1]).then(() => {
					res.send({
						message: "User bien enregistre"
					});
					transporter.sendMail(message, (err, info) => {
					    if (err){
					    	console.log(err);
					    };
					    console.log(info.envelope);
					    console.log(info.messageId);
					});
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	})
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "Username ne marche pas."
				});
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Le mot de pass est incorrect"
				});
			}

			if (user.isActivate === false ) {
				return res.status(500).send({
					message: "Votre compte n'est pas encore activee."
				});
			}

			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400 // 24 heures
			});

			var authorities = [];
			user.getRoles().then(roles => {
				for (let i=0; i < roles.length; i++) {
					authorities.push("ROLES_" + roles[i].name.toUpperCase());
				}
				res.status(200).send({
					id: user.id,
					username: user.username,
					email: user.email,
					roles: authorities,
					accessToken: token,
					pays: user.pays,
					region:user.region,
					commune:user.commune,
				});
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
		});
};
exports.activate = (req, res) => {
	User.findOne({
		where: {
			email: req.params.email,
			activeToken: req.params.token
		}
	})
		.then(user =>{
			if(user.isActivate === true ) {
				res.status(500).send({
					message: "This account is already activated!"
				});
			} else {
				User.update({ isActivate: true }, { where: { id: user.id }}).then(user => {
					res.status(201).send({
						message: "Votre compte est bien activee avec success."
					});
					console.log(user);
					res.redirect("https://diariko.com/#connection");
				})
				.catch(err => {
					res.status(500).send({
						message: "Erreur lors de lactivation de votre compte."
					});
					console.log(err);
				});
			}
		})
		.catch(err => {
			res.status(400).send({
				message: "Hash vide "+err.message
			});
			console.log(err);
		});
};
exports.findOne = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
		.then(user => {
			res.send(user);
		})
		.catch(err => {
			res.status(500).send({
				message: "User not found"
			});
			console.log("Erreur lors de la recherche user");
			console.log(err);
		});
};
exports.findRole = (req, res) => {
	const id = req.params.id;
	User.findByPk(id, 
		{ 	
			include: {
				model: Role,
			    through: {
			      attributes: []
			    }
			} 
		})
		.then(user => {
			res.send(user);
		})
		.catch(err => {
			res.status(402).send({
				message: "Role error"
			});
		});
}