module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define("image", {
		type: {
			type:  DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		data: {
			type: DataTypes.BLOB("long"),
		},
		userId: {
			type: DataTypes.INTEGER,
		}
	});

	return Image;
};