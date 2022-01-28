module.exports = (sequelize, DataTypes) => {
	return sequelize.define('daily_reports', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		is_rejected: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		attachment_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false
	});
};
