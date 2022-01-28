module.exports = (sequelize, DataTypes) => {
	return sequelize.define('participators', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		joined_date: {
			type: DataTypes.DATE,
		},
		left_date: {
			type: DataTypes.DATE,
		},
		repayment_amount: {
			type: DataTypes.BIGINT,
		},
		paid_amount: {
			type: DataTypes.BIGINT,
		},
		prize_amount: {
			type: DataTypes.BIGINT,
		},
	}, {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false
	});
};
