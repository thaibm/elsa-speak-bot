module.exports = (sequelize, DataTypes) => {
	return sequelize.define('expenses', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    reason: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	}, {
		timestamps: true,
		createdAt: true,
		updatedAt: false
	});
};
