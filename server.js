const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connection avec le models
const db = require("./app/models");
const Role = db.role;



// initialisation de la base de donnee
/*
db.sequelize.sync({force:true}).then(() => {
	console.log('Supprimer et Recreer la base');
	initial();
});
*/
db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//Custom routes
require("./app/routes/conseil.routes")(app);

//User routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

//Pays routes
require('./app/routes/pays.routes')(app);
require('./app/routes/image.routes')(app);
require('./app/routes/actualite.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	Role.create({
		id: 1,
		name: "user"
	});
	Role.create({
		id: 2,
		name: "moderator",
	});
	Role.create({
		id: 3,
		name: "admin"
	});
}